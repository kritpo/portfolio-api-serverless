'use strict';

// configure the .env file support
require('dotenv').config();

// import the aws-sdk
const AWS = require('aws-sdk');

// import the params checker
const checkRequiredParamType = require('../../utils/checkRequiredParamType');
const checkParamType = require('../../utils/checkParamType');
const checkDBKeysExistence = require('./utils/checkDBKeysExistence');

/**
 * update an item by expression in the database
 * @param {string} id1 the first primary key
 * @param {string} filter the filter key
 * @param {string} setExpression the update expression
 * @param {object} setNames the object which associate #attributeName to its real name
 * @param {object} setValues the object which associate :attributeValue to its real value
 */
// async as the function must return a promise
const dbUpdateByExpression = async (
	id1,
	filter,
	setExpression,
	setNames,
	setValues
) => {
	// setup the scope for error message purpose
	const scope = 'ddb-io(update-by-expression)';

	// create the dynamodb document client
	const ddb = new AWS.DynamoDB.DocumentClient();

	// check if the keys parameters are right
	checkRequiredParamType(id1, 'string', 'id1', scope);
	checkRequiredParamType(filter, 'string', 'filter', scope);
	await checkDBKeysExistence(id1, filter, scope);

	// check if the expressions parameters are right
	checkRequiredParamType(setExpression, 'string', 'setExpression', scope);
	checkParamType(setNames, 'object', 'setNames', scope);
	checkParamType(setValues, 'object', 'setValues', scope);

	// configure the params object to send to dynamodb
	const params = {
		TableName: `${process.env.DDB_TABLE_NAME}-${process.env.STAGE}`,
		Key: {
			PK: id1,
			SK: filter
		},
		UpdateExpression: `set ${setExpression}`,
		ExpressionAttributeNames: setNames,
		ExpressionAttributeValues: setValues
	};

	// send the update request to dynamodb with the params object
	return ddb
		.update(params)
		.promise()
		.then(() => ({
			message: `${scope}: the item is successfully updated`
		}));
};

module.exports = dbUpdateByExpression;
