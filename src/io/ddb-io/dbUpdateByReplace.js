'use strict';

// configure the .env file support
require('dotenv').config();

// import the aws-sdk
const AWS = require('aws-sdk');

// import the params checker
const checkRequiredParamType = require('../../utils/checkRequiredParamType');
const checkParamType = require('../../utils/checkParamType');
const checkDBKeysExistence = require('./utils/checkDBKeysExistence');

// import the data filter
const filterDataForDdb = require('./utils/filterDataForDdb');

/**
 * update an item by replacing in the database
 * @param {string} id1 the first primary key
 * @param {string} filter the filter key
 * @param {object} data the new data set
 * @param {string} id2 [only if change] the new second primary key
 */
// async as the function must return a promise
const dbUpdateByReplace = async (id1, filter, data, id2) => {
	// setup the scope for error message purpose
	const scope = 'ddb-io(update-by-replace)';

	// create the dynamodb document client
	const ddb = new AWS.DynamoDB.DocumentClient();

	// check if the keys parameters are right
	checkRequiredParamType(id1, 'string', 'id1', scope);
	checkRequiredParamType(filter, 'string', 'filter', scope);
	checkParamType(id2, 'string', 'id2', scope);
	const previousData = await checkDBKeysExistence(id1, filter, scope);

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
			// loose equality to catch both undefined and null
			GSI: id2 == undefined ? previousData.id2 : id2
		}
	};

	// send the put request to dynamodb with the params object
	return ddb
		.put(params)
		.promise()
		.then(() => ({
			message: `${scope}: the item is successfully updated`
		}));
};

module.exports = dbUpdateByReplace;
