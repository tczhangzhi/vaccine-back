'use strict';

const mysql = require('./config.mysql');

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1519461098515_3469';

  // add your config here
  config.middleware = [ 'error' ];

  config.error = {
    match: '/api',
  };

  config.mysql = mysql;

  // config.security = {
  //   csrf: {
  //     enable: false,
  //   },
  // };

  config.view = {
    mapping: {
      '.html': 'html',
    },
  };

  config.cluster = {
    listen: {
      port: 80,
    },
  };

  return config;
};
