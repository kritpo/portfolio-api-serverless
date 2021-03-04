'use strict';

// import errors manager
const errors = require('../../utils/errors');

// import the io dependencies
const http = require('../../io/http-io');
const ddb = require('../../io/ddb-io');

// import the Resume and ResumeLang model
const Resume = require('../../domain/Resume');
const ResumeLang = require('../../domain/ResumeLang');

const resumesPOST = async event => {
	// decode the input event
	const input = http.httpRequestDecode(event, true);

	// check if the username or the language code is not defined
	if (
		input.user === undefined ||
		input.user.username === undefined ||
		input.body === null ||
		input.body.languageCode === undefined
	) {
		// return a BAD REQUEST response
		return http.badRequest();
	}

	// generate a new resume
	const resume = new Resume(input.user.username, input.body.languageCode);

	// initialize a promise auto-resolved
	return (
		new Promise(resolve => resolve())
			// hydrate the resume with values
			.then(() => {
				resume.basics = input.body.basics;
				resume.work = input.body.work;
				resume.volunteer = input.body.volunteer;
				resume.education = input.body.education;
				resume.projects = input.body.projects;
				resume.skills = input.body.skills;
				resume.languages = input.body.languages;
				resume.interests = input.body.interests;
				resume.references = input.body.references;
			})
			// generate a new resume languages container
			.then(() => new ResumeLang(input.user.username))
			.then(resumeLang =>
				// hydrate the resume languages container
				resumeLang
					.hydrate(ddb.dbReadByIdAndFilter)
					.then(() => {
						// add the language into the resume languages container
						resumeLang.add(input.body.languageCode);

						// update the resume languages container
						return resumeLang.updateByReplace(
							ddb.dbUpdateByReplace
						);
					})
					.catch(err => {
						// check if the error is a `not found` error
						if (err instanceof errors.NotFoundError) {
							// add the language into the resume languages container
							resumeLang.add(input.body.languageCode);

							// save the resume languages container
							return resumeLang.create(ddb.dbCreate);
						}

						// rethrow the error to be catch by the last catcher
						throw err;
					})
			)
			// save the resume
			.then(() => resume.create(ddb.dbCreate))
			.then(() => http.created())
			.catch(err => {
				// log the error
				console.error(`ERROR: ${err}`);

				// check the type of error
				if (err instanceof errors.ClientError) {
					return http.badRequest();
				}

				return http.internalServerError();
			})
	);
};

module.exports = resumesPOST;
