'use strict';

// import the resumes components
const resumesPOST = require('./resumesPOST');
const resumeGET = require('./resumeGET');
const resumePUT = require('./resumePUT');
const resumeDELETE = require('./resumeDELETE');

module.exports = {
	resumesPOST,
	resumeGET,
	resumePUT,
	resumeDELETE
};
