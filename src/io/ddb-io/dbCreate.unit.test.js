'use strict';

// import sinon
const sinon = require('sinon');

// import aws-sdk-mock
const AWS = require('aws-sdk-mock');

// import the tested function dependencies
const checkRequiredParamType = require('../../utils/checkRequiredParamType');
const checkParamType = require('../../utils/checkParamType');
const checkDBKeysNonExistence = require('./utils/checkDBKeysNonExistence');
const filterDataForDdb = require('./utils/filterDataForDdb');

// retrieve the tested function
const dbCreate = require('./dbCreate');

// configure the test suite
describe('dbCreate', () => {
	let checkReqParamStub;
	let checkParamStub;
	let checkNonExistStub;
	let filterDataStub;

	// setup the stubs and aws mock
	beforeEach(() => {
		// initialize the stubs
		checkReqParamStub = sinon.stub(
			checkRequiredParamType,
			'checkRequiredParamType'
		);
		checkParamStub = sinon.stub(checkParamType, 'checkParamType');
		checkNonExistStub = sinon.stub(
			checkDBKeysNonExistence,
			'checkDBKeysNonExistence'
		);
		filterDataStub = sinon.stub(filterDataForDdb, 'filterDataForDdb');

		// initialize the aws mock
		AWS.mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
			// add personalized test about aws check
			params.should.have.all.keys('TableName', 'Item');
			params.Item.should.have.property('PK');
			params.Item.should.have.property('SK');
			params.Item.should.have.property('GSI');

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
		const result = await dbCreate('good_id1', 'good_filter', 'good_id2', {
			data: 42
		});

		result.should.have.property(
			'message',
			'ddb-io(create): the item is successfully created'
		);
		checkReqParamStub.should.have.been.calledWith(
			'good_id1',
			'string',
			'id1',
			'ddb-io',
			'create'
		);
		checkReqParamStub.should.have.been.calledWith(
			'good_filter',
			'string',
			'filter',
			'ddb-io',
			'create'
		);
		checkReqParamStub.should.have.been.calledWith(
			{ data: 42 },
			'object',
			'data',
			'ddb-io',
			'create'
		);
		checkParamStub.should.have.been.calledWith(
			'good_id2',
			'string',
			'id2',
			'ddb-io',
			'create'
		);
		checkNonExistStub.should.have.been.calledWith(
			'good_id1',
			'good_filter',
			'good_id2',
			'ddb-io',
			'create'
		);
		filterDataStub.should.have.been.calledWith({ data: 42 });
	});
});
