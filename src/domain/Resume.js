'use strict';

// import data checkers
const checkResume = require('./utils/checkResume');

// import errors manager
const errors = require('../utils/errors');

/**
 * Manage resumes
 */
class Resume {
	#id1;
	#filter;
	#username;
	#languageCode;
	#basics;
	#work;
	#volunteer;
	#education;
	#projects;
	#skills;
	#languages;
	#interests;
	#references;

	constructor(username, languageCode) {
		this.#username = username;
		this.#languageCode = languageCode;

		// update the resource identification
		this.#id1 = 'user_' + this.#username;
		this.#filter = 'resume_' + this.#languageCode;
	}

	/**
	 * create the resume
	 * @param {function} dbCreate the data creator
	 */
	async create(dbCreate) {
		// check if some attributes are not defined
		if (
			this.#basics === undefined ||
			this.#work === undefined ||
			this.#volunteer === undefined ||
			this.#education === undefined ||
			this.#projects === undefined ||
			this.#skills === undefined ||
			this.#languages === undefined ||
			this.#interests === undefined ||
			this.#references === undefined
		) {
			// throw a client resume error
			throw new errors.ClientError('RESUME', 'resume attribute missing');
		}

		// put data into database
		return (
			dbCreate(this.#id1, this.#filter, null, {
				basics: this.#basics,
				work: this.#work,
				volunteer: this.#volunteer,
				education: this.#education,
				projects: this.#projects,
				skills: this.#skills,
				languages: this.#languages,
				interests: this.#interests,
				references: this.#references
			})
				// catch db error
				.catch(err => {
					// throw server db error
					throw new errors.ServerError(
						errors.ioTypes.DB,
						err.message
					);
				})
		);
	}

	/**
	 * hydrate the resume
	 * @param {function} dbReadByIdAndFilter the data reader
	 */
	async hydrate(dbReadByIdAndFilter) {
		// get data from database
		return (
			dbReadByIdAndFilter(this.#id1, this.#filter)
				// catch db error
				.catch(err => {
					// throw server db error
					throw new errors.ServerError(
						errors.ioTypes.DB,
						err.message
					);
				})
				// compute db response
				.then(data => {
					// check if the data is retrieved
					if (data !== undefined) {
						// hydrate with the data
						this.#basics = data.basics;
						this.#work = data.work;
						this.#volunteer = data.volunteer;
						this.#education = data.education;
						this.#projects = data.projects;
						this.#skills = data.skills;
						this.#languages = data.languages;
						this.#interests = data.interests;
						this.#references = data.references;
					} else {
						// throw a not found resume error
						throw new errors.NotFoundError(
							'RESUME',
							'resume not found'
						);
					}
				})
				.catch(err => {
					// throw error to be catch by upper function
					throw err;
				})
		);
	}

	/**
	 * update the resume
	 * @param {function} dbUpdateByExpression the data updater
	 */
	async updateByExpression(dbUpdateByExpression) {
		// initialize containers
		const expressions = [];
		const names = {};
		const values = {};

		// check if each attribute is defined
		// if so, add the update expression, and values identifiers
		if (this.#basics !== undefined) {
			expressions.push('#basics = :basics');
			names['#basics'] = 'basics';
			values[':basics'] = this.#basics;
		}
		if (this.#work !== undefined) {
			expressions.push('#work = :work');
			names['#work'] = 'work';
			values[':work'] = this.#work;
		}
		if (this.#volunteer !== undefined) {
			expressions.push('#volunteer = :volunteer');
			names['#volunteer'] = 'volunteer';
			values[':volunteer'] = this.#volunteer;
		}
		if (this.#education !== undefined) {
			expressions.push('#education = :education');
			names['#education'] = 'education';
			values[':education'] = this.#education;
		}
		if (this.#projects !== undefined) {
			expressions.push('#projects = :projects');
			names['#projects'] = 'projects';
			values[':projects'] = this.#projects;
		}
		if (this.#skills !== undefined) {
			expressions.push('#skills = :skills');
			names['#skills'] = 'skills';
			values[':skills'] = this.#skills;
		}
		if (this.#languages !== undefined) {
			expressions.push('#languages = :languages');
			names['#languages'] = 'languages';
			values[':languages'] = this.#languages;
		}
		if (this.#interests !== undefined) {
			expressions.push('#interests = :interests');
			names['#interests'] = 'interests';
			values[':interests'] = this.#interests;
		}
		if (this.#references !== undefined) {
			expressions.push('#references = :references');
			names['#references'] = 'references';
			values[':references'] = this.#references;
		}

		// check if no update is asked
		if (expressions.length === 0) {
			// throw a client request error
			throw new errors.ClientError(
				'RESUME',
				'no resume attribute to update'
			);
		}

		// update data in the database
		return (
			dbUpdateByExpression(
				this.#id1,
				this.#filter,
				expressions.join(', '),
				names,
				values
			)
				// catch db error
				.catch(err => {
					// throw server db error
					throw new errors.ServerError(
						errors.ioTypes.DB,
						err.message
					);
				})
		);
	}

	/**
	 * replace the resume
	 * @param {function} dbUpdateByReplace the data updater
	 */
	async updateByReplace(dbUpdateByReplace) {
		// check if some attributes are not defined
		if (
			this.#basics === undefined ||
			this.#work === undefined ||
			this.#volunteer === undefined ||
			this.#education === undefined ||
			this.#projects === undefined ||
			this.#skills === undefined ||
			this.#languages === undefined ||
			this.#interests === undefined ||
			this.#references === undefined
		) {
			// throw a client resume error
			throw new errors.ClientError('RESUME', 'resume attribute missing');
		}

		// replace data in the database
		return (
			dbUpdateByReplace(this.#id1, this.#filter, {
				basics: this.#basics,
				work: this.#work,
				volunteer: this.#volunteer,
				education: this.#education,
				projects: this.#projects,
				skills: this.#skills,
				languages: this.#languages,
				interests: this.#interests,
				references: this.#references
			})
				// catch db error
				.catch(err => {
					// throw server db error
					throw new errors.ServerError(
						errors.ioTypes.DB,
						err.message
					);
				})
		);
	}

	/**
	 * the owner of the resume
	 */
	get username() {
		return this.#username;
	}

	/**
	 * the language code of the resume
	 */
	get languageCode() {
		return this.#languageCode;
	}

	/**
	 * the basics information object
	 */
	get basics() {
		// check if the property is not defined
		if (this.#basics === undefined) {
			return undefined;
		}

		return JSON.parse(JSON.stringify(this.#basics));
	}
	set basics(basics) {
		// check the basics information object
		try {
			checkResume.checkBasics(basics);
		} catch (err) {
			// throw a client resume error
			throw new errors.ClientError('RESUME', err.message);
		}

		// transpose all data into object
		this.#basics = {
			name: basics.name,
			label: basics.label,
			picture: basics.picture,
			email: basics.email,
			phone: basics.phone,
			website: basics.website,
			summary: basics.summary,
			location: {
				address: basics.location.address,
				postalCode: basics.location.postalCode,
				city: basics.location.city,
				countryCode: basics.location.countryCode,
				region: basics.location.region
			},
			profiles: basics.profiles.map(profile => ({
				network: profile.network,
				username: profile.username,
				url: profile.url
			}))
		};
	}

	/**
	 * the work experiences array
	 */
	get work() {
		// check if the property is not defined
		if (this.#work === undefined) {
			return undefined;
		}

		return JSON.parse(JSON.stringify(this.#work));
	}
	set work(work) {
		// check the work experiences array
		try {
			checkResume.checkCareer(work, true);
		} catch (err) {
			// throw a client resume error
			throw new errors.ClientError('RESUME', err.message);
		}

		// transpose all data into object
		this.#work = work.map(experience => ({
			isInternship: experience.isInternship,
			company: experience.company,
			position: experience.position,
			website: experience.website,
			startDate: experience.startDate,
			endDate: experience.endDate,
			summary: experience.summary,
			highlights: [...experience.highlights]
		}));
	}

	/**
	 * the volunteering experiences array
	 */
	get volunteer() {
		// check if the property is not defined
		if (this.#volunteer === undefined) {
			return undefined;
		}

		return JSON.parse(JSON.stringify(this.#volunteer));
	}
	set volunteer(volunteer) {
		// check the volunteering experiences array
		try {
			checkResume.checkCareer(volunteer, false);
		} catch (err) {
			// throw a client resume error
			throw new errors.ClientError('RESUME', err.message);
		}

		// transpose all data into object
		this.#volunteer = volunteer.map(experience => ({
			organization: experience.organization,
			position: experience.position,
			website: experience.website,
			startDate: experience.startDate,
			endDate: experience.endDate,
			summary: experience.summary,
			highlights: [...experience.highlights]
		}));
	}

	/**
	 * the academic background array
	 */
	get education() {
		// check if the property is not defined
		if (this.#education === undefined) {
			return undefined;
		}

		return JSON.parse(JSON.stringify(this.#education));
	}
	set education(education) {
		// check the academic background array
		try {
			checkResume.checkEducation(education);
		} catch (err) {
			// throw a client resume error
			throw new errors.ClientError('RESUME', err.message);
		}

		// transpose all data into object
		this.#education = education.map(entry => ({
			institution: entry.institution,
			area: entry.area,
			studyType: entry.studyType,
			startDate: entry.startDate,
			endDate: entry.endDate,
			gpa: entry.gpa,
			courses: entry.courses.map(course => ({
				category: course.category,
				courses: [...course.courses]
			}))
		}));
	}

	/**
	 * the projects array
	 */
	get projects() {
		// check if the property is not defined
		if (this.#projects === undefined) {
			return undefined;
		}

		return JSON.parse(JSON.stringify(this.#projects));
	}
	set projects(projects) {
		// check the projects array
		try {
			checkResume.checkProjects(projects);
		} catch (err) {
			// throw a client resume error
			throw new errors.ClientError('RESUME', err.message);
		}

		// transpose all data into object
		this.#projects = projects.map(project => ({
			name: project.name,
			summary: project.summary,
			startDate: project.startDate,
			endDate: project.endDate,
			picture: project.picture,
			url: project.url,
			technologies: [...project.technologies]
		}));
	}

	/**
	 * the skills array
	 */
	get skills() {
		// check if the property is not defined
		if (this.#skills === undefined) {
			return undefined;
		}

		return JSON.parse(JSON.stringify(this.#skills));
	}
	set skills(skills) {
		// check the skills array
		try {
			checkResume.checkSkills(skills, true);
		} catch (err) {
			// throw a client resume error
			throw new errors.ClientError('RESUME', err.message);
		}

		// transpose all data into object
		this.#skills = skills.map(skill => ({
			name: skill.name,
			level: skill.level
		}));
	}

	/**
	 * the languages array
	 */
	get languages() {
		// check if the property is not defined
		if (this.#languages === undefined) {
			return undefined;
		}

		return JSON.parse(JSON.stringify(this.#languages));
	}
	set languages(languages) {
		// check the languages array
		try {
			checkResume.checkSkills(languages, false);
		} catch (err) {
			// throw a client resume error
			throw new errors.ClientError('RESUME', err.message);
		}

		// transpose all data into object
		this.#languages = languages.map(language => ({
			language: language.language,
			fluency: language.fluency
		}));
	}

	/**
	 * the interests array
	 */
	get interests() {
		// check if the property is not defined
		if (this.#interests === undefined) {
			return undefined;
		}

		return JSON.parse(JSON.stringify(this.#interests));
	}
	set interests(interests) {
		// check the interests array
		try {
			checkResume.checkInterests(interests);
		} catch (err) {
			// throw a client resume error
			throw new errors.ClientError('RESUME', err.message);
		}

		// transpose all data into object
		this.#interests = interests.map(interest => ({
			name: interest.name,
			keywords: [...interest.keywords]
		}));
	}

	/**
	 * the references array
	 */
	get references() {
		// check if the property is not defined
		if (this.#references === undefined) {
			return undefined;
		}

		return JSON.parse(JSON.stringify(this.#references));
	}
	set references(references) {
		// check the references array
		try {
			checkResume.checkReferences(references);
		} catch (err) {
			// throw a client resume error
			throw new errors.ClientError('RESUME', err.message);
		}

		// transpose all data into object
		this.#references = references.map(reference => ({
			name: reference.name,
			reference: reference.reference
		}));
	}
}

module.exports = Resume;
