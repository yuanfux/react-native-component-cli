#!/usr/bin/env node

const { spawn } = require('child_process');
const assert = require('assert');
const path = require('path');
const { deleteDir } = require(path.resolve(__dirname, '../utils'));

const FOLDER_STRUCTURE = `
react-native-test-component
├── demo
│   ├── .gitignore
│   ├── .watchmanconfig
│   ├── App.js
│   ├── app.json
│   ├── babel.config.js
│   ├── metro.config.js
│   └── package.json
├── src
│   └── index.js
├── test
│   └── index.test.js
├── .eslintrc.js
├── .gitignore
├── .travis.yml
├── README.md
├── babel.config.js
├── package.json
└── setup-tests.js
`;

const inputs =[
	'react-native-test-component',
	'\x0D',
	'1.0.0',
	'\x0D',
	'A test component',
	'\x0D',
	'https://github.com/someone/react-native-test-component',
	'\x0D',
	'someone',
	'\x0D',
	'MIT',
	'\x0D'
];

describe('react-native-component-cli', function() {
  describe('#create', function() {
    it('should create expected folder structure', function(done) {
    	// set 10s timeout
    	this.timeout(10000);

    	// create sub process
    	const sub = spawn('./cli.js', ['create'], { stdio: [null, null, null] });

    	// set coding
		sub.stdin.setEncoding('utf-8');

		// async input
		const delayedLoop = (index) => {
			if (index < inputs.length) {
			  setTimeout(function() {
			    sub.stdin.write(inputs[index]);
			    delayedLoop(index + 1);
			  }, 200);
			} else {
			  sub.stdin.end();
			}
		};

		delayedLoop(0);

		let result = ''

		sub.stdout.on('data', (data) => {
		  result += data;
		});

		sub.on('close', (code) => {
		  done(assert(result.includes(FOLDER_STRUCTURE)));
		  // delete created dir
		  deleteDir(path.resolve(process.cwd(), inputs[0]));
		});
    });
  });
});
