const fs = require('fs');
const path = require('path');

const inquirer = require('inquirer');

inquirer
  .prompt(
    [
      {
        type: 'Confirm',
        name: 'delete',
        message: 'Are you sure, you want to delete',
        default: false,

      },
    ],
  );
