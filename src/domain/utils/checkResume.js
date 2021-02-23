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
function basics(basics) {
	// check basics information types
	checkRequiredParamType(
		basics.name,
		'string',
		'basics.name',
		'check-resume',
		'basics'
	);
	checkRequiredParamType(
		basics.label,
		'string',
		'basics.label',
		'check-resume',
		'basics'
	);
	checkRequiredParamType(
		basics.picture,
		'string',
		'basics.picture',
		'check-resume',
		'basics'
	);
	checkRequiredParamType(
		basics.email,
		'string',
		'basics.email',
		'check-resume',
		'basics'
	);
	checkRequiredParamType(
		basics.phone,
		'string',
		'basics.phone',
		'check-resume',
		'basics'
	);
	checkRequiredParamType(
		basics.website,
		'string',
		'basics.website',
		'check-resume',
		'basics'
	);
	checkRequiredParamType(
		basics.summary,
		'string',
		'basics.summary',
		'check-resume',
		'basics'
	);
	checkRequiredParamType(
		basics.location,
		'object',
		'basics.location',
		'check-resume',
		'basics'
	);
	checkRequiredParamType(
		basics.location.address,
		'string',
		'basics.location.address',
		'check-resume',
		'basics'
	);
	checkRequiredParamType(
		basics.location.postalCode,
		'string',
		'basics.location.postalCode',
		'check-resume',
		'basics'
	);
	checkRequiredParamType(
		basics.location.city,
		'string',
		'basics.location.city',
		'check-resume',
		'basics'
	);
	checkRequiredParamType(
		basics.location.countryCode,
		'string',
		'basics.location.countryCode',
		'check-resume',
		'basics'
	);
	checkRequiredParamType(
		basics.location.region,
		'string',
		'basics.location.region',
		'check-resume',
		'basics'
	);
	checkRequiredParamType(
		basics.profiles,
		'object',
		'basics.profiles',
		'check-resume',
		'basics'
	);

	// check email address format
	checkParamFormat(
		basics.email,
		/^[a-z0-9\.\-\_]+@[a-z0-9\.\-\_]+\.[a-z0-9]{2,}$/,
		'basics.email',
		'check-resume',
		'basics'
	);

	// loop profiles list
	for (const profile of basics.profiles) {
		// check profile information types
		checkRequiredParamType(
			profile.network,
			'string',
			'profile.network',
			'check-resume',
			'basics'
		);
		checkRequiredParamType(
			profile.username,
			'string',
			'profile.username',
			'check-resume',
			'basics'
		);
		checkRequiredParamType(
			profile.url,
			'string',
			'profile.url',
			'check-resume',
			'basics'
		);
	}
}

/**
 * check if a career experiences array is correct
 * @param {array} career the career experiences array to check
 * @param {boolean} isWork if the career experiences array is a work experiences array
 */
function career(career, isWork) {
	// loop career experience list
	for (const experience of career) {
		// check experience information types
		checkRequiredParamType(
			experience.position,
			'string',
			'experience.position',
			'check-resume',
			'career'
		);
		checkRequiredParamType(
			experience.website,
			'string',
			'experience.website',
			'check-resume',
			'career'
		);
		checkRequiredParamType(
			experience.startDate,
			'string',
			'experience.startDate',
			'check-resume',
			'career'
		);
		checkRequiredParamType(
			experience.summary,
			'string',
			'experience.summary',
			'check-resume',
			'career'
		);
		checkRequiredParamType(
			experience.highlights,
			'object',
			'experience.highlights',
			'check-resume',
			'career'
		);
		checkParamType(
			experience.endDate,
			'string',
			'experience.endDate',
			'check-resume',
			'career'
		);

		// check date formats
		checkParamFormat(
			experience.startDate,
			DATE_REGEX,
			'experience.startDate',
			'check-resume',
			'career'
		);
		checkParamFormat(
			experience.endDate,
			DATE_REGEX,
			'experience.endDate',
			'check-resume',
			'career'
		);

		// loop highlights list
		for (const highlight of experience.highlights) {
			// check highlight type
			checkRequiredParamType(
				highlight,
				'string',
				'highlight',
				'check-resume',
				'career'
			);
		}

		// check if the career experiences array is a work experiences array
		if (isWork) {
			// check work specific experience information types
			checkRequiredParamType(
				experience.company,
				'string',
				'experience.company',
				'check-resume',
				'career'
			);
			checkParamType(
				experience.isInternship,
				'boolean',
				'experience.isInternship',
				'check-resume',
				'career'
			);
		} else {
			// otherwise check volunteering specific experience information types
			checkRequiredParamType(
				experience.organization,
				'string',
				'experience.organization',
				'check-resume',
				'career'
			);
		}
	}
}

/**
 * check if a academic background array is correct
 * @param {array} education the academic background array to check
 */
