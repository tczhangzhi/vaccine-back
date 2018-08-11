'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const ctx = this.ctx;
    await ctx.render('index.html');
    ctx.set('Content-Type', 'text/html');
  }
}

module.exports = HomeController;
