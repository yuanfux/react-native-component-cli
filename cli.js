#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const packageInfo = require('./package.json');
const path = require('path');

const util = require('util');
const Utils = require('./utils');

const log = (obj) => {
  console.log(util.inspect(obj, false, null, true));
}

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'component / directory name (kebab-case preferred):',
    default: () => 'react-native-component'
  },
  {
    type: 'input',
    name: 'version',
    message: 'version:',
    default: () => '1.0.0'
  },
  {
    type: 'input',
    name: 'description',
    message: 'description:'
  },
  {
    type: 'input',
    name: 'gitRepo',
    message: 'git repository:'
  },
  {
    type: 'input',
    name: 'author',
    message: 'author:'
  },
  {
    type: 'input',
    name: 'license',
    message: 'license:',
    default: () => 'ISC'
  }
];

program
  .version(packageInfo.version, '-v, --version')

program
  .command('create')
  .action((dir, cmd) => {
    inquirer
      .prompt(questions)
      .then(answers => {
        answers.camelCaseName = Utils.kebab2Camel(answers.name);
        const baseDir = path.resolve(__dirname, 'template');
        const writeDir = path.resolve(process.cwd(), answers.name);
        if (Utils.checkDirExistence(writeDir)) {
          Utils.log('ERR_DIR_EXIST', {
            name: answers.name
          });
        } else {
          try {
            const startTime = process.hrtime();
            Utils.walkSync(
              baseDir,
              baseDir + '/',
              Utils.fileHandler(
                writeDir,
                baseDir,
                answers
              )
            );
            const endTime = process.hrtime(startTime);
            Utils.log('DONE', {
              time: `${Utils.hrtime2ms(endTime)}ms`,
              writeDir,
              name: answers.name
            });
          } catch (e) {
            Utils.log('ERR_REASON', {
              reason: e
            });
            Utils.deleteDir(writeDir);
          }
        }
      });
  });

program.parse(process.argv);
