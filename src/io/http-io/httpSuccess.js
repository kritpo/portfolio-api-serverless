'use strict';

// import the response encoder
const encodeResponse = require('./utils/encodeResponse');

/**
 * generate an ok http response
 * @param {object} body the body
 * @param {object} headers the optional additional headers
 */
const ok = (body, headers = {}) => {
	return encodeResponse(200, { ...headers }, body, 'http-io(ok)');
};

/**
 * generate a created http response
 * @param {object} headers the optional additional headers
 */
const created = (headers = {}) => {
	return encodeResponse(201, { ...headers }, null, 'http-io(created)');
};

/**
 * generate a no content http response
 * @param {object} headers the optional additional headers
 */
const noContent = (headers = {}) => {
	return encodeResponse(204, { ...headers }, null, 'http-io(no-content)');
};

module.exports = {
	ok,
	created,
	noContent
};
