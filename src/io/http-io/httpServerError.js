'use strict';

// import the response encoder
const encodeResponse = require('./utils/encodeResponse');

/**
 * generate an internal server error http response
 * @param {object} headers the optional additional headers
 */
const internalServerError = (headers = {}) => {
	return encodeResponse(
		500,
		{ ...headers },
		{ message: 'Internal Server Error' },
		'http-io(internal-server-error)'
	);
};

module.exports = {
	internalServerError
};
