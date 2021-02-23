'use strict';

/**
 * param format checker
 * @param {*} param the param to check
 * @param {RegExp} regex the regex formatter
 * @param {string} paramName the param name for error message purpose
 * @param {string} service the current service for error message purpose
 * @param {string} context the current context for error message purpose
 */
const checkParamFormat = (param, regex, paramName, service, context) => {
	// check if the regex is a string
	if (typeof regex === 'string') {
		// convert it into a regex
		regex = new RegExp(regex);
	}

	// check if the format matched if the param is defined
	// loose equality to match both undefined and null
	if (param != undefined && !regex.test(param)) {
		throw new Error(
			`${service}(${context}): \`${paramName}\` parameter is not \`${regex}\` format`
		);
	}
};

// double export for test purpose
module.exports = function () {
	return module.exports.checkParamFormat.apply(this, arguments);
};
module.exports.checkParamFormat = checkParamFormat;
