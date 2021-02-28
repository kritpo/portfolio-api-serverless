'use strict';

// import errors manager
const errors = require('../../utils/errors');

// import the io dependencies
const http = require('../../io/http-io');
const ddb = require('../../io/ddb-io');

// import the ResumeLang model
const ResumeLang = require('../../domain/ResumeLang');

const resumeLangGET = async event => {
	// decode the input event
	const input = http.httpRequestDecode(event, true);

	// generate a new resume languages container
	const resumeLang = new ResumeLang(input.params.username);

	// hydrate the resume languages container
	return resumeLang
		.hydrate(ddb.dbReadByIdAndFilter)
		.then(() => {
			return http.ok({
				username: resumeLang.username,
				defaultLanguage: resumeLang.defaultLanguage,
				languages: resumeLang.languages
			});
		})
		.catch(err => {
			// log the error
			console.error(`ERROR: ${err}`);

			// check the type of error
			if (err instanceof errors.NotFoundError) {
				return http.notFound();
			}

			return http.internalServerError();
		});
};

module.exports = resumeLangGET;
