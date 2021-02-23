'use strict';

// import data checkers
const checkResume = require('./utils/checkResume');

/**
 * Manage resumes
 */
class Resume {
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
		checkResume.basics(basics);

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
		checkResume.career(work, true);

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
		checkResume.career(volunteer, false);

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
		checkResume.education(education);

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
		checkResume.projects(projects);

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
		checkResume.skills(skills, true);

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
		checkResume.skills(languages, false);

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
		checkResume.interests(interests);

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
		checkResume.references(references);

		// transpose all data into object
		this.#references = references.map(reference => ({
			name: reference.name,
			reference: reference.reference
		}));
	}
}

module.exports = Resume;