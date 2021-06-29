#! /usr/bin/env node

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const baseUrl = path.basename(process.cwd());
const progenbdPath = path.join(process.cwd(), 'progenbd.json');
const progenConfigExists = fs.existsSync(progenbdPath);

const nodeExpressConfig = require('./config/nodeExpress');
const staticConfig = require('./config/staticConfig');
const configFeF = require('./config/configFeF');

let config = {
  version: '1.0.0',

};

async function buildProgenbd() {
  const answers = await inquirer
    .prompt([
      {
        type: 'text',
        name: 'name',
        message: 'What is the project name? 🏡',
        default: baseUrl,
      },
      {
        type: 'list',
        name: 'type',
        message: 'Which project do you want to build? 🥧',
        choices: [
          'node-express',
          'static',
          'react',
          'vue',
          'static-build',
        ],
      },
    ]);

  switch (answers.type) {
    case 'node-express':
      config.name = answers.name;
      config = await nodeExpressConfig(config);

      break;
    case 'static':
      config.name = answers.name;
      config = await staticConfig(config);

      break;
    case 'react':
      config.name = answers.name;
      config = await configFeF(config, 'build');
      break;
    case 'vue':
      config.name = answers.name;
      config = await configFeF(config);
      break;
    case 'static-build':
      config.name = answers.name;
      config = await configFeF(config);
      break;
    default:

      break;
  }
  // console.log(config);

  const answersMore = await inquirer
    .prompt([{
      type: 'confirm',
      name: 'specifyalias',
      message: 'Would you like to specify  🐭 alias?',
      default: true,
    },
    {
      type: 'text',
      name: 'alias',
      message: 'what is the 🐭 alias write (,) seperated.',
      default: answers.name,
      when: (a) => a.specifyalias,
    },

    ]);

  config.alias = answersMore.alias ? answersMore.alias.split(',').map((a) => a.trim()) : undefined;

  fs.writeFileSync(progenbdPath, JSON.stringify(config, null, 2), 'utf8');

  console.log('All Done 🍦, type progenbd to deploy in terminal');
  process.exit(0);
}

if (progenConfigExists) {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message:
          'progenbd.json is already exists, do you want to overwrite it?',
        default: false,
      },
    ])
    .then((answers) => {
      // answers if yes, then generate project
      if (answers.overwrite) {
        buildProgenbd();
      } else {
        console.log('Goodbye! 👏');
      }
    });
} else {
  buildProgenbd();
}

// const projectDirectory = fs.mkdir(baseUrl, answers.projectprojectname);
// console.log(`${baseUrl}/${projectDirectory}`)
// console.log(answers);
// const nodeExpressProjectDone = fs.writeFileSync(`${baseUrl}/${projectDirectory}/projenbd.json`, JSON.stringify({nodeExpressConfig}));
// console.log('Node Express Project successfully generated 😀', answers.projectprojectname, nodeExpressConfig, nodeExpressProjectDone);

// Folder and File generators

// function folderAndFile() {
//   if (!fs.existsSync(`${baseUrl}/${answers.projectname}`)) {
//     fs.mkdir(`${answers.projectname}`, { recursive: true }, (err) => {
//       fs.writeFileSync('progen-config.json', JSON.stringify({ nodeExpressConfig }));

//       if (err) throw err;
//     });
//   } else {
//     console.log(`Another '${answers.projectname}' project folder already exists`);
//   }

//   console.log(answers);
// }
