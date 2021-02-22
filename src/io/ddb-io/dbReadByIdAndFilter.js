'use strict';

// configure the .env file support
require('dotenv').config();

// import the aws-sdk
const AWS = require('aws-sdk');

// import the params checker
const checkRequiredParamType = require('../../utils/checkRequiredParamType');
const checkParamType = require('../../utils/checkParamType');

// import the data filter
const filterDataForApp = require('./utils/filterDataForApp');

/**
 * get an item by id and filter from the database
 * @param {string} id1 the first primary key
 * @param {string} filter the filter key
 * @param {string} id2 the second primary key
 */
// async as the function must return a promise
const dbReadByIdAndFilter = async (id1, filter, id2) => {
	// create the dynamodb document client
	const ddb = new AWS.DynamoDB.DocumentClient();

	// check if the keys parameters are right
	checkParamType(id1, 'string', 'id1', 'ddb-io', 'read-by-id-and-filter');
	checkRequiredParamType(
		filter,
		'string',
		'filter',
		'ddb-io',
		'read-by-id-and-filter'
	);
	checkParamType(id2, 'string', 'id2', 'ddb-io', 'read-by-id-and-filter');

	// check if either of the two keys is defined
	// loose equality to match both undefined and null
	if (id1 == undefined && id2 == undefined) {
		throw new Error(
			`ddb-io(read-by-id-and-filter): \`id1\` or \`id2\` parameter is missing`
		);
	}

	// configure the params object with table name to send to dynamodb
	const params = {
		TableName: `${process.env.DDB_TABLE_NAME}-${process.env.STAGE}`
	};

	// check if the retrieve is with the first primary key, loose equality to catch both undefined and null
	if (id1 != undefined) {
		// configure the key set of the params object
		params.Key = {
			PK: id1,
			SK: filter
		};

		// send the get request to dynamodb with the params object
		return (
			ddb
				.get(params)
				.promise()
				// filter data for app
				.then(data => filterDataForApp(data.Item))
		);
	}

	// configure the params object to be able to retrieve the item by the secondary global index
	params.IndexName = 'GSI';
	params.Limit = 1;
	params.KeyConditionExpression = 'GSI = :GSI and SK = :SK';
	params.ExpressionAttributeValues = {
		':GSI': id2,
		':SK': filter
	};

	// send the get request to dynamodb with the params object
	return (
		ddb
			.query(params)
			.promise()
			// filter data for app
			.then(data => filterDataForApp(data.Items[0]))
	);
};

// double export for test purpose
module.exports = function () {
	return module.exports.dbReadByIdAndFilter.apply(this, arguments);
};
module.exports.dbReadByIdAndFilter = dbReadByIdAndFilter;
