'use strict';

const request = require('request-promise-native');
const { Transport } = require('@hbc-tech/arcade-app'); // eslint-disable-line

module.exports = class SvcHeaderTransport extends Transport {
  constructor(log) {
    super('svc-header', 'http://localhost:8090/0.0.1/header', log);
  }

  async request() {
    const json = await request(this.source);
    return json;
  }
};
