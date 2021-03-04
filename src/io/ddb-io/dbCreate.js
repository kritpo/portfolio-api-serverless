'use strict';

// configure the .env file support
require('dotenv').config();

// import the aws-sdk
const AWS = require('aws-sdk');

// import the params checker
const checkRequiredParamType = require('../../utils/checkRequiredParamType');
const checkParamType = require('../../utils/checkParamType');
const checkDBKeysNonExistence = require('./utils/checkDBKeysNonExistence');

// import the data filter
const filterDataForDdb = require('./utils/filterDataForDdb');

/**
 * put an item into the database
 * @param {string} id1 the first primary key
 * @param {string} filter the filter key
 * @param {string} id2 the second primary key
 * @param {object} data the data associated to the item
 */
// async as the function must return a promise
const dbCreate = async (id1, filter, id2, data) => {
	// setup the scope for error message purpose
	const scope = 'ddb-io(create)';

	// create the dynamodb document client
	const ddb = new AWS.DynamoDB.DocumentClient();

	// check if the keys parameters are right
	checkRequiredParamType(id1, 'string', 'id1', scope);
	checkRequiredParamType(filter, 'string', 'filter', scope);
	checkParamType(id2, 'string', 'id2', scope);
	await checkDBKeysNonExistence(id1, filter, id2, scope);

	// check if the data parameter is right
	checkRequiredParamType(data, 'object', 'data', scope);

	// filter data for dynamodb
	filterDataForDdb(data);

	// configure the params object to send to dynamodb
	const params = {
		TableName: `${process.env.DDB_TABLE_NAME}-${process.env.STAGE}`,
		Item: {
			...data,
			PK: id1,
			SK: filter,
			GSI: id2 === null ? undefined : id2
		}
	};

	// send the put request to dynamodb with the params object
	return ddb
		.put(params)
		.promise()
		.then(() => ({
			message: `${scope}: the item is successfully created`
		}));
};

module.exports = dbCreate;
