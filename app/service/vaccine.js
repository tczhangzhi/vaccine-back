'use strict';
const Service = require('egg').Service;
const helper = require('../extend/helper');

class VaccineService extends Service {
  async create({ time = 0, decision = '', configId = 0, childId }) {
    const result = await this.app.mysql.insert('vaccine', {
      time,
      decision,
      configId,
      childId,
    });
    return result.insertId;
  }
  async delete({ id }) {
    const result = await this.app.mysql.delete('vaccine', {
      id,
    });
    return result.insertId;
  }
  async select(body = {}) {
    const time = body.time || '';
    const configId = body.configId || '';
    const childId = body.childId || '';
    const childName = body.childName || '';
    if (!body.pageIndex || !body.pageSize) {
      const result = await this.app.mysql.query(`
        SELECT *, vaccine.id as id FROM vaccine
        LEFT JOIN child on vaccine.childId = child.id
        WHERE (time = ? OR ? = '') AND (configId = ? OR ? = '') AND (child.id = ? OR ? = '') AND (name LIKE ? OR ? = '')
        ORDER BY vaccine.id DESC;`,
      [ time, time, configId, configId, childId, childId, `${childName}%`, childName ]);
      return result;
    }
    const { pageIndex, pageSize } = body;
    const limit = pageSize;
    const offset = (pageIndex - 1) * pageSize;
    const result = await this.app.mysql.query(`
      SELECT *, vaccine.id as id FROM vaccine
      LEFT JOIN child on vaccine.childId = child.id
      WHERE (time = ? OR ? = '') AND (configId = ? OR ? = '') AND (child.id = ? OR ? = '') AND (name LIKE ? OR ? = '')
      ORDER BY vaccine.id DESC
      LIMIT ?, ?;`,
    [ time, time, configId, configId, childId, childId, `${childName}%`, childName, offset, limit ]);
    const total = await this.app.mysql.query(`
      SELECT COUNT(*) FROM vaccine
      LEFT JOIN child on vaccine.childId = child.id
      WHERE (time = ? OR ? = '') AND (configId = ? OR ? = '') AND (child.id = ? OR ? = '') AND (name LIKE ? OR ? = '')
      ORDER BY vaccine.id DESC
      LIMIT ?, ?;`,
    [ time, time, configId, configId, childId, childId, `${childName}%`, childName, offset, limit ]);
    return {
      list: result,
      total: total && total[0]['COUNT(*)'],
      pageIndex,
      pageSize,
    };
  }
  async all() {
    const result = await this.app.mysql.query(`SELECT * from vaccine`)
    return result
  }
  async get({ id }) {
    const result = await this.app.mysql.get('vaccine', {
      id,
    });
    return result;
  }
  async update({ id }, row) {
    const result = await this.app.mysql.update('vaccine', {
      ...row,
      id,
    });
    return result.insertId;
  }
  async randomVaccine(childId) {
    const child = await this.ctx.service.child.get({ id: childId });
    const configs = await this.ctx.service.config.select({
      pageIndex: 1,
      pageSize: 20,
      times: '',
    });
    for (const config of configs.list) {
      const schedulings = config.scheduling;
      if (helper.randomBoolean) {
        const vaccine = {
          configId: config.id,
          childId,
          time: 0,
          decision: new Array(schedulings.length).fill(0),
        };
        for (const index in schedulings) {
          if (schedulings[index].end >= child.days) {
            vaccine.time = index;
            break;
          }
        }
        const lastTime = vaccine.time - 1;
        if (lastTime > -1) {
          const lastTimeStart = schedulings[lastTime].start;
          const lastTimeEnd = schedulings[lastTime].end;
          vaccine.decision[lastTime] = helper.randomInt(lastTimeStart, lastTimeEnd);
        }
        vaccine.decision = JSON.stringify(vaccine.decision);
        await this.ctx.service.vaccine.create(vaccine);
      }
    }
  }
}

module.exports = VaccineService;
