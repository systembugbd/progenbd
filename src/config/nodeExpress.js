const path = require('path');
const inquirer = require('inquirer');

const baseConfig = {

  builds: [
    {
      src: 'src/index.js',
      use: '@progenbd/node-server',
    },
  ],
  routes: [
    {
      src: '/.*',
      dest: 'src/index.js',
    },
  ],
};

async function nodeExpress(config) {
  let mainFile = 'src/index.js';
  try {
    // eslint-disable-next-line
    const packageJSON = require(path.join( process.cwd(), '/package.json'));
    // eslint-disable-next-line
    mainFile = packageJSON.main;
  } catch (e) {
    console.log('Package.json not found, Please type "npm init -y" first in terminal, then try it.');
    process.exit(1);
  }
  // eslint-disable-next-line
let ans = await inquirer
    .prompt({
      type: 'text',
      name: 'main',
      message: 'What is the entry point of your package.json file?',
      default: mainFile,
    });

  baseConfig.builds[0].src = ans.main;
  baseConfig.routes[0].dest = ans.main;

  return {
    ...config,
    ...ans,
    ...baseConfig,
  };
}

module.exports = nodeExpress;
