'use strict';

// import the response encoder
const encodeResponse = require('./utils/encodeResponse');

/**
 * generate a bad request http response
 * @param {object} headers the optional additional headers
 */
const badRequest = (headers = {}) => {
	return encodeResponse(
		400,
		{ ...headers },
		{ message: 'Bad Request' },
		'http-io(bad-request)'
	);
};

/**
 * generate a forbidden http response
 * @param {object} headers the optional additional headers
 */
const forbidden = (headers = {}) => {
	return encodeResponse(
		403,
		{ ...headers },
		{ message: 'Forbidden' },
		'http-io(forbidden)'
	);
};

/**
 * generate a not found http response
 * @param {object} headers the optional additional headers
 */
const notFound = (headers = {}) => {
	return encodeResponse(
		404,
		{ ...headers },
		{ message: 'Not Found' },
		'http-io(not-found)'
	);
};

module.exports = {
	badRequest,
	forbidden,
	notFound
};
