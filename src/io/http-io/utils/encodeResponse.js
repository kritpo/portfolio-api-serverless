'use strict';

// import the params checker
const checkRequiredParamType = require('../../../utils/checkRequiredParamType');

/**
 * encode a http response
 * @param {number} statusCode the status code
 * @param {object} headers the additional headers
 * @param {object} body the body
 * @param {string} scope the current scope for error message purpose
 */
const encodeResponse = (statusCode, headers, body, scope) => {
	// check if the parameters are right
	checkRequiredParamType(statusCode, 'number', 'statusCode', scope);
	checkRequiredParamType(headers, 'object', 'headers', scope);
	checkRequiredParamType(body, 'object', 'body', scope);

	// configure the encoded response
	const response = {
		statusCode,
		headers: {
			'Access-Control-Allow-Origin': '*',
			'Access-Control-Allow-Credentials': true,
			...headers
		},
		body: JSON.stringify(body)
	};

	return response;
};

// double export for test purpose
module.exports = function () {
	return module.exports.encodeResponse.apply(this, arguments);
};
module.exports.encodeResponse = encodeResponse;
