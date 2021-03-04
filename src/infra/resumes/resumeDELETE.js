'use strict';

// import errors manager
const errors = require('../../utils/errors');

// import the io dependencies
const http = require('../../io/http-io');
const ddb = require('../../io/ddb-io');

// import the Resume and ResumeLang model
const Resume = require('../../domain/Resume');
const ResumeLang = require('../../domain/ResumeLang');

const resumeDELETE = async event => {
	// decode the input event
	const input = http.httpRequestDecode(event, true, true);

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
			// initialize the resumes container
			let resumes;

			// check if the language code is defined in the request
			if (input.queries.languageCode !== undefined) {
				// retrieve the language resume
				resumes = [
					new Resume(
						input.params.username,
						input.queries.languageCode
					)
				];

				// remove the language from the resume languages container
				resumeLang.remove(input.queries.languageCode);
			} else {
				// convert all resume languages to the equivalent resume
				resumes = resumeLang.map(
					language =>
						new Resume(input.params.username, language.languageCode)
				);

				// remove all languages from the resume languages container
				resumeLang.empty();
			}

			// check if the resume languages container is empty
			if (resumeLang.size() === 0) {
				// delete the resume languages container
				return resumeLang.delete(ddb.dbDelete).then(() => resumes);
			} else {
				// otherwise update the resume languages container
				return resumeLang
					.updateByReplace(ddb.dbUpdateByReplace)
					.then(() => resumes);
			}
		})
		.then(resumes => {
			// loop the resumes to delete them
			resumes = resumes.map(resume => resume.delete(ddb.dbDelete));

			// check the output of all promises
			return Promise.all(resumes).then(() => http.noContent());
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

module.exports = resumeDELETE;
