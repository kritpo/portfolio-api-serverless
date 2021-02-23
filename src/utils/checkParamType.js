'use strict';

/**
 * param type checker
 * @param {*} param the param to check
 * @param {string} type the param type
 * @param {string} paramName the param name for error message purpose
 * @param {string} scope the current scope for error message purpose
 */
const checkParamType = (param, type, paramName, scope) => {
	// check if the type matched if the param is defined
	// loose equality to match both undefined and null
	if (param != undefined && typeof param !== type) {
		throw new Error(
			`${scope}: \`${paramName}\` parameter is not \`${type}\` type`
		);
	}
};

// double export for test purpose
module.exports = function () {
	return module.exports.checkParamType.apply(this, arguments);
};
module.exports.checkParamType = checkParamType;
