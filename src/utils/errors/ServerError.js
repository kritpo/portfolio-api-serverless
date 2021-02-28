'use strict';

/**
 * server Error class
 */
class ServerError extends Error {
	constructor(type, ...params) {
		super(...params);

		// setup the stack trave in V8
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, ServerError);
		}

		// setup the Error
		this.name = 'ServerError';
		this.type = type;
	}
}

module.exports = ServerError;
