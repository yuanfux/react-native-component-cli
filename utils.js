const fs = require('fs');
const path = require('path');
const camelCase = require('camelcase');
const mustache = require('mustache');

const ensureDirectoryExistence = filePath  => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
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
  const content = mustached(path.resolve(moduleDir, fileRelativePath), tags);
  writeToFile(path.resolve(writeDir, fileRelativePath), content);
}

const kebab2Camel = kebab => {
  return camelCase(kebab.replace('react-native-', ''), { pascalCase: true });
}

module.exports = {
  writeToFile,
  walkSync,
  mustached,
  fileHandler,
  kebab2Camel
}
