'use strict';

// import sinon
const sinon = require('sinon');

// import the tested function dependency
const checkRequiredParamType = require('../../../utils/checkRequiredParamType');
const checkParamType = require('../../../utils/checkParamType');

// retrieve the tested function
const encodeResponse = require('./encodeResponse');

// configure the test suite
describe('encodeResponse', () => {
	let checkReqParamStub;
	let checkParamStub;

	// setup the stub
	beforeEach(() => {
		// initialize the stub
		checkReqParamStub = sinon.stub(
			checkRequiredParamType,
			'checkRequiredParamType'
		);
		checkParamStub = sinon.stub(checkParamType, 'checkParamType');
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
			'dumb_scope'
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
			'dumb_scope'
		);
		checkReqParamStub.should.have.been.calledWith(
			{ dumb_header: 42 },
			'object',
			'headers',
			'dumb_scope'
		);
		checkParamStub.should.have.been.calledWith(
			{ data: 42 },
			'object',
			'body',
			'dumb_scope'
		);
	});
});
