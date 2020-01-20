
# react-native-component-cli
[![](https://img.shields.io/npm/v/react-native-component-cli.svg?style=flat-square)](https://www.npmjs.com/package/react-native-component-cli) [![](https://img.shields.io/github/issues/yuanfux/react-native-component-cli.svg?style=flat-square)](https://github.com/yuanfux/react-native-component-cli/issues) ![Travis (.org) branch](https://img.shields.io/travis/yuanfux/react-native-component-cli/master.svg?style=flat-square) ![](https://img.shields.io/snyk/vulnerabilities/github/yuanfux/react-native-component-cli.svg?style=flat-square) ![](https://img.shields.io/npm/dt/react-native-component-cli.svg?style=flat-square) ![](https://img.shields.io/npm/l/react-native-component-cli.svg?style=flat-square) ![](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square) ![](https://img.shields.io/maintenance/yes/2020.svg?style=flat-square)

<p align="middle">
	<img src="https://user-images.githubusercontent.com/6414178/61050130-d585d900-a418-11e9-9cf6-14b2696ac3b9.png" width="230" />
	<img src="https://user-images.githubusercontent.com/6414178/61052197-7b3b4700-a41d-11e9-95d9-301106d10426.png" height="230" />
</p>


## Why?
Many repositories of react native component are not well structured and missing basic parts in CI / CD workflow including development setup, testing, lint... `react-native-component-cli` helps to instantly scaffold a react-native-component project with following features:
1. **Dev locally** - Easy local dev with minimum dependencies
2. **Test** - Fully test your component with Enzyme
3. **Lint** - Lint source code with ready-to-go rules
4. **Stock** - No unofficial 3rd Party Lib involved / Stock React Native Dev Experience

## Install
```bash
$ npm install react-native-component-cli -g
```

Installing `expo-cli` is optional but **recommended**
```
$ npm install expo-cli -g
```

If you are using an NPM version before 5.2.0, install `npx` with the following cmd
```
$ npm install npx -g
```

## Usage
### 1. Create
```bash
$ rnc create
```

![render1562903344619](https://user-images.githubusercontent.com/6414178/61101315-ed527100-a49b-11e9-82fa-90d7db18ea14.gif)

### 2. Install

```bash
$ cd path-to-your-react-native-component
$ npm install
```

### 3. Run Test

```bash
$ npm test
```

###  4. Start Dev / View Demo

```bash
$ npm start
```

## Output
```
react-native-example-component
├── demo                // contains an Expo project for dev
│   ├── App.js          // the main file for develop the Expo project
│   ├── AppEntry.js     // the entry point for the Expo project
│   ├── app.json        // the Expo project config
│   └── metro.config.js // the metro bundler config
├── src                 // contains source file(s) for the component
│   └── index.js
├── test                // contains test file(s) for the component
│   └── index.test.js 
├── .eslintrc.js        // the eslint config for the component
├── babel.config.js     // the babel config for the test & Expo environments
├── setup-tests.js      // the jest-setup file for Enzyme
├── README.md           // README for the component
├── .gitignore          // git ignore for the component
└── package.json        // pacakge.json for the component
```

## Roadmap
- [x] Upgrade to Expo SDK 33.0 ( React Native 0.59.8 & React 16.8.3 )
- [x] Upgrade to Expo SDK 35.0 ( React Native 0.59.8 & React 16.8.6 )
- [x] Upgrade to Expo SDK 36.0 ( React Native 0.61.4 & React 16.9.0 )

## License
MIT
