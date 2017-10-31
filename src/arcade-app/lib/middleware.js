'use strict';

module.exports = function middleware() {
  const merge = require('lodash.merge');
  const koaLogger = require('koa-logger');
  const statc = require('koa-static');
  const layout = require('../templates/layout.marko');
  const { app } = this;

  // create a context objext specifically for arcade data
  app.use(async (ctx, next) => {
    ctx.arcade = {
      head: {
        links: []
      },

      scripts: {
        body: {
          end: [],
          start: []
        }
      },

      /**
       * @method render
       * @desc renders a page using the arcade app layout
       *
       * @param main  The markup/html that will be placed into the <main> element
       */
      render(main) {
        const data = merge({ main }, ctx.arcade);
        ctx.body = layout.renderToString(data);
      }
    };

    await next();
  });

  app.use(koaLogger());
  app.use(statc(this.root('/public')));
};
