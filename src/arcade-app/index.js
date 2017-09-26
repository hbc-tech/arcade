'use strict';

require('./lib/check-engine');
require('marko/node-require');

const path = require('path');
const chalk = require('chalk');
const log = require('./lib/log');
const Transport = require('./lib/transport');
const pkg = require('./package.json');

class Arcade {
  constructor(options) {
    const merge = require('lodash.merge');
    const Koa = require('koa');
    const Router = require('koa-router');
    const bus = require('./lib/bus').bind(this);
    const middleware = require('./lib/middleware').bind(this);
    // eslint-disable-next-line import/no-dynamic-require
    const parentPkg = require(path.join(process.cwd(), 'package.json'));

    /* eslint-disable no-console */
    console.log(chalk.cyan('  .- .-. -.-. .- -.. .'));
    console.log(chalk`  arcade {cyan v${pkg.version}}`);
    console.log(chalk`  ${parentPkg.name} {cyan v${parentPkg.version}}\n`);
    /* eslint-enable no-console */

    const defaults = {
      port: 8080,
      wssPort: 8081
    };
    const app = new Koa();
    const router = new Router();

    this.app = app;
    this.log = log;
    this.options = merge(defaults, options);

    bus();
    middleware();

    // attach router convenience methods to the app
    for (const fn of ['get', 'put', 'post', 'patch', 'delete', 'del', 'url']) {
      this[fn] = router[fn].bind(router);
    }

    this.router = router;
  }

  // eslint-disable-next-line class-methods-use-this
  root(...paths) {
    paths.unshift(process.cwd());
    return path.join(...paths);
  }

  start() {
    const sockets = require('./lib/sockets').bind(this);

    this.app
      .use(this.router.routes())
      .use(this.router.allowedMethods());

    this.app.listen(this.options.port);

    log.info(chalk`{green ☉}  listening on port {green ${this.options.port}}`);

    sockets();
  }
}

const res = {
  log,
  Arcade,
  Transport
};

module.exports = res;
