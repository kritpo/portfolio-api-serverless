'use strict';

// import errors manager
const errors = require('../../utils/errors');

// import the io dependencies
const http = require('../../io/http-io');
const ddb = require('../../io/ddb-io');

// import the Resume and ResumeLang model
const Resume = require('../../domain/Resume');
const ResumeLang = require('../../domain/ResumeLang');

const resumeGET = async event => {
	// decode the input event
	const input = http.httpRequestDecode(event, true, true);

	// initialize the response as a promise auto-resolved
	let response = new Promise(resolve => resolve());

	// check if the language code is defined in the request
	if (input.queries.languageCode !== undefined) {
		// generate a new resume
		const resume = new Resume(
			input.params.username,
			input.queries.languageCode
		);

		// hydrate the resume
		response = resume.hydrate(ddb.dbReadByIdAndFilter).then(() =>
			// if success, return ok response with the resume
			http.ok({
				username: resume.username,
				languageCode: resume.languageCode,
				basics: resume.basics,
				work: resume.work,
				volunteer: resume.volunteer,
				education: resume.education,
				projects: resume.projects,
				skills: resume.skills,
				languages: resume.languages,
				interests: resume.interests,
				references: resume.references
			})
		);
	}

	return (
		response
			// catch eventual errors when the resume is hydrated with the language query
			.catch(err => {
				// check if the error is a `not found` error
				if (err instanceof errors.NotFoundError) {
					// return nothing, to pursue the stack, will try to find the default resume
					return;
				}

				// rethrow the error to be catch by the last catcher
				throw err;
			})
			.then(response => {
				// check if the response is defined
				if (response !== undefined) {
					// return directly the response as it was already computed
					return response;
				}

				// generate a new resume languages container
				const resumeLang = new ResumeLang(input.params.username);

				// hydrate the resume languages container
				return resumeLang.hydrate(ddb.dbReadByIdAndFilter).then(() => {
					// generate a new resume
					const resume = new Resume(
						input.params.username,
						resumeLang.defaultLanguage.languageCode
					);

					// return the hydrated resume
					return resume.hydrate(ddb.dbReadByIdAndFilter).then(() =>
						http.ok({
							username: resume.username,
							languageCode: resume.languageCode,
							basics: resume.basics,
							work: resume.work,
							volunteer: resume.volunteer,
							education: resume.education,
							projects: resume.projects,
							skills: resume.skills,
							languages: resume.languages,
							interests: resume.interests,
							references: resume.references
						})
					);
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
			})
	);
};

module.exports = resumeGET;
