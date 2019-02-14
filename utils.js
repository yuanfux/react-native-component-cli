const fs = require('fs');
const path = require('path');
const camelCase = require('camelcase');
const mustache = require('mustache');
const emoji = require('node-emoji');
const tree = require('tree-node-cli');
const rimraf = require('rimraf');
const chalk = require('chalk');

const checkDirExistence = dirPath => {
  return fs.existsSync(dirPath);
}

const ensureDirectoryExistence = filePath  => {
  const dirname = path.dirname(filePath);
  if (checkDirExistence(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
}

const writeToFile = (filePath, content) => {
  try {
    ensureDirectoryExistence(filePath);
    fs.writeFileSync(filePath, content, 'utf8');
  } catch (e) {
    throw e;
  }
}

const walkSync = (baseDir, dirPath, handler) => {
  fs.readdirSync(dirPath, 'utf8').forEach(file => {
    if (fs.statSync(dirPath + file).isDirectory()) {
      walkSync(baseDir, dirPath + file + '/', handler);
    } else {
      handler(path.relative(baseDir, dirPath + file));
    }
  });
  return;
}

const mustached = (filePath, tags) => {
  const file = fs.readFileSync(path.resolve(filePath), 'utf8');
  return mustache.render(file, tags);
}

const fileHandler = (writeDir, moduleDir, tags) => fileRelativePath => {
  let content;
  let normalizedFileRelativePath;
  const hbsRegex = /\.hbs$/;
  if (hbsRegex.test(fileRelativePath)) {
    content = mustached(path.resolve(moduleDir, fileRelativePath), tags);
    normalizedFileRelativePath = fileRelativePath.replace(hbsRegex, '');
  } else {
    content = fs.readFileSync(path.resolve(moduleDir, fileRelativePath), 'utf8');
    normalizedFileRelativePath = fileRelativePath;
  }
  writeToFile(path.resolve(writeDir, normalizedFileRelativePath), content);
}

const kebab2Camel = kebab => {
  return camelCase(kebab.replace('react-native-', ''), { pascalCase: true });
}

const log = (type, params) => {
  if (type === 'ERR_DIR_EXIST') {
    console.log(emoji.get('x'), ` Aborted: The directory <${params.name}> has already existed.`);
    console.log(emoji.get('point_right'), ' Please try again with a different directory name.');
  } else if (type === 'ERR_REASON') {
    console.log(emoji.get('x'), `Aborted: ${params.reason}`);
  } else if (type === 'DONE') {
    console.log(tree(params.writeDir, {
      allFiles: true,
      dirsFirst: true
    }));
    console.log(emoji.get('sparkles'), ` ${chalk.bold('Done in ')}${chalk.green(params.time)}`);
    console.log(emoji.get('point_right'), ` ${chalk.bold('Quick Tips')}`);
    console.log(`    ${chalk.bold('1.')} ${chalk.green(' Run Tests')}`);
    console.log(`    •  $ cd ${params.name}`);
    console.log('    •  $ yarn');
    console.log('    •  $ yarn test');
    console.log(`    ${chalk.bold('2.')} ${chalk.green(' Dev / View Demo')}`);
    console.log(`    •  $ cd ${params.name}/demo`);
    console.log('    •  $ yarn');
    console.log('    •  $ yarn start');
    console.log(`${chalk.gray('*   If you prefer ')}${chalk.bold.grey('npm')}${chalk.gray(', use ')}${chalk.bold.gray('npm')}${chalk.gray('.')}`);
  }
}

const hrtime2ms = hrtime => {
  return (((hrtime[0] * 1e9) + hrtime[1]) / 1e6).toFixed(2);
}

const deleteDir = dirPath => {
  if (checkDirExistence(dirPath)) {
    rimraf.sync(dirPath);
  }
}

module.exports = {
  checkDirExistence,
  writeToFile,
  walkSync,
  mustached,
  fileHandler,
  kebab2Camel,
  log,
  hrtime2ms,
  deleteDir
}
