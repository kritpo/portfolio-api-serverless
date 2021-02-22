'use strict';

// import sinon
const sinon = require('sinon');

// import the tested function dependency
const encodeResponse = require('./utils/encodeResponse');

// retrieve the tested module
const httpSuccess = require('./httpSuccess');

// configure the test suite
describe('httpSuccess', () => {
	let encodeResponseStub;

	// setup the stub
	beforeEach(() => {
		// initialize the stub
		encodeResponseStub = sinon.stub(encodeResponse, 'encodeResponse');
	});

	// reset the stub
	afterEach(() => sinon.restore());

	// configure the tests of ok
	describe('ok', () => {
		// configure the test with sample set
		it('with sample set', () => {
			// execute the function
			httpSuccess.ok({ data: 42 }, { dumb_header: 42 });

			encodeResponseStub.should.have.been.calledWith(
				200,
				{ dumb_header: 42 },
				{ data: 42 },
				'http-io',
				'ok'
			);
		});

		// configure the test with minimum params
		it('with minimum params', () => {
			// execute the function
			httpSuccess.ok({ data: 42 });

			encodeResponseStub.should.have.been.calledWith(
				200,
				{},
				{ data: 42 },
				'http-io',
				'ok'
			);
		});
	});

	// configure the tests of created
	describe('created', () => {
		// configure the test with sample set
		it('with sample set', () => {
			// execute the function
			httpSuccess.created({ dumb_header: 42 });

			encodeResponseStub.should.have.been.calledWith(
				201,
				{ dumb_header: 42 },
				null,
				'http-io',
				'created'
			);
		});

		// configure the test with minimum params
		it('with minimum params', () => {
			// execute the function
			httpSuccess.created();

			encodeResponseStub.should.have.been.calledWith(
				201,
				{},
				null,
				'http-io',
				'created'
			);
		});
	});

	// configure the tests of no content
	describe('noContent', () => {
		// configure the test with sample set
		it('with sample set', () => {
			// execute the function
			httpSuccess.noContent({ dumb_header: 42 });

			encodeResponseStub.should.have.been.calledWith(
				204,
				{ dumb_header: 42 },
				null,
				'http-io',
				'no-content'
			);
		});

		// configure the test with minimum params
		it('with minimum params', () => {
			// execute the function
			httpSuccess.noContent();

			encodeResponseStub.should.have.been.calledWith(
				204,
				{},
				null,
				'http-io',
				'no-content'
			);
		});
	});
});
