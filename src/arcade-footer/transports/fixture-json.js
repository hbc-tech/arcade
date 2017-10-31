'use strict';

const { Transport } = require('@hbc-tech/arcade-app'); // eslint-disable-line

module.exports = class FixtureTransport extends Transport {
  constructor(log) {
    super('fixture-json', '../fixtures/footer.json', log);
  }

  request() {
    // eslint-disable-next-line import/no-dynamic-require
    const json = require(this.source);
    return json;
  }
};
