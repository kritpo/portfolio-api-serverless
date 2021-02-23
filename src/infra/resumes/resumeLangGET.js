'use strict';

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
	return (
		resumeLang
			.hydrate(ddb.dbReadByIdAndFilter)
			.then(() => {
				// check if the resume languages container is hydrated
				if (resumeLang.hydrated) {
					// return a success OK response
					return http.ok({
						username: resumeLang.username,
						defaultLanguage: resumeLang.defaultLanguage,
						languages: resumeLang.languages
					});
				} else {
					// otherwise return a client error NOT FOUND response
					return http.notFound();
				}
			})
			// check if an error during hydration occurs
			.catch(err => {
				// log the error
				console.error(`DB ERROR: ${err}`);

				// return a server error
				return http.internalServerError();
			})
	);
};

module.exports = resumeLangGET;
