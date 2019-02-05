const path = require('path');
const blacklist = require('metro-config/src/defaults/blacklist');

module.exports = {
  resolver: {
    blacklistRE: blacklist([
      new RegExp(
        `^${escape(path.resolve(__dirname, '..', 'node_modules'))}\\/.*$`,
      ),
    ]),
    providesModuleNodeModules: [
      'react-native',
      'react',
      'prop-types',
      '@babel/runtime',
    ],
  },
  projectRoot: path.resolve(__dirname),
  watchFolders: [
    path.resolve(__dirname, '..'),
  ],
};
