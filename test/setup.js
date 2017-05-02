/*
  This is the setup file that allows the unit tests
  to run with JSDOM instead of actually providing
  a real DOM to use
*/

var jsdom = require('jsdom').jsdom;

global.document = jsdom('');
global.window = document.defaultView;
Object.keys(document.defaultView).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = document.defaultView[property];
  }
});

global.navigator = {
  platform: 'mac',
  userAgent: 'node.js',
  appName: ''
};

import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import sinonChai from 'sinon-chai';
import chaiImmutable from 'chai-immutable';
chai.use(chaiImmutable);
chai.use(sinonChai);
chai.use(chaiEnzyme());

global.HTMLElement = window.HTMLElement;
global.TextNode = window.TextNode;