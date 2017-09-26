'use strict';

const chalk = require('chalk');
const loglevel = require('loglevel');
const prefix = require('loglevel-plugin-prefix');
const logSymbols = require('log-symbols');

const symbols = {
  trace: chalk.grey('₸'),
  debug: chalk.cyan('➤'),
  info: logSymbols.info,
  warn: logSymbols.warning,
  error: logSymbols.error
};

prefix.apply(loglevel, {
  template: '%l %n:',
  levelFormatter(level) {
    return symbols[level];
  }
});

const log = loglevel.getLogger('arcade');

log.setLevel('info');
log.root = loglevel;

module.exports = log;
