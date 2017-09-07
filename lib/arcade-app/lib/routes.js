'use strict';

module.exports = function routes(app) {
  const Router = require('koa-router');
  const router = new Router();

  // TODO: load routes from a local app directory

  // TODO: remove this default route when we build an app atop this
  router.get('/', (ctx) => {
    ctx.body = 'Hello World';
  });

  // though this is technically middleware, it's organizationally better to have
  // this contained within the same module managing routes.
  app
    .use(router.routes())
    .use(router.allowedMethods());

  app.router = router;
};
