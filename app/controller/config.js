'use strict';

const Controller = require('egg').Controller;

const createRule = {
  scheduling: {
    type: 'array',
    required: true,
    itemType: 'object',
    rule: {
      start: {
        type: 'number',
        required: true,
      },
      end: {
        type: 'number',
        required: true,
      },
      space: {
        type: 'number',
        required: true,
      },
    },
  },
};
const destroyRule = {
  id: {
    type: 'id',
    required: true,
  },
};
const showRule = {
  id: {
    type: 'id',
    required: true,
  },
};
const updateRule = {
  scheduling: {
    type: 'array',
    required: true,
    itemType: 'object',
    rule: {
      start: {
        type: 'number',
        required: true,
      },
      end: {
        type: 'number',
        required: true,
      },
      space: {
        type: 'number',
        required: true,
      },
    },
  },
};
const listRule = {
  id: {
    type: 'string',
    format: /\d*/,
    allowEmpty: true,
    required: false,
  },
};
const indexRule = {
  pageIndex: {
    type: 'number',
    required: true,
  },
  pageSize: {
    type: 'number',
    required: true,
  },
  times: {
    type: 'string',
    format: /\d*/,
    allowEmpty: true,
    required: false,
  },
};
class ConfigController extends Controller {
  async create() {
    const ctx = this.ctx;
    ctx.validate(createRule);
    const id = await ctx.service.config.create(ctx.request.body);
    ctx.body = id;
    ctx.status = 201;
  }
  async destroy() {
    const ctx = this.ctx;
    ctx.validate(destroyRule, ctx.params);
    ctx.body = await ctx.service.config.delete(ctx.params);
    ctx.status = 201;
  }
  async index() {
    const ctx = this.ctx;
    const query = ctx.query;
    query.pageIndex = parseInt(query.pageIndex);
    query.pageSize = parseInt(query.pageSize);
    ctx.validate(indexRule, query);
    ctx.body = await ctx.service.config.select(query);
    ctx.status = 201;
  }
  async show() {
    const ctx = this.ctx;
    ctx.validate(showRule, ctx.params);
    ctx.body = await ctx.service.config.get(ctx.params);
    ctx.status = 201;
  }
  async update() {
    const ctx = this.ctx;
    ctx.validate(showRule, ctx.params);
    ctx.validate(updateRule, ctx.request.body);
    ctx.body = await ctx.service.config.update(ctx.params, ctx.request.body);
    ctx.status = 201;
  }
  async list() {
    const ctx = this.ctx;
    ctx.validate(listRule, ctx.query);
    ctx.body = await ctx.service.config.list(ctx.query);
    ctx.status = 201;
  }
}

module.exports = ConfigController;
