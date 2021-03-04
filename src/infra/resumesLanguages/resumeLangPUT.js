'use strict';

// import errors manager
const errors = require('../../utils/errors');

// import the io dependencies
const http = require('../../io/http-io');
const ddb = require('../../io/ddb-io');

// import the ResumeLang model
const ResumeLang = require('../../domain/ResumeLang');

const resumeLangPUT = async event => {
	// decode the input event
	const input = http.httpRequestDecode(event, true);

	// check if the username is not defined
	if (
		input.user == undefined ||
		input.user.username == undefined ||
		input.params.username == undefined
	) {
		// return a BAD REQUEST response
		return http.badRequest();
	}

	// check if the username in path and the one logged are not the same
	if (input.user.username !== input.params.username) {
		// return a FORBIDDEN response
		return http.forbidden();
	}

	// generate a new resume languages container
	const resumeLang = new ResumeLang(input.params.username);

	// hydrate the resume languages container
	return resumeLang
		.hydrate(ddb.dbReadByIdAndFilter)
		.then(() => {
			// check if the language code is not defined
			if (
				input.body === null ||
				input.body.languageCode === undefined
			) {
				// throw a client error
				throw new errors.ClientError(
					'RESUME_LANG_PUT',
					'language code not exist'
				);
			}

			// update the resume default language
			resumeLang.updateDefaultLanguage(input.body.languageCode);

			// update the resume languages container
			return resumeLang
				.updateByReplace(ddb.dbUpdateByReplace)
				.then(() => http.noContent());
		})
		.catch(err => {
			// log the error
			console.error(`ERROR: ${err}`);

			// check the type of error
			if (err instanceof errors.ClientError) {
				return http.badRequest();
			} else if (err instanceof errors.NotFoundError) {
				return http.notFound();
			}

			return http.internalServerError();
		});
};

module.exports = resumeLangPUT;
