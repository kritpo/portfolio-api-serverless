'use strict';

/**
 * client Error class
 */
class ClientError extends Error {
	constructor(type, ...params) {
		super(...params);

		// setup the stack trave in V8
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ClientError);
		}

		// setup the Error
		this.name = 'ClientError';
		this.type = type;
	}
}

module.exports = ClientError;
