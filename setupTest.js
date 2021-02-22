'use strict';

// import chai test dependencies
const chai = require('chai');
const dirtyChai = require('dirty-chai');
const sinonChai = require('sinon-chai');

// configure should style
global.should = chai.should();

// assembles test dependencies to chai
chai.use(dirtyChai).use(sinonChai);
