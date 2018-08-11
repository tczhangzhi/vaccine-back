'use strict';
const Service = require('egg').Service;

class ChildService extends Service {
  async create({ name = '', days = 0 }) {
    const result = await this.app.mysql.insert('child', {
      name,
      days,
    });
    return result.insertId;
  }
  async delete({ id }) {
    const result = await this.app.mysql.delete('child', {
      id,
    });
    return result.insertId;
  }
  async select(body = {}) {
    const name = body.name || '';
    const days = body.days || '';
    if (!body.pageIndex || !body.pageSize) {
      const result = await this.app.mysql.query(`
        SELECT * FROM child
        WHERE (name LIKE ? OR ? = '') AND (days = ? OR ? = '')
        ORDER BY id DESC;`,
      [ `${name}%`, `${name}%`, days, days ]);
      return result;
    }
    const { pageIndex, pageSize } = body;
    const limit = pageSize;
    const offset = (pageIndex - 1) * pageSize;
    const result = await this.app.mysql.query(`
      SELECT * FROM child
      WHERE (name LIKE ? OR ? = '') AND (days = ? OR ? = '')
      ORDER BY id DESC
      LIMIT ?, ?;`,
    [ `${name}%`, `${name}%`, days, days, offset, limit ]);
    const total = await this.app.mysql.query(`
      SELECT COUNT(*) FROM child
      WHERE (name LIKE ? OR ? = '') AND (days = ? OR ? = '')
      ORDER BY id DESC
      LIMIT ?, ?;`,
    [ `${name}%`, `${name}%`, days, days, offset, limit ]);
    return {
      list: result,
      total: total && total[0]['COUNT(*)'],
      pageIndex,
      pageSize,
    };
  }
  async get({ id }) {
    const result = await this.app.mysql.get('child', {
      id,
    });
    return result;
  }
  async update({ id }, row) {
    const result = await this.app.mysql.update('child', {
      ...row,
      id,
    });
    return result.insertId;
  }
  async list({ name }) {
    const result = await this.app.mysql.query(`
      SELECT id, name FROM child
      WHERE name LIKE ?
      ORDER BY name DESC, id DESC
      LIMIT 0, 10;`,
    [ `${name}%` ]);
    return result;
  }
  async clean() {
    await this.app.mysql.query('DELETE FROM child');
    await this.app.mysql.query('DELETE FROM vaccine');
  }
}

module.exports = ChildService;
