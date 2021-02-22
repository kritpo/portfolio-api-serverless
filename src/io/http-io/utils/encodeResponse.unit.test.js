'use strict';

// import sinon
const sinon = require('sinon');

// import the tested function dependency
const checkRequiredParamType = require('../../../utils/checkRequiredParamType');

// retrieve the tested function
const encodeResponse = require('./encodeResponse');

// configure the test suite
describe('encodeResponse', () => {
	let checkReqParamStub;

	// setup the stub
	beforeEach(() => {
		// initialize the stub
		checkReqParamStub = sinon.stub(
			checkRequiredParamType,
			'checkRequiredParamType'
		);
	});

	// reset the stub
	afterEach(() => sinon.restore());

	// configure the test with sample set
	it('with sample set', () => {
		// execute the function
		const result = encodeResponse(
			200,
			{ dumb_header: 42 },
			{ data: 42 },
			'dumb_service',
			'dumb_context'
		);

		result.should.be.deep.equal({
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true,
				dumb_header: 42
			},
			body: '{"data":42}'
		});
		checkReqParamStub.should.have.been.calledWith(
			200,
			'number',
			'statusCode',
			'dumb_service',
			'dumb_context'
		);
		checkReqParamStub.should.have.been.calledWith(
			{ dumb_header: 42 },
			'object',
			'headers',
			'dumb_service',
			'dumb_context'
		);
		checkReqParamStub.should.have.been.calledWith(
			{ data: 42 },
			'object',
			'body',
			'dumb_service',
			'dumb_context'
		);
	});
});
