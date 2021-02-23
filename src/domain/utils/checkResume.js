'use strict';

// define constants
const DATE_REGEX = /^([1-2][0-9]{3}-[0-1][0-9]-[0-3][0-9]|[1-2][0-9]{3}-[0-1][0-9]|[1-2][0-9]{3})$/;

// import the params checker
const checkRequiredParamType = require('../../utils/checkRequiredParamType');
const checkParamType = require('../../utils/checkParamType');
const checkParamFormat = require('../../utils/checkParamFormat');

/**
 * check if a basics information object set is correct
 * @param {object} basics the basics information object to check
 */
function checkBasics(basics) {
	// setup the scope for error message purpose
	const scope = 'check-resume(basics)';

	// check basics information types
	checkRequiredParamType(basics, 'object', 'basics', scope);
	checkRequiredParamType(basics.name, 'string', 'basics.name', scope);
	checkRequiredParamType(basics.label, 'string', 'basics.label', scope);
	checkRequiredParamType(basics.picture, 'string', 'basics.picture', scope);
	checkRequiredParamType(basics.email, 'string', 'basics.email', scope);
	checkRequiredParamType(basics.phone, 'string', 'basics.phone', scope);
	checkRequiredParamType(basics.website, 'string', 'basics.website', scope);
	checkRequiredParamType(basics.summary, 'string', 'basics.summary', scope);
	checkRequiredParamType(basics.location, 'object', 'basics.location', scope);
	checkRequiredParamType(
		basics.location.address,
		'string',
		'basics.location.address',
		scope
	);
	checkRequiredParamType(
		basics.location.postalCode,
		'string',
		'basics.location.postalCode',
		scope
	);
	checkRequiredParamType(
		basics.location.city,
		'string',
		'basics.location.city',
		scope
	);
	checkRequiredParamType(
		basics.location.countryCode,
		'string',
		'basics.location.countryCode',
		scope
	);
	checkRequiredParamType(
		basics.location.region,
		'string',
		'basics.location.region',
		scope
	);
	checkRequiredParamType(basics.profiles, 'object', 'basics.profiles', scope);

	// check email address format
	checkParamFormat(
		basics.email,
		/^[a-z0-9\.\-\_]+@[a-z0-9\.\-\_]+\.[a-z0-9]{2,}$/,
		'basics.email',
		scope
	);

	// loop profiles list
	for (const profile of basics.profiles) {
		// check profile information types
		checkRequiredParamType(
			profile.network,
			'string',
			'profile.network',
			scope
		);
		checkRequiredParamType(
			profile.username,
			'string',
			'profile.username',
			scope
		);
		checkRequiredParamType(profile.url, 'string', 'profile.url', scope);
	}
}

/**
 * check if a career experiences array is correct
 * @param {array} career the career experiences array to check
 * @param {boolean} isWork if the career experiences array is a work experiences array
 */
function checkCareer(career, isWork) {
	// setup the scope for error message purpose
	const scope = 'check-resume(career)';

	// check experiences information types
	checkRequiredParamType(career, 'object', 'career', scope);

	// loop career experience list
	for (const experience of career) {
		// check experience information types
		checkRequiredParamType(
			experience.position,
			'string',
			'experience.position',
			scope
		);
		checkRequiredParamType(
			experience.website,
			'string',
			'experience.website',
			scope
		);
		checkRequiredParamType(
			experience.startDate,
			'string',
			'experience.startDate',
			scope
		);
		checkRequiredParamType(
			experience.summary,
			'string',
			'experience.summary',
			scope
		);
		checkRequiredParamType(
			experience.highlights,
			'object',
			'experience.highlights',
			scope
		);
		checkParamType(
			experience.endDate,
			'string',
			'experience.endDate',
			scope
		);

		// check date formats
		checkParamFormat(
			experience.startDate,
			DATE_REGEX,
			'experience.startDate',
			scope
		);
		checkParamFormat(
			experience.endDate,
			DATE_REGEX,
			'experience.endDate',
			scope
		);

		// loop highlights list
		for (const highlight of experience.highlights) {
			// check highlight type
			checkRequiredParamType(highlight, 'string', 'highlight', scope);
		}

		// check if the career experiences array is a work experiences array
		if (isWork) {
			// check work specific experience information types
			checkRequiredParamType(
				experience.company,
				'string',
				'experience.company',
				scope
			);
			checkParamType(
				experience.isInternship,
				'boolean',
				'experience.isInternship',
				scope
			);
		} else {
			// otherwise check volunteering specific experience information types
			checkRequiredParamType(
				experience.organization,
				'string',
				'experience.organization',
				scope
			);
		}
	}
}

/**
 * check if a academic background array is correct
 * @param {array} education the academic background array to check
 */
