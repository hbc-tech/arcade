'use strict';

module.exports = function middleware(app) {
  const logger = require('koa-logger');
  // const rewrite = require('koa-rewrite');
  const statc = require('koa-static');

  app.use(logger());

  // rewrites have to be specified _before_ static routes
  // TODO: allow an app to specify rewrite rules
  // app.use(rewrite('/a/*', '/$1'));

  app.use(statc(app.root('/public')));

  // TODO: allow an app to specify additional middleware
};
