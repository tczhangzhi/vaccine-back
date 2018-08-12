'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  app.router.post('/api/user/login', app.controller.user.login);
  app.router.get('/api/child/download', app.controller.child.download);
  app.router.get('/api/child/data', app.controller.child.data);
  app.router.get('/api/child/downloadLocal', app.controller.child.downloadLocal);
  app.router.get('/api/child/downloadJSON', app.controller.child.downloadJSON);
  app.router.get('/api/child/downloadJSONLocal', app.controller.child.downloadJSONLocal);
  app.router.get('/api/child/dataLocal', app.controller.child.dataLocal);
  app.router.get('/api/child/clean', app.controller.child.clean);
  app.router.get('/api/child/list', app.controller.child.list);
  app.router.get('/api/child/random', app.controller.child.random);
  app.router.get('/api/child/init', app.controller.child.init);
  app.router.get('/api/config/list', app.controller.config.list);
  app.router.resources('child', '/api/child', app.controller.child);
  app.router.resources('config', '/api/config', app.controller.config);
  app.router.resources('vaccine', '/api/vaccine', app.controller.vaccine);
  router.get(/.*/, controller.home.index);
};