function checkEducation(education) {
	// setup the scope for error message purpose
	const scope = 'check-resume(education)';

	// check experiences information types
	checkRequiredParamType(education, 'object', 'education', scope);

	// loop academic background list
	for (const entry of education) {
		// check experience information types
		checkRequiredParamType(
			entry.institution,
			'string',
			'entry.institution',
			scope
		);
		checkRequiredParamType(entry.area, 'string', 'entry.area', scope);
		checkRequiredParamType(
			entry.studyType,
			'string',
			'entry.studyType',
			scope
		);
		checkRequiredParamType(
			entry.startDate,
			'string',
			'entry.startDate',
			scope
		);
		checkRequiredParamType(entry.gpa, 'string', 'entry.gpa', scope);
		checkRequiredParamType(entry.courses, 'object', 'entry.courses', scope);
		checkParamType(entry.endDate, 'string', 'entry.endDate', scope);

		// check date formats
		checkParamFormat(entry.startDate, DATE_REGEX, 'entry.startDate', scope);
		checkParamFormat(entry.endDate, DATE_REGEX, 'entry.endDate', scope);

		// loop courses list
		for (const course of entry.courses) {
			// check course types
			checkRequiredParamType(
				course.category,
				'string',
				'course.category',
				scope
			);
			checkRequiredParamType(
				course.courses,
				'object',
				'course.courses',
				scope
			);

			// loop courses list
			for (const courseTitle of course.courses) {
				// check course title type
				checkRequiredParamType(
					courseTitle,
					'string',
					'courseTitle',
					scope
				);
			}
		}
	}
}

/**
 * check if a projects array is correct
 * @param {array} projects the projects array to check
 */
function checkProjects(projects) {
	// setup the scope for error message purpose
	const scope = 'check-resume(projects)';

	// check project information types
	checkRequiredParamType(projects, 'object', 'projects', scope);

	// loop projects list
	for (const project of projects) {
		// check project information types
		checkRequiredParamType(project.name, 'string', 'project.name', scope);
		checkRequiredParamType(
			project.summary,
			'string',
			'project.summary',
			scope
		);
		checkRequiredParamType(
			project.startDate,
			'string',
			'project.startDate',
			scope
		);
		checkRequiredParamType(
			project.picture,
			'string',
			'project.picture',
			scope
		);
		checkRequiredParamType(project.url, 'string', 'project.url', scope);
		checkRequiredParamType(
			project.technologies,
			'object',
			'project.technologies',
			scope
		);
		checkParamType(project.endDate, 'string', 'project.endDate', scope);

		// check date formats
		checkParamFormat(
			project.startDate,
			DATE_REGEX,
			'project.startDate',
			scope
		);
		checkParamFormat(project.endDate, DATE_REGEX, 'project.endDate', scope);

		// loop technologies list
		for (const technology of project.technologies) {
			// check technology type
			checkRequiredParamType(technology, 'string', 'technology', scope);
		}
	}
}

/**
 * check if a skills array is correct
 * @param {array} skills the skills array to check
 * @param {boolean} isSkills if the skills array is a pure skills array
 */
function checkSkills(skills, isSkills) {
	// setup the scope for error message purpose
	const scope = 'check-resume(skills)';

	// check skills information types
	checkRequiredParamType(skills, 'object', 'skills', scope);

	// loop skills list
	for (const skill of skills) {
		// check skill information types
		checkRequiredParamType(
			isSkills ? skill.name : skill.language,
			'string',
			isSkills ? 'skill.name' : 'skill.language',
			scope
		);
		checkRequiredParamType(
			isSkills ? skill.level : skill.fluency,
			'string',
			isSkills ? 'skill.level' : 'skill.fluency',
			scope
		);
	}
}

/**
 * check if a interests array is correct
 * @param {array} interests the interests array to check
 */
function checkInterests(interests) {
	// setup the scope for error message purpose
	const scope = 'check-resume(interests)';

	// check interests information types
	checkRequiredParamType(interests, 'object', 'interests', scope);

	// loop interests list
	for (const interest of interests) {
		// check interest information types
		checkRequiredParamType(interest.name, 'string', 'interest.name', scope);
		checkRequiredParamType(
			interest.keywords,
			'object',
			'interest.keywords',
			scope
		);

		// loop keywords list
		for (const keyword of interest.keywords) {
			// check keyword type
			checkRequiredParamType(keyword, 'string', 'keyword', scope);
		}
	}
}

/**
 * check if a references array is correct
 * @param {array} references the references array to check
 */
function checkReferences(references) {
	// setup the scope for error message purpose
	const scope = 'check-resume(references)';

	// check references information types
	checkRequiredParamType(references, 'object', 'references', scope);

	// loop references list
	for (const reference of references) {
		// check reference information types
		checkRequiredParamType(
			reference.name,
			'string',
			'reference.name',
			scope
		);
		checkRequiredParamType(
			reference.reference,
			'string',
			'reference.reference',
			scope
		);
	}
}

module.exports = {
	checkBasics,
	checkCareer,
	checkEducation,
	checkProjects,
	checkSkills,
	checkInterests,
	checkReferences,
	// export for test purpose
	DATE_REGEX
};
