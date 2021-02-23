'use strict';

// import the ddb reader by id and filter
const dbReadByIdAndFilter = require('../dbReadByIdAndFilter');

/**
 * check if the keys set is in the database, throw error otherwise
 * @param {string} id1 the first primary key
 * @param {string} filter the filter key
 * @param {string} scope the current scope for error message purpose
 */
const checkDBKeysExistence = async (id1, filter, scope) => {
	// retrieve the associated data
	const data = await dbReadByIdAndFilter(id1, filter);

	// check if the [id1 and filter] set is not defined in the database
	// loose equality to match both undefined and null
	if (data === undefined) {
		throw new Error(
			`${scope}: the set \`id1\` and \`filter\` is not defined`
		);
	}

	return data;
};

// double export for test purpose
module.exports = function () {
	return module.exports.checkDBKeysExistence.apply(this, arguments);
};
module.exports.checkDBKeysExistence = checkDBKeysExistence;
