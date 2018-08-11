'use strict';
const Service = require('egg').Service;

class UserService extends Service {
  async get({ name, password }) {
    const result = await this.app.mysql.get('user', {
      name,
      password,
    });
    return result;
  }
}

module.exports = UserService;
