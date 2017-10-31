'use strict';

const { log } = require('@hbc-tech/arcade-app');
const merge = require('lodash.merge');
const template = require('./templates/footer.marko');

module.exports = function footer(arcade, options) {
  options = merge({ transport: 'fixture-json' }, options);

  const { app } = arcade;
  // eslint-disable-next-line import/no-dynamic-require
  const Transport = require(`./transports/${options.transport}`);
  const transport = new Transport(log);

  app.use(async (ctx, next) => {
    const data = await transport.request();
    const html = template.renderToString(data);

    ctx.arcade.footer = html;

    await next();
  });
};
