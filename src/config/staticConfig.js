const path = require('path');
const inquirer = require('inquirer');

const baseConfig = {
  builds: {
    src: '*',
    use: '@progenbd/static',
  },
};

async function staticConfig(config) {
  try {
    // eslint-disable-next-line
    const packageJSON = require(path.join( process.cwd(), '/package.json'));
    // eslint-disable-next-line
    mainFile = packageJSON.main;
  } catch (e) {
    console.log('Package.json not found, Please type "npm init -y" first in terminal, then try it.');
    process.exit(1);
  }

  const answers = await inquirer
    .prompt(
      {
        type: 'text',
        name: 'staticdir',
        message: 'What folder do you want to deploy? ',
        default: '.',
      },
    );
  let pathFormate = path.format({
    root: answers.staticdir,
    name: '/*'

  });

  baseConfig.builds.src = pathFormate

  return {
    ...config,
    ...baseConfig,
  };
}

module.exports = staticConfig;
