'use strict';

require('./lib/check-engine');
require('marko/node-require');

module.exports = class Arcade {
  constructor(options) {
    const deepAssign = require('deep-assign');

    const Koa = require('koa');
    const Router = require('koa-router');

    const defaults = {
      port: 8080,
      wssPort: 8090
    };

    this.app = new Koa();
    this.options = deepAssign(defaults, options);

    const bus = require('./lib/bus');
    const log = require('./lib/log');
    const middleware = require('./lib/middleware');
    const router = new Router();

    // TODO: remove this default route when we build an app atop this
    router.get('/', (ctx) => {
      ctx.body = 'Hello World';
    });

    bus();
    log();
    middleware();

    // attach router convenience methods to the app
    for (const fn of ['get', 'put', 'post', 'patch', 'delete', 'del', 'url']) {
      this[fn] = router[fn];
    }

    this.router = router;
  }

  static root(...paths) {
    const path = require('path');
    paths.unshift(process.env.PWD);
    return path.join(...paths);
  }

  start() {
    const sockets = require('./lib/sockets');

    this.app
      .use(this.router.routes())
      .use(this.router.allowedMethods());

    this.app.listen(this.options.port);

    sockets();
  }
};
