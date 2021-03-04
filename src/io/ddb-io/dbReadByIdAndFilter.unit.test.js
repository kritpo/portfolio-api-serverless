'use strict';

// import sinon
const sinon = require('sinon');

// import aws-sdk-mock
const AWS = require('aws-sdk-mock');

// import the tested function dependencies
const checkRequiredParamType = require('../../utils/checkRequiredParamType');
const checkParamType = require('../../utils/checkParamType');
const filterDataForApp = require('./utils/filterDataForApp');

// retrieve the tested function
const dbReadByIdAndFilter = require('./dbReadByIdAndFilter');

// configure the test suite
describe('dbReadByIdAndFilter', () => {
	let checkReqParamStub;
	let checkParamStub;
	let filterDataStub;

	// setup the stubs and aws mock
	beforeEach(() => {
		// initialize the stubs
		checkReqParamStub = sinon.stub(
			checkRequiredParamType,
			'checkRequiredParamType'
		);
		checkParamStub = sinon.stub(checkParamType, 'checkParamType');
		filterDataStub = sinon.stub(filterDataForApp, 'filterDataForApp');

		// configure the stubs
		filterDataStub
			.withArgs({
				PK: 'good_id1',
				SK: 'good_filter',
				data: 42
			})
			.returns({
				id1: 'good_id1',
				filter: 'good_filter',
				data: 42
			});
		filterDataStub
			.withArgs({
				GSI: 'good_id2',
				SK: 'good_filter',
				data: 42
			})
			.returns({
				id2: 'good_id2',
				filter: 'good_filter',
				data: 42
			});

		// initialize the aws mock
		AWS.mock('DynamoDB.DocumentClient', 'get', (params, callback) => {
			// add personalized test about aws check
			params.should.have.all.keys('TableName', 'Key');
			params.Key.should.have.all.keys('PK', 'SK');

			// call the callback with success response
			callback(null, {
				Item: { PK: params.Key.PK, SK: params.Key.SK, data: 42 }
			});
		});
		AWS.mock('DynamoDB.DocumentClient', 'query', (params, callback) => {
			// add personalized test about aws check
			params.should.have.all.keys(
				'TableName',
				'IndexName',
				'Limit',
				'KeyConditionExpression',
				'ExpressionAttributeValues'
			);
			params.should.have.property('IndexName', 'GSI');
			params.should.have.property('Limit', 1);
			params.should.have.property(
				'KeyConditionExpression',
				'GSI = :GSI and SK = :SK'
			);
			params.ExpressionAttributeValues.should.have.all.keys(
				':GSI',
				':SK'
			);

			// call the callback with success response
			callback(null, {
				Items: [
					{
						GSI: params.ExpressionAttributeValues[':GSI'],
						SK: params.ExpressionAttributeValues[':SK'],
						data: 42
					}
				]
			});
		});
	});

	// reset the stubs and aws mock
	afterEach(() => {
		//restore the stubs
		sinon.restore();

		// restore the aws mock
		AWS.restore();
	});

	// configure the tests with right params
	describe('with right params', () => {
		// configure the test with good_id1
		it('with good good_id1', async () => {
			// execute the function
			const result = await dbReadByIdAndFilter('good_id1', 'good_filter');

			result.should.have.property('id1', 'good_id1');
			result.should.have.property('filter', 'good_filter');
			result.should.have.property('data', 42);
			checkParamStub.should.have.been.calledWith(
				'good_id1',
				'string',
				'id1',
				'ddb-io(read-by-id-and-filter)'
			);
			checkReqParamStub.should.have.been.calledWith(
				'good_filter',
				'string',
				'filter',
				'ddb-io(read-by-id-and-filter)'
			);
			checkParamStub.should.have.been.calledWith(
				undefined,
				'string',
				'id2',
				'ddb-io(read-by-id-and-filter)'
			);
			filterDataStub.should.have.been.calledWith({
				PK: 'good_id1',
				SK: 'good_filter',
				data: 42
			});
		});

		// configure the test with good_id2
		it('with good good_id2', async () => {
			// execute the function
			const result = await dbReadByIdAndFilter(
				null,
				'good_filter',
				'good_id2'
			);

			result.should.have.property('id2', 'good_id2');
			result.should.have.property('filter', 'good_filter');
			result.should.have.property('data', 42);
			checkParamStub.should.have.been.calledWith(
				null,
				'string',
				'id1',
				'ddb-io(read-by-id-and-filter)'
			);
			checkReqParamStub.should.have.been.calledWith(
				'good_filter',
				'string',
				'filter',
				'ddb-io(read-by-id-and-filter)'
			);
			checkParamStub.should.have.been.calledWith(
				'good_id2',
				'string',
				'id2',
				'ddb-io(read-by-id-and-filter)'
			);
			filterDataStub.should.have.been.calledWith({
				GSI: 'good_id2',
				SK: 'good_filter',
				data: 42
			});
		});
	});

	// configure the tests with no param
	describe('with no param', () => {
		// configure the test with null id1 and undefined id2
		it('with null id1 and undefined id2', async () => {
			// try to execute the function
			try {
				// execute the function
				await dbReadByIdAndFilter(null, 'good_filter');

				// shouldn't be executed
				true.should.be.equal(false, 'should not be executed');
			} catch (e) {
				e.should.be
					.a('Error')
					.which.have.property(
						'message',
						'ddb-io(read-by-id-and-filter): `id1` or `id2` parameter is missing'
					);
			}

			checkParamStub.should.have.been.calledWith(
				null,
				'string',
				'id1',
				'ddb-io(read-by-id-and-filter)'
			);
			checkReqParamStub.should.have.been.calledWith(
				'good_filter',
				'string',
				'filter',
				'ddb-io(read-by-id-and-filter)'
			);
			checkParamStub.should.have.been.calledWith(
				undefined,
				'string',
				'id2',
				'ddb-io(read-by-id-and-filter)'
			);
			filterDataStub.should.have.not.been.called;
		});

		// configure the test with undefined id1
		it('with undefined id1', async () => {
			// try to execute the function
			try {
				// execute the function
				await dbReadByIdAndFilter();

				// shouldn't be executed
				true.should.be.equal(false, 'should not be executed');
			} catch (e) {
				e.should.be
					.a('Error')
					.which.have.property(
						'message',
						'ddb-io(read-by-id-and-filter): `id1` or `id2` parameter is missing'
					);
			}

			checkParamStub.should.have.been.calledWith(
				undefined,
				'string',
				'id1',
				'ddb-io(read-by-id-and-filter)'
			);
			checkReqParamStub.should.have.been.calledWith(
				undefined,
				'string',
				'filter',
				'ddb-io(read-by-id-and-filter)'
			);
			checkParamStub.should.have.been.calledWith(
				undefined,
				'string',
				'id2',
				'ddb-io(read-by-id-and-filter)'
			);
			filterDataStub.should.have.not.been.called;
		});
	});
});
