'use strict';

module.exports = class Transport {
  constructor(name, source, log) {
    this.log = log;
    this.name = name;
    this.source = source;

    log.trace(`transport init: ${name}`);
  }

  request() {
    this.log.trace(`transport request: ${this.name}`);
  }
};
