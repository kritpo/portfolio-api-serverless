'use strict';

// import the ddb-io components
const dbCreate = require('./dbCreate');
const dbReadByIdAndFilter = require('./dbReadByIdAndFilter');
const dbUpdateByReplace = require('./dbUpdateByReplace');
const dbUpdateByExpression = require('./dbUpdateByExpression');
const dbDelete = require('./dbDelete');

module.exports = {
	dbCreate,
	dbReadByIdAndFilter,
	dbUpdateByReplace,
	dbUpdateByExpression,
	dbDelete
};
