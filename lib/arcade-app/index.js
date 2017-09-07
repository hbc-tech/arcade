'use strict';

module.exports = function arcade(options) {
  require('marko/node-require');

  const deepAssign = require('deep-assign');
  const path = require('path');

  const Koa = require('koa');

  const log = require('./lib/log');
  const middleware = require('./lib/middleware');
  const routes = require('./lib/routes');

  const app = new Koa();
  const defaults = {
    port: 3000
  };

  options = deepAssign(defaults, options);

  app.root = (...paths) => {
    paths.unshift(process.env.PWD);
    return path.join(...paths);
  };

  log(app, options);
  middleware(app, options);
  routes(app, options);

  app.listen(options.port);
};
