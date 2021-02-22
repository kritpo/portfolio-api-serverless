'use strict';

// import sinon
const sinon = require('sinon');

// import the tested function dependency
const encodeResponse = require('./utils/encodeResponse');

// retrieve the tested module
const httpClientError = require('./httpClientError');

// configure the test suite
describe('httpClientError', () => {
	let encodeResponseStub;

	// setup the stub
	beforeEach(() => {
		// initialize the stub
		encodeResponseStub = sinon.stub(encodeResponse, 'encodeResponse');
	});

	// reset the stub
	afterEach(() => sinon.restore());

	// configure the tests of bad request
	describe('badRequest', () => {
		// configure the test with sample set
		it('with sample set', () => {
			// execute the function
			httpClientError.badRequest({ dumb_header: 42 });

			encodeResponseStub.should.have.been.calledWith(
				400,
				{ dumb_header: 42 },
				{ message: 'Bad Request' },
				'http-io',
				'bad-request'
			);
		});

		// configure the test with minimum params
		it('with minimum params', () => {
			// execute the function
			httpClientError.badRequest();

			encodeResponseStub.should.have.been.calledWith(
				400,
				{},
				{ message: 'Bad Request' },
				'http-io',
				'bad-request'
			);
		});
	});

	// configure the tests of forbidden
	describe('forbidden', () => {
		// configure the test with sample set
		it('with sample set', () => {
			// execute the function
			httpClientError.forbidden({ dumb_header: 42 });

			encodeResponseStub.should.have.been.calledWith(
				403,
				{ dumb_header: 42 },
				{ message: 'Forbidden' },
				'http-io',
				'forbidden'
			);
		});

		// configure the test with minimum params
		it('with minimum params', () => {
			// execute the function
			httpClientError.forbidden();

			encodeResponseStub.should.have.been.calledWith(
				403,
				{},
				{ message: 'Forbidden' },
				'http-io',
				'forbidden'
			);
		});
	});

	// configure the tests of not found
	describe('notFound', () => {
		// configure the test with sample set
		it('with sample set', () => {
			// execute the function
			httpClientError.notFound({ dumb_header: 42 });

			encodeResponseStub.should.have.been.calledWith(
				404,
				{ dumb_header: 42 },
				{ message: 'Not Found' },
				'http-io',
				'not-found'
			);
		});

		// configure the test with minimum params
		it('with minimum params', () => {
			// execute the function
			httpClientError.notFound();

			encodeResponseStub.should.have.been.calledWith(
				404,
				{},
				{ message: 'Not Found' },
				'http-io',
				'not-found'
			);
		});
	});
});
