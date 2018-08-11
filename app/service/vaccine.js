'use strict';
const Service = require('egg').Service;
const helper = require('../extend/helper');

class VaccineService extends Service {
  async create({ start = 0, end = 0, configId = 0, childId }) {
    const result = await this.app.mysql.insert('vaccine', {
      start,
      end,
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
    const start = body.start || '';
    const end = body.end || '';
    const configId = body.configId || '';
    const childId = body.childId || '';
    const childName = body.childName || '';
    if (!body.pageIndex || !body.pageSize) {
      const result = await this.app.mysql.query(`
        SELECT *, vaccine.id as id FROM vaccine
        LEFT JOIN child on vaccine.childId = child.id
        WHERE (start = ? OR ? = '') AND (end = ? OR ? = '') AND (configId = ? OR ? = '') AND (child.id = ? OR ? = '') AND (name LIKE ? OR ? = '')
        ORDER BY vaccine.id DESC;`,
      [ start, start, end, end, configId, configId, childId, childId, `${childName}%`, childName ]);
      return result;
    }
    const { pageIndex, pageSize } = body;
    const limit = pageSize;
    const offset = (pageIndex - 1) * pageSize;
    const result = await this.app.mysql.query(`
      SELECT *, vaccine.id as id FROM vaccine
      LEFT JOIN child on vaccine.childId = child.id
      WHERE (start = ? OR ? = '') AND (end = ? OR ? = '') AND (configId = ? OR ? = '') AND (child.id = ? OR ? = '') AND (name LIKE ? OR ? = '')
      ORDER BY vaccine.id DESC
      LIMIT ?, ?;`,
    [ start, start, end, end, configId, configId, childId, childId, `${childName}%`, childName, offset, limit ]);
    const total = await this.app.mysql.query(`
      SELECT COUNT(*) FROM vaccine
      LEFT JOIN child on vaccine.childId = child.id
      WHERE (start = ? OR ? = '') AND (end = ? OR ? = '') AND (configId = ? OR ? = '') AND (child.id = ? OR ? = '') AND (name LIKE ? OR ? = '')
      ORDER BY vaccine.id DESC
      LIMIT ?, ?;`,
    [ start, start, end, end, configId, configId, childId, childId, `${childName}%`, childName, offset, limit ]);
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
      if (helper.randomBoolean) {
        const vaccine = {
          configId: config.id,
          childId,
          start: -1,
          end: -1,
        };
        const schedulings = config.scheduling;
        for (const scheduling of schedulings) {
          if (scheduling.end >= child.days) {
            vaccine.start = scheduling.start;
            vaccine.end = scheduling.end;
            break;
          }
        }
        await this.ctx.service.vaccine.create(vaccine);
      }
    }
  }
}

module.exports = VaccineService;
