
# react-native-component-cli
[![](https://img.shields.io/npm/v/react-native-component-cli.svg?style=flat-square)](https://www.npmjs.com/package/react-native-component-cli) [![](https://img.shields.io/github/issues/yuanfux/react-native-component-cli.svg?style=flat-square)](https://github.com/yuanfux/react-native-component-cli/issues) ![](https://img.shields.io/snyk/vulnerabilities/github/yuanfux/react-native-component-cli.svg?style=flat-square) ![](https://img.shields.io/npm/dt/react-native-component-cli.svg?style=flat-square) ![](https://img.shields.io/npm/l/react-native-component-cli.svg?style=flat-square) ![](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square) ![](https://img.shields.io/maintenance/yes/2019.svg?style=flat-square)

<p align="middle">
	<img src="https://user-images.githubusercontent.com/6414178/61050130-d585d900-a418-11e9-9cf6-14b2696ac3b9.png" width="230" />
	<img src="https://user-images.githubusercontent.com/6414178/61051740-5e524400-a41c-11e9-9634-6270ad23c48c.png" height="230" />
</p>


## Why?
Many repositories of react native component are not well structured and lack of basic functionalities including testing, development, continuous integration... `react-native-component-cli` helps to instantly scaffold a react-native-component project with following features:
1. **Dev locally** - Easy local dev with minimum dependencies
2. **Test** - Fully test your component with Enzyme
3. **Lint** - Lint source code with ready-to-go rules
4. **CI** - Fill in the missing parts in your CI workflow

## Install
```bash
$ npm install react-native-component-cli -g
```

## Usage
#### 1. Create & Config
```bash
$ rnc create
```
<p align="center">
	<img title="demo" src="https://user-images.githubusercontent.com/6414178/52773284-8c9e4400-3075-11e9-8b3b-45ed494f70a1.gif" width="450" />
</p>

#### 2. Run Test
- by **yarn**
	```bash
	$ cd path-to-your-component
	$ yarn
	$ yarn test
	```
- by **npm**
	```bash
	$ cd path-to-your-component
	$ npm install
	$ npm test
	```

#### 3. Start Dev / View Demo
- by **yarn**
	```bash
	$ cd path-to-your-component/demo
	$ yarn
	$ yarn start
	```
- by **npm**
	```bash
	$ cd path-to-your-component/demo
	$ npm install
	$ npm start
	```

## Output
```
react-native-example-component
├── demo                // contains an Expo project for dev
│   ├── .gitignore      // git ignore for the Expo project
│   ├── .watchmanconfig // the watchman config
│   ├── App.js          // the main file for develop the Expo project
│   ├── app.json        // the Expo project config
│   ├── babel.config.js // the babel config for the Expo project
│   ├── metro.config.js // the metro bundler config
│   └── package.json    // package.json for the Expo project
├── src                 // contains source file(s) for the component
│   └── index.js
├── test                // contains test file(s) for the component
│   └── index.test.js 
├── .eslintrc.js        // the eslint config for the component
├── babel.config.js     // the babel config for the test environment
├── setup-tests.js      // the jest-setup file for Enzyme
├── README.md           // README for the component
├── .gitignore          // git ignore for the component
└── package.json        // pacakge.json for the component
```

## Roadmap
- [x] Upgrade to Expo SDK 33.0 ( React Native 0.59.8 & React 16.8.3 )

## License
MIT
