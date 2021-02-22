'use strict';

// import the params checker
const checkRequiredParamType = require('../../../utils/checkRequiredParamType');

/**
 * encode a http response
 * @param {number} statusCode the status code
 * @param {object} headers the additional headers
 * @param {object} body the body
 * @param {string} service the current service for error message purpose
 * @param {string} context the current context for error message purpose
 */
const encodeResponse = (statusCode, headers, body, service, context) => {
	// check if the parameters are right
	checkRequiredParamType(
		statusCode,
		'number',
		'statusCode',
		service,
		context
	);
	checkRequiredParamType(headers, 'object', 'headers', service, context);
	checkRequiredParamType(body, 'object', 'body', service, context);

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
