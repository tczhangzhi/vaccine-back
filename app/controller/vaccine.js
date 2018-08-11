'use strict';

const Controller = require('egg').Controller;

const createRule = {
  time: {
    type: 'number',
    required: false,
  },
  decision: {
    type: 'string',
    format: /\[.*\]/,
    allowEmpty: true,
    required: false,
  },
  configId: {
    type: 'number',
    required: false,
  },
  childId: {
    type: 'number',
    required: true,
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
  time: {
    type: 'number',
    required: false,
  },
  decision: {
    type: 'string',
    format: /\[.*\]/,
    allowEmpty: true,
    required: false,
  },
  configId: {
    type: 'number',
    required: false,
  },
  childId: {
    type: 'number',
    required: true,
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
  time: {
    type: 'number',
    required: false,
  },
  decision: {
    type: 'string',
    format: /\[.*\]/,
    allowEmpty: true,
    required: false,
  },
  configId: {
    type: 'string',
    format: /\d*/,
    allowEmpty: true,
    required: false,
  },
  childId: {
    type: 'string',
    format: /\d*/,
    allowEmpty: true,
    required: false,
  },
  childName: {
    type: 'string',
    required: false,
    allowEmpty: true,
  },
};
class VaccineController extends Controller {
  async create() {
    const ctx = this.ctx;
    ctx.validate(createRule);
    ctx.body = await ctx.service.vaccine.create(ctx.request.body);
    ctx.status = 201;
  }
  async destroy() {
    const ctx = this.ctx;
    ctx.validate(destroyRule, ctx.params);
    ctx.body = await ctx.service.vaccine.delete(ctx.params);
    ctx.status = 201;
  }
  async index() {
    const ctx = this.ctx;
    const query = ctx.query;
    query.pageIndex = parseInt(query.pageIndex);
    query.pageSize = parseInt(query.pageSize);
    ctx.validate(indexRule, query);
    ctx.body = await ctx.service.vaccine.select(query);
    ctx.status = 201;
  }
  async show() {
    const ctx = this.ctx;
    ctx.validate(showRule, ctx.params);
    ctx.body = await ctx.service.vaccine.get(ctx.params);
    ctx.status = 201;
  }
  async update() {
    const ctx = this.ctx;
    ctx.validate(showRule, ctx.params);
    ctx.validate(updateRule, ctx.request.body);
    ctx.body = await ctx.service.vaccine.update(ctx.params, ctx.request.body);
    ctx.status = 201;
  }
}

module.exports = VaccineController;
