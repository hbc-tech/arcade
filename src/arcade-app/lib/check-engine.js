'use strict';

const execa = require('execa');
const semver = require('semver');

async function check() {
  const pkg = require('../package.json');
  const nodePath = process.argv[0];
  const { stdout } = await execa(nodePath, ['--version']);
  const nodeVersion = stdout.substring(1);

  if (!semver.satisfies(nodeVersion, pkg.engines.node)) {
    const chalk = require('chalk');

    // eslint-disable-next-line no-console
    console.log(chalk`\n💀  {yellow Ahhh!} You must be using Node v${pkg.engines.node} to run this app. Yours is v${nodeVersion}`);
    process.exit(1);
  }
}

check();
