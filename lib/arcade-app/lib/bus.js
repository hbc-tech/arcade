'use strict';

module.exports = function sockets() {
  const nanobus = require('nanobus');

  this.bus = nanobus();
};
