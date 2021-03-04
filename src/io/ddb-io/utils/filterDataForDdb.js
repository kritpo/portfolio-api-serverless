'use strict';

/**
 * filter data to be put as-it into the dynamodb
 * @param {object} data the data to filter
 */
const filterDataForDdb = data => {
	// check if the data is not defined
	if (data === undefined) {
		// return the data directly, no actions is required
		return data;
	}

	// affect the keys to data
	data.PK = data.id1;
	data.SK = data.filter;
	data.GSI = data.id2;

	// remove app specific elements
	delete data.id1;
	delete data.filter;
	delete data.id2;

	return data;
};

// double export for test purpose
module.exports = function () {
	return module.exports.filterDataForDdb.apply(this, arguments);
};
module.exports.filterDataForDdb = filterDataForDdb;
