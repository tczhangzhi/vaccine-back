'use strict';
const Controller = require('egg').Controller;
const helper = require('../extend/helper');
const fs = require('fs')
const path = require('path')

const createRule = {
  name: {
    type: 'string',
    required: false,
    allowEmpty: true,
  },
  days: {
    type: 'number',
    required: false,
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
  name: {
    type: 'string',
    required: false,
    allowEmpty: true,
  },
  days: {
    type: 'number',
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
  name: {
    type: 'string',
    required: false,
    allowEmpty: true,
  },
  days: {
    type: 'string',
    format: /\d*/,
    allowEmpty: true,
    required: false,
  },
};
const listRule = {
  name: {
    type: 'string',
    required: false,
    allowEmpty: true,
  },
};
const dataRule = {
  days: {
    type: 'string',
    format: /\d*/,
    allowEmpty: true,
    required: false,
  },
};
const downloadRule = {
  days: {
    type: 'string',
    format: /\d*/,
    allowEmpty: true,
    required: false,
  },
};
const randomRule = {
  n: {
    type: 'string',
    format: /\d*/,
    allowEmpty: true,
    required: false,
  },
};
class ChildController extends Controller {
  async create () {
    const ctx = this.ctx;
    ctx.validate(createRule);
    const id = await ctx.service.child.create(ctx.request.body);
    ctx.body = id;
    ctx.status = 201;
  }
  async destroy () {
    const ctx = this.ctx;
    ctx.validate(destroyRule, ctx.params);
    ctx.body = await ctx.service.child.delete(ctx.params);
    ctx.status = 201;
  }
  async index () {
    const ctx = this.ctx;
    const query = ctx.query;
    query.pageIndex = parseInt(query.pageIndex);
    query.pageSize = parseInt(query.pageSize);
    ctx.validate(indexRule, query);
    ctx.body = await ctx.service.child.select(query);
    ctx.status = 201;
  }
  async show () {
    const ctx = this.ctx;
    ctx.validate(showRule, ctx.params);
    ctx.body = await ctx.service.child.get(ctx.params);
    ctx.status = 201;
  }
  async update () {
    const ctx = this.ctx;
    ctx.validate(showRule, ctx.params);
    ctx.validate(updateRule, ctx.request.body);
    ctx.body = await ctx.service.child.update(ctx.params, ctx.request.body);
    ctx.status = 201;
  }
  async list () {
    const ctx = this.ctx;
    ctx.validate(listRule, ctx.query);
    ctx.body = await ctx.service.child.list(ctx.query);
    ctx.status = 201;
  }
  async random () {
    const ctx = this.ctx;
    ctx.validate(randomRule, ctx.query);
    const n = ctx.query.n || 1;
    const childsId = [];
    for (let index = 0; index < n; index++) {
      const childId = await ctx.service.child.create(helper.randomChild);
      await ctx.service.vaccine.randomVaccine(childId);
      childsId.push(childId);
    }
    ctx.body = childsId;
    ctx.status = 201;
  }
  async init () {
    const ctx = this.ctx;
    const childId = await ctx.service.child.create(helper.initChild);
    ctx.body = childId;
    ctx.status = 201;
    await ctx.service.vaccine.randomVaccine(childId);
  }
  async clean () {
    const ctx = this.ctx;
    await ctx.service.child.clean();
    ctx.body = 0;
    ctx.status = 201;
  }
  async data () {
    const ctx = this.ctx;
    ctx.validate(dataRule, ctx.query);
    const days = ctx.query.days || '1';
    const data = {
      // 儿童年龄
      f: [],
      // 最早接种时间
      l: [],
      // 最晚接种时间
      o: [],
      // 是否需要接种
      w: [],
      // 已有接种数量
      h: [],
    };
    const children = await ctx.service.child.select();
    const configs = await ctx.service.config.select();
    data.f = children.map(child => child.days);
    data.l = configs.map(config => config.scheduling.map(item => item.start));
    data.o = configs.map(config => config.scheduling.map(item => item.end));
    const vaccineResultLength = Math.max(...configs.map(config => config.times));
    const childResult = [];
    for (const child of children) {
      const configResult = [];
      const vaccines = await ctx.service.vaccine.select({ childId: child.id });
      for (const config of configs) {
        const vaccine = vaccines.find(vaccine => vaccine.configId === config.id);
        const scheduling = config.scheduling;
        let vaccineResult = new Array(vaccineResultLength).fill(0);
        if (vaccine) {
          vaccineResult = new Array(vaccineResultLength).fill(1);
          for (const index in vaccineResult) {
            if (vaccine.end > scheduling[index].end) {
              vaccineResult[index] = 0;
            } else {
              break;
            }
          }
        }
        configResult.push(vaccineResult);
      }
      childResult.push(configResult);
    }
    data.w = childResult;
    data.h = new Array(parseInt(days)).fill(0);
    for (const index in data.h) {
      data.h[index] = Math.floor(Math.random() * 20 + 10);
    }
    ctx.body = data;
    ctx.status = 201;
  }
  async download () {
    const ctx = this.ctx;
    ctx.validate(downloadRule, ctx.query);
    const days = ctx.query.days || '1';
    const data = {
      // 儿童年龄
      f: [],
      // 最早接种时间
      l: [],
      // 最晚接种时间
      o: [],
      // 是否需要接种
      w: [],
      // 已有接种数量
      h: [],
    };
    const children = await ctx.service.child.select();
    const configs = await ctx.service.config.select();
    data.f = children.map(child => child.days);
    data.l = configs.map(config => config.scheduling.map(item => item.start));
    data.o = configs.map(config => config.scheduling.map(item => item.end));
    const vaccineResultLength = Math.max(...configs.map(config => config.times));
    const childResult = [];
    for (const child of children) {
      const configResult = [];
      const vaccines = await ctx.service.vaccine.select({ childId: child.id });
      for (const config of configs) {
        const vaccine = vaccines.find(vaccine => vaccine.configId === config.id);
        const scheduling = config.scheduling;
        let vaccineResult = new Array(vaccineResultLength).fill(0);
        if (vaccine) {
          vaccineResult = new Array(vaccineResultLength).fill(1);
          for (const index in vaccineResult) {
            if (vaccine.end > scheduling[index].end) {
              vaccineResult[index] = 0;
            } else {
              break;
            }
          }
        }
        configResult.push(vaccineResult);
      }
      childResult.push(configResult);
    }
    data.w = childResult;
    data.h = new Array(parseInt(days)).fill(0);
    for (const index in data.h) {
      data.h[index] = Math.floor(Math.random() * 20 + 10);
    }
    for (const item in data) {
      data[item] = helper.dataFormat(data[item]);
    }
    ctx.attachment('vaccine.dat');
    ctx.set('Content-Type', 'application/octet-stream');
    ctx.body = `f=${data.f};\nl=${data.l};\no=${data.o};\nw=${data.w};\nh=${data.h};`;
    ctx.status = 201;
  }
  async downloadJSON () {
    const ctx = this.ctx;
    ctx.validate(downloadRule, ctx.query);
    const days = ctx.query.days || '1';
    const data = {
      // 儿童年龄
      f: [],
      // 最早接种时间
      l: [],
      // 最晚接种时间
      o: [],
      // 是否需要接种
      w: [],
      // 已有接种数量
      h: [],
    };
    const children = await ctx.service.child.select();
    const configs = await ctx.service.config.select();
    data.f = children.map(child => child.days);
    data.l = configs.map(config => config.scheduling.map(item => item.start));
    data.o = configs.map(config => config.scheduling.map(item => item.end));
    data.q = configs.map(config => config.scheduling.map(item => item.space));
    const vaccineResultLength = Math.max(...configs.map(config => config.times));
    const time = [];
    const decision = [];
    for (const child of children) {
      const timeChild = [];
      const decisionChild = [];
      const vaccines = await ctx.service.vaccine.select({ childId: child.id });
      for (const config of configs) {
        const vaccine = vaccines.find(vaccine => vaccine.configId === config.id);
        if (vaccine) {
          const timeConfig = vaccine.time
          const timeConfigArray = new Array(vaccineResultLength).fill(0)
          timeConfigArray[timeConfig] = 1
          timeChild.push(timeConfigArray)
          decisionChild.push(JSON.parse(vaccine.decision))
        } else {
          const timeConfigArray = new Array(vaccineResultLength).fill(0)
          timeChild.push(timeConfigArray)
          decisionChild.push(timeConfigArray)
        }
      }
      time.push(timeChild);
      decision.push(decisionChild);
    }
    data.w = time;
    data.p = decision;
    data.h = new Array(parseInt(days)).fill(0);
    for (const index in data.h) {
      data.h[index] = Math.floor(Math.random() * 20 + 10);
    }
    const jsonData = JSON.stringify(data);
    ctx.attachment('vaccine.json');
    ctx.set('Content-Type', 'application/octet-stream');
    ctx.body = jsonData
    ctx.status = 201;
  }
  async downloadLocal () {
    const ctx = this.ctx;
    ctx.validate(downloadRule, ctx.query);
    ctx.body = 'success';
    ctx.status = 201;
    const days = ctx.query.days || '1';
    const data = {
      // 儿童年龄
      f: [],
      // 最早接种时间
      l: [],
      // 最晚接种时间
      o: [],
      // 是否需要接种
      w: [],
      // 已有接种数量
      h: [],
    };
    const children = await ctx.service.child.select();
    const configs = await ctx.service.config.select();
    const vaccinesTable = await ctx.service.vaccine.all();
    data.f = children.map(child => child.days);
    data.l = configs.map(config => config.scheduling.map(item => item.start));
    data.o = configs.map(config => config.scheduling.map(item => item.end));
    const vaccineResultLength = Math.max(...configs.map(config => config.times));
    const childResult = [];
    let childIndex = 1;
    for (const child of children) {
      childIndex++;
      const configResult = [];
      const vaccines = vaccinesTable.filter(item => item.childId === child.id);
      for (const config of configs) {
        const vaccine = vaccines.find(vaccine => vaccine.configId === config.id);
        const scheduling = config.scheduling;
        let vaccineResult = new Array(vaccineResultLength).fill(0);
        if (vaccine) {
          vaccineResult = new Array(vaccineResultLength).fill(1);
          for (const index in vaccineResult) {
            if (vaccine.end > scheduling[index].end) {
              vaccineResult[index] = 0;
            } else {
              break;
            }
          }
        }
        configResult.push(vaccineResult);
      }
      childResult.push(configResult);
    }
    data.w = childResult;
    data.h = new Array(parseInt(days)).fill(0);
    for (const index in data.h) {
      data.h[index] = Math.floor(Math.random() * 20 + 10);
    }
    for (const item in data) {
      data[item] = helper.dataFormat(data[item]);
    }
    fs.writeFile(path.join(__dirname, '../public/vaccine.dat'), `f=${data.f};\nl=${data.l};\no=${data.o};\nw=${data.w};\nh=${data.h};`)
  }
  async dataLocal () {
    const ctx = this.ctx;
    ctx.validate(dataRule, ctx.query);
    ctx.body = 'success';
    ctx.status = 201;
    const days = ctx.query.days || '1';
    const data = {
      // 儿童年龄
      f: [],
      // 最早接种时间
      l: [],
      // 最晚接种时间
      o: [],
      // 是否需要接种
      w: [],
      // 已有接种数量
      h: [],
    };
    const children = await ctx.service.child.select();
    const configs = await ctx.service.config.select();
    const vaccinesTable = await ctx.service.vaccine.all();
    data.f = children.map(child => child.days);
    data.l = configs.map(config => config.scheduling.map(item => item.start));
    data.o = configs.map(config => config.scheduling.map(item => item.end));
    const vaccineResultLength = Math.max(...configs.map(config => config.times));
    const childResult = [];
    let childIndex = 1;
    for (const child of children) {
      childIndex++;
      const configResult = [];
      const vaccines = vaccinesTable.filter(item => item.childId === child.id);
      for (const config of configs) {
        const vaccine = vaccines.find(vaccine => vaccine.configId === config.id);
        const scheduling = config.scheduling;
        let vaccineResult = new Array(vaccineResultLength).fill(0);
        if (vaccine) {
          vaccineResult = new Array(vaccineResultLength).fill(1);
          for (const index in vaccineResult) {
            if (vaccine.end > scheduling[index].end) {
              vaccineResult[index] = 0;
            } else {
              break;
            }
          }
        }
        configResult.push(vaccineResult);
      }
      childResult.push(configResult);
    }
    data.w = childResult;
    data.h = new Array(parseInt(days)).fill(0);
    for (const index in data.h) {
      data.h[index] = Math.floor(Math.random() * 20 + 10);
    }
    fs.writeFile(path.join(__dirname, '../public/vaccine.json'), JSON.stringify(data))
  }
}

module.exports = ChildController;
