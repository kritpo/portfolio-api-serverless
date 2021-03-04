'use strict';

// import the ddb reader by id and filter
const dbReadByIdAndFilter = require('../dbReadByIdAndFilter');

/**
 * check if the keys set is not in the database, throw error otherwise
 * @param {string} id1 the first primary key
 * @param {string} filter the filter key
 * @param {string} id2 the second primary key
 * @param {string} scope the current scope for error message purpose
 */
const checkDBKeysNonExistence = async (id1, filter, id2, scope) => {
	// check if the [id1 and filter] set is defined in the database
	// loose equality to match both undefined and null
	if (
		id1 != undefined &&
		(await dbReadByIdAndFilter(id1, filter)) !== undefined
	) {
		throw new Error(
			`${scope}: the set \`id1\` and \`filter\` is already defined`
		);
	}

	// check if the [id2 and filter] set is defined in the database
	// loose equality to match both undefined and null
	if (
		id2 != undefined &&
		(await dbReadByIdAndFilter(null, filter, id2)) !== undefined
	) {
		throw new Error(
			`${scope}: the set \`id2\` and \`filter\` is already defined`
		);
	}
};

// double export for test purpose
module.exports = function () {
	return module.exports.checkDBKeysNonExistence.apply(this, arguments);
};
module.exports.checkDBKeysNonExistence = checkDBKeysNonExistence;
