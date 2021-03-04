'use strict';

// import errors manager
const errors = require('../../utils/errors');

// import the io dependencies
const http = require('../../io/http-io');
const ddb = require('../../io/ddb-io');

// import the Resume and ResumeLang model
const Resume = require('../../domain/Resume');
const ResumeLang = require('../../domain/ResumeLang');

const resumePUT = async event => {
	// decode the input event
	const input = http.httpRequestDecode(event, true);

	// check if the username or the language code is not defined
	if (
		input.user === undefined ||
		input.user.username === undefined ||
		input.params.username === undefined ||
		input.body === null ||
		input.body.languageCode === undefined
	) {
		// return a BAD REQUEST response
		return http.badRequest();
	}

	// check if the username in path and the one logged are not the same
	if (input.user.username !== input.params.username) {
		// return a FORBIDDEN response
		return http.forbidden();
	}

	// generate a new resume
	const resume = new Resume(input.params.username, input.body.languageCode);

	// initialize a promise auto-resolved
	return (
		new Promise(resolve => resolve())
			// hydrate the resume with values
			.then(() => {
				// check if data is defined, if so, hydrate the attribute with it
				if (input.body.basics !== undefined) {
					resume.basics = input.body.basics;
				}
				if (input.body.work !== undefined) {
					resume.work = input.body.work;
				}
				if (input.body.volunteer !== undefined) {
					resume.volunteer = input.body.volunteer;
				}
				if (input.body.education !== undefined) {
					resume.education = input.body.education;
				}
				if (input.body.projects !== undefined) {
					resume.projects = input.body.projects;
				}
				if (input.body.skills !== undefined) {
					resume.skills = input.body.skills;
				}
				if (input.body.languages !== undefined) {
					resume.languages = input.body.languages;
				}
				if (input.body.interests !== undefined) {
					resume.interests = input.body.interests;
				}
				if (input.body.references !== undefined) {
					resume.references = input.body.references;
				}
			})
			// generate a new resume languages container
			.then(() => new ResumeLang(input.params.username))
			.then(resumeLang =>
				// hydrate the resume languages container
				resumeLang
					.hydrate(ddb.dbReadByIdAndFilter)
					// check if the language is defined
					.then(() => resumeLang.contains(input.body.languageCode))
			)
			// update the resume
			.then(() => {
				// check if the resume is partial
				if (input.body.isPartial) {
					// update by expression
					return resume.updateByExpression(ddb.dbUpdateByExpression);
				} else {
					// otherwise, update by replace
					return resume.updateByReplace(ddb.dbUpdateByReplace);
				}
			})
			.then(() => http.noContent())
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
			})
	);
};

module.exports = resumePUT;
