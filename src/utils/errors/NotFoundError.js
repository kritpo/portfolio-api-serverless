'use strict';

/**
 * client not found Error class
 */
class NotFoundError extends Error {
	constructor(type, ...params) {
		super(...params);

		// setup the stack trave in V8
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, NotFoundError);
		}

		// setup the Error
		this.name = 'NotFoundError';
		this.type = type;
	}
}

module.exports = NotFoundError;