function education(education) {
	// loop academic background list
	for (const entry of education) {
		// check experience information types
		checkRequiredParamType(
			entry.institution,
			'string',
			'entry.institution',
			'check-resume',
			'education'
		);
		checkRequiredParamType(
			entry.area,
			'string',
			'entry.area',
			'check-resume',
			'education'
		);
		checkRequiredParamType(
			entry.studyType,
			'string',
			'entry.studyType',
			'check-resume',
			'education'
		);
		checkRequiredParamType(
			entry.startDate,
			'string',
			'entry.startDate',
			'check-resume',
			'education'
		);
		checkRequiredParamType(
			entry.gpa,
			'string',
			'entry.gpa',
			'check-resume',
			'education'
		);
		checkRequiredParamType(
			entry.courses,
			'object',
			'entry.courses',
			'check-resume',
			'education'
		);
		checkParamType(
			entry.endDate,
			'string',
			'entry.endDate',
			'check-resume',
			'education'
		);

		// check date formats
		checkParamFormat(
			entry.startDate,
			DATE_REGEX,
			'entry.startDate',
			'check-resume',
			'education'
		);
		checkParamFormat(
			entry.endDate,
			DATE_REGEX,
			'entry.endDate',
			'check-resume',
			'education'
		);

		// loop courses list
		for (const course of entry.courses) {
			// check course types
			checkRequiredParamType(
				course.category,
				'string',
				'course.category',
				'check-resume',
				'education'
			);
			checkRequiredParamType(
				course.courses,
				'object',
				'course.courses',
				'check-resume',
				'education'
			);

			// loop courses list
			for (const courseTitle of course.courses) {
				// check course title type
				checkRequiredParamType(
					courseTitle,
					'string',
					'courseTitle',
					'check-resume',
					'education'
				);
			}
		}
	}
}

/**
 * check if a projects array is correct
 * @param {array} projects the projects array to check
 */
function projects(projects) {
	// loop projects list
	for (const project of projects) {
		// check project information types
		checkRequiredParamType(
			project.name,
			'string',
			'project.name',
			'check-resume',
			'projects'
		);
		checkRequiredParamType(
			project.summary,
			'string',
			'project.summary',
			'check-resume',
			'projects'
		);
		checkRequiredParamType(
			project.startDate,
			'string',
			'project.startDate',
			'check-resume',
			'projects'
		);
		checkRequiredParamType(
			project.picture,
			'string',
			'project.picture',
			'check-resume',
			'projects'
		);
		checkRequiredParamType(
			project.url,
			'string',
			'project.url',
			'check-resume',
			'projects'
		);
		checkRequiredParamType(
			project.technologies,
			'object',
			'project.technologies',
			'check-resume',
			'projects'
		);
		checkParamType(
			project.endDate,
			'string',
			'project.endDate',
			'check-resume',
			'projects'
		);

		// check date formats
		checkParamFormat(
			project.startDate,
			DATE_REGEX,
			'project.startDate',
			'check-resume',
			'projects'
		);
		checkParamFormat(
			project.endDate,
			DATE_REGEX,
			'project.endDate',
			'check-resume',
			'projects'
		);

		// loop technologies list
		for (const technology of project.technologies) {
			// check technology type
			checkRequiredParamType(
				technology,
				'string',
				'technology',
				'check-resume',
				'projects'
			);
		}
	}
}

/**
 * check if a skills array is correct
 * @param {array} skills the skills array to check
 * @param {boolean} isSkills if the skills array is a pure skills array
 */
function skills(skills, isSkills) {
	// loop skills list
	for (const skill of skills) {
		// check skill information types
		checkRequiredParamType(
			isSkills ? skill.name : skill.language,
			'string',
			isSkills ? 'skill.name' : 'skill.language',
			'check-resume',
			'skills'
		);
		checkRequiredParamType(
			isSkills ? skill.level : skill.fluency,
			'string',
			isSkills ? 'skill.level' : 'skill.fluency',
			'check-resume',
			'skills'
		);
	}
}

/**
 * check if a interests array is correct
 * @param {array} interests the interests array to check
 */
function interests(interests) {
	// loop interests list
	for (const interest of interests) {
		// check interest information types
		checkRequiredParamType(
			interest.name,
			'string',
			'interest.name',
			'check-resume',
			'interests'
		);
		checkRequiredParamType(
			interest.keywords,
			'object',
			'interest.keywords',
			'check-resume',
			'interests'
		);

		// loop keywords list
		for (const keyword of interest.keywords) {
			// check keyword type
			checkRequiredParamType(
				keyword,
				'string',
				'keyword',
				'check-resume',
				'interests'
			);
		}
	}
}

/**
 * check if a references array is correct
 * @param {array} references the references array to check
 */
function references(references) {
	// loop references list
	for (const reference of references) {
		// check reference information types
		checkRequiredParamType(
			reference.name,
			'string',
			'reference.name',
			'check-resume',
			'references'
		);
		checkRequiredParamType(
			reference.reference,
			'string',
			'reference.reference',
			'check-resume',
			'references'
		);
	}
}

module.exports = {
	basics,
	career,
	education,
	projects,
	skills,
	interests,
	references,
	// export for test purpose
	DATE_REGEX
};
