'use strict';

// import sinon
const sinon = require('sinon');

// import aws-sdk-mock
const AWS = require('aws-sdk-mock');

// import the tested function dependencies
const checkRequiredParamType = require('../../utils/checkRequiredParamType');
const checkParamType = require('../../utils/checkParamType');
const checkDBKeysExistence = require('./utils/checkDBKeysExistence');
const filterDataForDdb = require('./utils/filterDataForDdb');

// retrieve the tested function
const dbUpdateByReplace = require('./dbUpdateByReplace');

// configure the test suite
describe('dbUpdateByReplace', () => {
	let checkReqParamStub;
	let checkParamStub;
	let checkExistStub;
	let filterDataStub;

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
		filterDataStub = sinon.stub(filterDataForDdb, 'filterDataForDdb');

		// configure the stubs
		checkExistStub.withArgs('good_id1', 'good_filter').returns({
			id1: 'good_id1',
			filter: 'good_filter',
			id2: 'good_id2'
		});
	});

	// reset the stubs and aws mock
	afterEach(() => {
		//restore the stubs
		sinon.restore();

		// restore the aws mock
		AWS.restore();
	});

	// configure the test with id2
	it('with id2', async () => {
		// initialize the aws mock
		AWS.mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
			// add personalized test about aws check
			params.should.have.all.keys('TableName', 'Item');
			params.Item.should.have.property('PK');
			params.Item.should.have.property('SK');
			params.Item.should.have.property('GSI', 'new_id2');

			// call the callback with success response
			callback(null, {});
		});

		// execute the function
		const result = await dbUpdateByReplace(
			'good_id1',
			'good_filter',
			{ data: 42 },
			'new_id2'
		);

		result.should.have.property(
			'message',
			'ddb-io(update-by-replace): the item is successfully updated'
		);
		checkReqParamStub.should.have.been.calledWith(
			'good_id1',
			'string',
			'id1',
			'ddb-io',
			'update-by-replace'
		);
		checkReqParamStub.should.have.been.calledWith(
			'good_filter',
			'string',
			'filter',
			'ddb-io',
			'update-by-replace'
		);
		checkReqParamStub.should.have.been.calledWith(
			{ data: 42 },
			'object',
			'data',
			'ddb-io',
			'update-by-replace'
		);
		checkParamStub.should.have.been.calledWith(
			'new_id2',
			'string',
			'id2',
			'ddb-io',
			'update-by-replace'
		);
		checkExistStub.should.have.been.calledWith(
			'good_id1',
			'good_filter',
			'ddb-io',
			'update-by-replace'
		);
		filterDataStub.should.have.been.calledWith({ data: 42 });
	});

	// configure the test without id2
	it('without id2', async () => {
		// initialize the aws mock
		AWS.mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
			// add personalized test about aws check
			params.should.have.all.keys('TableName', 'Item');
			params.Item.should.have.property('PK');
			params.Item.should.have.property('SK');
			params.Item.should.have.property('GSI', 'good_id2');

			// call the callback with success response
			callback(null, {});
		});

		// execute the function
		const result = await dbUpdateByReplace('good_id1', 'good_filter', {
			data: 42
		});

		result.should.have.property(
			'message',
			'ddb-io(update-by-replace): the item is successfully updated'
		);
		checkReqParamStub.should.have.been.calledWith(
			'good_id1',
			'string',
			'id1',
			'ddb-io',
			'update-by-replace'
		);
		checkReqParamStub.should.have.been.calledWith(
			'good_filter',
			'string',
			'filter',
			'ddb-io',
			'update-by-replace'
		);
		checkReqParamStub.should.have.been.calledWith(
			{ data: 42 },
			'object',
			'data',
			'ddb-io',
			'update-by-replace'
		);
		checkParamStub.should.have.been.calledWith(
			undefined,
			'string',
			'id2',
			'ddb-io',
			'update-by-replace'
		);
		checkExistStub.should.have.been.calledWith(
			'good_id1',
			'good_filter',
			'ddb-io',
			'update-by-replace'
		);
		filterDataStub.should.have.been.calledWith({ data: 42 });
	});
});
