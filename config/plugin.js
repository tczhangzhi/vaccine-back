'use strict';
const path = require('path');

exports.validate = {
  enable: true,
  package: 'egg-validate',
};

exports.mysql = {
  enable: true,
  package: 'egg-mysql',
};

exports.html = {
  enable: true,
  path: path.join(__dirname, '../lib/plugin/egg-view-html'),
};
