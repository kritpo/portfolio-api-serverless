'use strict';

// import sinon
const sinon = require('sinon');

// retrieve the tested class
const ClientError = require('./ClientError');

// configure the test suite
describe('ClientError', () => {
	// reset the stubs
	afterEach(() => sinon.restore());

	// configure the test with sample set
	it('with sample set', () => {
		// save and empty Error.captureStackTrace if exist
		const captureSTSave = Error.captureStackTrace;
		Error.captureStackTrace = undefined;

		// execute the function
		const result = new ClientError('dumb_type', 'dumb_message');

		result.should.be.a('Error').which.have.property('name', 'ClientError');
		result.should.have.property('type', 'dumb_type');
		result.should.have.property('message', 'dumb_message');

		// reset Error.captureStackTrace
		Error.captureStackTrace = captureSTSave;
	});

	// configure the test with sample V8 set
	it('with sample V8 set', () => {
		// initialize the stub
		const captureSTStub = sinon.stub(Error, 'captureStackTrace');

		// execute the function
		const result = new ClientError('dumb_type', 'dumb_message');

		result.should.be.a('Error').which.have.property('name', 'ClientError');
		result.should.have.property('type', 'dumb_type');
		result.should.have.property('message', 'dumb_message');
		captureSTStub.should.have.been.calledWith(result, ClientError);
	});
});
