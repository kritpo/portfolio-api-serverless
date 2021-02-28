'use strict';

// import the Errors class
const ClientError = require('./ClientError');
const NotFoundError = require('./NotFoundError');
const ServerError = require('./ServerError');

module.exports = {
	ioTypes: { DB: 'DB', HTTP: 'HTTP' },
	ClientError,
	NotFoundError,
	ServerError
};
