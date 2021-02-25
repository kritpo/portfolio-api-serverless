'use strict';

// import the io dependencies
const http = require('../../io/http-io');
const ddb = require('../../io/ddb-io');

// import the Resume and ResumeLang model
const Resume = require('../../domain/Resume');
const ResumeLang = require('../../domain/ResumeLang');

const resumeGET = async event => {
	// decode the input event
	const input = http.httpRequestDecode(event, true, true);

	// initialize the response
	let response;

	// check if the language code is defined in the request
	if (input.queries.languageCode !== undefined) {
		// generate a new resume
		const resume = new Resume(
			input.params.username,
			input.queries.languageCode
		);

		// hydrate the resume
		response = await resume
			.hydrate(ddb.dbReadByIdAndFilter)
			.then(() => {
				// check if the resume is hydrated
				if (resume.hydrated) {
					// return a success OK response
					return http.ok({
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
					});
				}
			})
			// check if an error during hydration occurs
			.catch(err => {
				// log the error
				console.error(`DB ERROR: ${err}`);

				// return a server error
				return http.internalServerError();
			});
	}

	// check if a response is not already defined
	if (response === undefined) {
		// generate a new resume languages container
		const resumeLang = new ResumeLang(input.params.username);

		// hydrate the resume languages container
		response = await resumeLang
			.hydrate(ddb.dbReadByIdAndFilter)
			.then(() => {
				// check if the resume languages container is hydrated
				if (resumeLang.hydrated) {
					// generate a new resume
					const resume = new Resume(
						input.params.username,
						resumeLang.defaultLanguage.languageCode
					);

					// return the hydrated resume
					return resume.hydrate(ddb.dbReadByIdAndFilter).then(() => {
						// check if the resume is hydrated
						if (resume.hydrated) {
							// return a success OK response
							return http.ok({
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
							});
						} else {
							// otherwise return a client error NOT FOUND response
							return http.notFound();
						}
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
			});
	}

	return response;
};

module.exports = resumeGET;
