'use strict';

module.exports = app => {
  app.view.use('html', require('./lib/view'));
};
