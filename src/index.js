console.clear();

const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');

const baseUrl = path.basename(process.cwd());
const progenConfigExists = fs.existsSync('progen-config.json');
const nodeExpressConfig = require('./config/nodeExpress');

let config = {
  version: 2,

};

async function buildProgenbd() {
  const answers = await inquirer
    .prompt([
      {
        type: 'Confirm',
        name: 'name',
        message: 'What is the project name?',
        default: baseUrl,
      },
      {
        type: 'list',
        name: 'type',
        message: 'Which project do you want to build?',
        choices: [
          'node-express',
          'static',
          'react',
          'vue',
          'static-build',
          'lambda',
        ],
      },
    ]);

  switch (answers.type) {
    case 'node-express':
      config.name = answers.name;
      config = await nodeExpressConfig(config);
      console.log(config);
      break;
    default:

      break;
  }
}

if (progenConfigExists) {
  inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'overwrite',
        message:
          'progen-config.json is already exists, do you want to overwrite it?',
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
