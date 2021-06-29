const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const baseConfig = {

  builds: [
    {
      src: 'package.json',
      use: '@progenbd/static-build',
      config: { distDir: 'build' },
    },
  ],
  routes: [

    { handle: 'filesystem' },

    { src: '/.*', dest: 'index.html' },

  ],

};

async function configFeF(config, defualtDir = 'dist') {
  let jsonpath;
  let pathPackageJSON;
  let buildScript;
  try {
    jsonpath = path.join(process.cwd(), 'package.json');
    pathPackageJSON = require(jsonpath);
  } catch (e) {
    console.log('Package.json not found, Please type "npm init -y" first in terminal, then try it.');
    process.exit(1);
  }

  const answers = await inquirer
    .prompt(
      [
        {
          type: 'text',
          name: 'directory',
          message: 'What is the build directory?',
          default: defualtDir,
        },
        {
          type: 'confirm',
          name: 'addBuildScript',
          message: 'do you wnat to add/update package.json file with Build Script?',
          default: true,
        },
        {
          type: 'text',
          name: 'buildScript',
          message: 'What is the build script do you like add?',
          default: buildScript,
          when: (ans) => ans.addBuildScript,
        },
      ],
    );

  if (answers.addBuildScript) {
    buildScript = (pathPackageJSON.scripts || {})['progenbd-build'] || 'npm run build';

    if (answers.buildScript) {
      pathPackageJSON.scripts = pathPackageJSON.scripts || {};
    }
    pathPackageJSON.scripts['progenbd-build'] = answers.buildScript;

    fs.writeFileSync(jsonpath, JSON.stringify(pathPackageJSON, null, 2), 'utf8');
    console.log(pathPackageJSON);
  }

  baseConfig.builds[0].config.distDir = answers.directory;
  console.log(baseConfig.builds[0].config.distDir);


  return {
    ...config,
    ...baseConfig,
  };
}

module.exports = configFeF;
