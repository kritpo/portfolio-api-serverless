'use strict';

// import sinon
const sinon = require('sinon');

// import the tested function dependency
const encodeResponse = require('./utils/encodeResponse');

// retrieve the tested module
const httpServerError = require('./httpServerError');

// configure the test suite
describe('httpServerError', () => {
	let encodeResponseStub;

	// setup the stub
	beforeEach(() => {
		// initialize the stub
		encodeResponseStub = sinon.stub(encodeResponse, 'encodeResponse');
	});

	// reset the stub
	afterEach(() => sinon.restore());

	// configure the tests of internal server error
	describe('internalServerError', () => {
		// configure the test with sample set
		it('with sample set', () => {
			// execute the function
			httpServerError.internalServerError({ dumb_header: 42 });

			encodeResponseStub.should.have.been.calledWith(
				500,
				{ dumb_header: 42 },
				{ message: 'Internal Server Error' },
				'http-io',
				'internal-server-error'
			);
		});

		// configure the test with minimum params
		it('with minimum params', () => {
			// execute the function
			httpServerError.internalServerError();

			encodeResponseStub.should.have.been.calledWith(
				500,
				{},
				{ message: 'Internal Server Error' },
				'http-io',
				'internal-server-error'
			);
		});
	});
});
