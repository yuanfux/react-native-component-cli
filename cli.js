#!/usr/bin/env node

const program = require('commander');
const inquirer = require('inquirer');
const packageInfo = require('./package.json');
const path = require('path');

const util = require('util');
const utils = require('./utils');

const log = (obj) => {
  console.log(util.inspect(obj, false, null, true));
}

const questions = [
  {
    type: 'input',
    name: 'name',
    message: 'component / folder name (kebab-case preferred):',
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
    // console.log('create a new react native component', path.resolve(__dirname, 'template'));
    // const baseDir = path.resolve(__dirname, 'template');
    // walkSync(
    //   baseDir,
    //   baseDir + '/',
    //   fileHandler(
    //     path.resolve(process.cwd(), 'react-native-test-component'),
    //     baseDir
    //     )
    //   );
    // log(files);
    inquirer
      .prompt(questions)
      .then(answers => {
        // log(answers);
        answers.camelCaseName = utils.kebab2Camel(answers.name);
        log('answers', answers);
        const baseDir = path.resolve(__dirname, 'template');
        utils.walkSync(
          baseDir,
          baseDir + '/',
          utils.fileHandler(
            path.resolve(process.cwd(), answers.name),
            baseDir,
            answers
          )
        );
      });
  });

program.parse(process.argv);
