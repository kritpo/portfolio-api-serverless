'use strict';

// import sinon
const sinon = require('sinon');

// import aws-sdk-mock
const AWS = require('aws-sdk-mock');

// import the tested function dependencies
const checkRequiredParamType = require('../../utils/checkRequiredParamType');
const checkDBKeysExistence = require('./utils/checkDBKeysExistence');

// retrieve the tested function
const dbDelete = require('./dbDelete');

// configure the test suite
describe('dbDelete', () => {
	let checkReqParamStub;
	let checkExistStub;

	// setup the stubs and aws mock
	beforeEach(() => {
		// initialize the stubs
		checkReqParamStub = sinon.stub(
			checkRequiredParamType,
			'checkRequiredParamType'
		);
		checkExistStub = sinon.stub(
			checkDBKeysExistence,
			'checkDBKeysExistence'
		);

		// initialize the aws mock
		AWS.mock('DynamoDB.DocumentClient', 'delete', (params, callback) => {
			// add personalized test about aws check
			params.should.have.all.keys('TableName', 'Key');
			params.Key.should.have.all.keys('PK', 'SK');

			// call the callback with success response
			callback(null, {});
		});
	});

	// reset the stubs and aws mock
	afterEach(() => {
		//restore the stubs
		sinon.restore();

		// restore the aws mock
		AWS.restore();
	});

	// configure the test with sample set
	it('with sample set', async () => {
		// execute the function
		const result = await dbDelete('good_id1', 'good_filter');

		result.should.have.property(
			'message',
			'ddb-io(delete): the item is successfully deleted'
		);
		checkReqParamStub.should.have.been.calledWith(
			'good_id1',
			'string',
			'id1',
			'ddb-io',
			'delete'
		);
		checkReqParamStub.should.have.been.calledWith(
			'good_filter',
			'string',
			'filter',
			'ddb-io',
			'delete'
		);
		checkExistStub.should.have.been.calledWith(
			'good_id1',
			'good_filter',
			'ddb-io',
			'delete'
		);
	});
});
