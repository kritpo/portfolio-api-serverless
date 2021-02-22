'use strict';

// import the http-io components
const httpRequestDecode = require('./httpRequestDecode');
const httpSuccess = require('./httpSuccess');
const httpClientError = require('./httpClientError');
const httpServerError = require('./httpServerError');

module.exports = {
	httpRequestDecode,
	...httpSuccess,
	...httpClientError,
	...httpServerError
};
