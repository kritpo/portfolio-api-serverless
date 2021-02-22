'use strict';

/**
 * filter data to be use as-it in the app
 * @param {object} data the data to filter
 */
const filterDataForApp = data => {
	// check if the data is not defined
	if (data === undefined) {
		// return the data directly, no actions is required
		return data;
	}

	// affect the keys to data
	data.id1 = data.PK;
	data.filter = data.SK;
	data.id2 = data.GSI;

	// remove dynamodb specific elements
	delete data.PK;
	delete data.SK;
	delete data.GSI;

	return data;
};

// double export for test purpose
module.exports = function () {
	return module.exports.filterDataForApp.apply(this, arguments);
};
module.exports.filterDataForApp = filterDataForApp;
