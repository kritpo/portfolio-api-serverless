'use strict';

// import the ddb-io components
const dbCreate = require('./dbCreate');
const dbReadByIdAndFilter = require('./dbReadByIdAndFilter');
const dbUpdateByReplace = require('./dbUpdateByReplace');
const dbDelete = require('./dbDelete');

module.exports = {
	dbCreate,
	dbReadByIdAndFilter,
	dbUpdateByReplace,
	dbDelete
};
