'use strict';
const Service = require('egg').Service;

class ConfigService extends Service {
  async create({ scheduling = [] }) {
    const result = await this.app.mysql.insert('config', {
      scheduling: JSON.stringify(scheduling),
      times: scheduling.length,
    });
    return result.insertId;
  }
  async delete({ id }) {
    const result = await this.app.mysql.delete('config', {
      id,
    });
    return result.insertId;
  }
  async select(body = {}) {
    const times = body.times || '';
    if (!body.pageIndex || !body.pageSize) {
      const result = await this.app.mysql.query(`
        SELECT * FROM config
        WHERE times = ? OR ? = ''
        ORDER BY id DESC;`,
      [ times, times ]);
      for (const item of result) {
        item.scheduling = JSON.parse(item.scheduling);
      }
      return result;
    }
    const { pageIndex, pageSize } = body;
    const limit = pageSize;
    const offset = (pageIndex - 1) * pageSize;
    const result = await this.app.mysql.query(`
      SELECT * FROM config
      WHERE times = ? OR ? = ''
      ORDER BY id DESC
      LIMIT ?, ?;`,
    [ times, times, offset, limit ]);
    for (const item of result) {
      item.scheduling = JSON.parse(item.scheduling);
    }
    const total = await this.app.mysql.query(`
      SELECT COUNT(*) FROM config
      WHERE times = ? OR ? = ''
      ORDER BY id DESC
      LIMIT ?, ?;`,
    [ times, times, offset, limit ]);
    return {
      list: result,
      total: total && total[0]['COUNT(*)'],
      pageIndex,
      pageSize,
    };
  }
  async get({ id }) {
    const result = await this.app.mysql.get('config', {
      id,
    });
    result.scheduling = JSON.parse(result.scheduling);
    return result;
  }
  async update({ id }, { scheduling }) {
    const result = await this.app.mysql.update('config', {
      id,
      scheduling: JSON.stringify(scheduling),
      times: scheduling.length,
    });
    return result.insertId;
  }
  async list({ id }) {
    const result = await this.app.mysql.query(`
      SELECT * FROM config
      WHERE id LIKE ? OR ? = ''
      ORDER BY id DESC
      LIMIT 0, 10;`,
    [ `${id}%`, `${id}%` ]);
    for (const item of result) {
      item.scheduling = JSON.parse(item.scheduling);
    }
    return result;
  }
}

module.exports = ConfigService;
