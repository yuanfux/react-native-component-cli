// setup-tests.js

import 'react-native';
import 'jest-enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

/**
 * Set up DOM in node.js environment for Enzyme to mount to
 */
const { JSDOM } = require('jsdom');

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js',
};
copyProps(window, global);

/**
 * Set up Enzyme to mount to DOM, simulate events,
 * and inspect the DOM in tests.
 */
Enzyme.configure({ adapter: new Adapter() });

// suppress irrelevant errors
// only show relevant ones
const suppressedErrors = /(React does not recognize the.*prop on a DOM element|Unknown event handler property|is using incorrect casing|Received `true` for a non-boolean attribute `accessible`|The tag.*is unrecognized in this browser)/
const realConsoleError = console.error
console.error = message => {
  if (message.match(suppressedErrors)) {
    return
  }
  realConsoleError(message)
}
