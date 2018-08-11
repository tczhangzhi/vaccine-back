'use strict';

const Controller = require('egg').Controller;

const loginRule = {
  name: {
    type: 'string',
    required: true,
  },
  password: {
    type: 'string',
    required: true,
  },
};

class UserController extends Controller {
  async login() {
    const ctx = this.ctx;
    ctx.validate(loginRule, ctx.request.body);
    const user = await ctx.service.user.get(ctx.request.body);
    if (user) {
      ctx.body = {
        id: user.id,
        name: user.name,
      };
    } else {
      ctx.body = {};
    }
    ctx.status = 201;
  }
}

module.exports = UserController;
