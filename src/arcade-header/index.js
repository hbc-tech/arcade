'use strict';

const { log } = require('@hbc-tech/arcade-app');
const template = require('./templates/header.marko');
const SvcHeader = require('./transports/svc-header');

module.exports = function header(arcade) {
  const { app } = arcade;
  const transport = new SvcHeader(log);

  app.use(async (ctx, next) => {
    const json = await transport.request();
    const data = JSON.parse(json);
    const html = template.renderToString(data);

    ctx.arcade.header = html;

    await next();
  });
};
