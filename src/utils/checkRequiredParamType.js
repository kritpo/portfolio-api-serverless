'use strict';

// import the parameter type checker
const checkParamType = require('./checkParamType');

/**
 * required param type checker
 * @param {*} param the param to check
 * @param {string} type the param type
 * @param {string} paramName the param name for error message purpose
 * @param {string} service the current service for error message purpose
 * @param {string} context the current context for error message purpose
 */
const checkRequiredParamType = (param, type, paramName, service, context) => {
	// check if the param is not defined
	// loose equality to match both undefined and null
	if (param == undefined) {
		throw new Error(
			`${service}(${context}): \`${paramName}\` parameter is missing`
		);
	}

	// check if the param type is right
	checkParamType(param, type, paramName, service, context);
};

// double export for test purpose
module.exports = function () {
	return module.exports.checkRequiredParamType.apply(this, arguments);
};
module.exports.checkRequiredParamType = checkRequiredParamType;
