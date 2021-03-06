'use strict';

// configure the .env file support
require('dotenv').config();

// import the aws-sdk
const AWS = require('aws-sdk');

// import the params checker
const checkRequiredParamType = require('../../utils/checkRequiredParamType');
const checkDBKeysExistence = require('./utils/checkDBKeysExistence');

/**
 * delete an item from the database
 * @param {string} id1 the first primary key
 * @param {string} filter the filter key
 */
// async as the function must return a promise
const dbDelete = async (id1, filter) => {
	// setup the scope for error message purpose
	const scope = 'ddb-io(delete)';

	// create the dynamodb document client
	const ddb = new AWS.DynamoDB.DocumentClient();

	// check if the keys parameters are right
	checkRequiredParamType(id1, 'string', 'id1', scope);
	checkRequiredParamType(filter, 'string', 'filter', scope);
	await checkDBKeysExistence(id1, filter, scope);

	// configure the params object to send to dynamodb
	const params = {
		TableName: `${process.env.DDB_TABLE_NAME}-${process.env.STAGE}`,
		Key: {
			PK: id1,
			SK: filter
		}
	};

	// send the delete request to dynamodb with the params object
	return ddb
		.delete(params)
		.promise()
		.then(() => ({
			message: `${scope}: the item is successfully deleted`
		}));
};

module.exports = dbDelete;
