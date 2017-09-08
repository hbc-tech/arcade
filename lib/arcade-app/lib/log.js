'use strict';

module.exports = function log() {
  const chalk = require('chalk');
  const logger = require('loglevel').getLogger('arcade');
  const prefix = require('loglevel-plugin-prefix');
  const logSymbols = require('log-symbols');

  const symbols = {
    trace: chalk.grey('₸'),
    debug: chalk.cyan('➤'),
    info: logSymbols.info,
    warn: logSymbols.warning,
    error: logSymbols.error
  };

  prefix.apply(logger, {
    template: '%l %n: ',
    levelFormatter(level) {
      return symbols[level];
    }
  });

  this.log = logger;
};
