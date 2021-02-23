'use strict';

// import sinon
const sinon = require('sinon');

// import aws-sdk-mock
const AWS = require('aws-sdk-mock');

// import the tested function dependencies
const checkRequiredParamType = require('../../utils/checkRequiredParamType');
const checkParamType = require('../../utils/checkParamType');
const checkDBKeysExistence = require('./utils/checkDBKeysExistence');

// retrieve the tested function
const dbUpdateByExpression = require('./dbUpdateByExpression');

// configure the test suite
describe('dbUpdateByExpression', () => {
	let checkReqParamStub;
	let checkParamStub;
	let checkExistStub;

	// setup the stubs and aws mock
	beforeEach(() => {
		// initialize the stubs
		checkReqParamStub = sinon.stub(
			checkRequiredParamType,
			'checkRequiredParamType'
		);
		checkParamStub = sinon.stub(checkParamType, 'checkParamType');
		checkExistStub = sinon.stub(
			checkDBKeysExistence,
			'checkDBKeysExistence'
		);

		// initialize the aws mock
		AWS.mock('DynamoDB.DocumentClient', 'update', (params, callback) => {
			// add personalized test about aws check
			params.should.have.all.keys(
				'TableName',
				'Key',
				'UpdateExpression',
				'ExpressionAttributeNames',
				'ExpressionAttributeValues'
			);
			params.Key.should.have.property('PK');
			params.Key.should.have.property('SK');

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
		const result = await dbUpdateByExpression(
			'good_id1',
			'good_filter',
			'#data = :data',
			{ '#data': 'data' },
			{ ':data': 42 }
		);

		result.should.have.property(
			'message',
			'ddb-io(update-by-expression): the item is successfully updated'
		);
		checkReqParamStub.should.have.been.calledWith(
			'good_id1',
			'string',
			'id1',
			'ddb-io(update-by-expression)'
		);
		checkReqParamStub.should.have.been.calledWith(
			'good_filter',
			'string',
			'filter',
			'ddb-io(update-by-expression)'
		);
		checkReqParamStub.should.have.been.calledWith(
			'#data = :data',
			'string',
			'setExpression',
			'ddb-io(update-by-expression)'
		);
		checkParamStub.should.have.been.calledWith(
			{ '#data': 'data' },
			'object',
			'setNames',
			'ddb-io(update-by-expression)'
		);
		checkParamStub.should.have.been.calledWith(
			{ ':data': 42 },
			'object',
			'setValues',
			'ddb-io(update-by-expression)'
		);
		checkExistStub.should.have.been.calledWith(
			'good_id1',
			'good_filter',
			'ddb-io(update-by-expression)'
		);
	});
});
