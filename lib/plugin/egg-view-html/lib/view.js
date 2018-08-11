'use strict';
const fs = require('mz/fs');

const cache = {};

module.exports = class HtmlView {
  async render(filename) {
    if (!cache[filename]) {
      cache[filename] = await fs.readFile(filename);
    }
    return cache[filename];
  }

  async renderString(tpl) {
    return tpl;
  }
};
