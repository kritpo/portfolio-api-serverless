'use strict';

// import the params checker
const checkRequiredParamType = require('../../utils/checkRequiredParamType');

/**
 * check if a language object set is correct
 * @param {object} language the language object to check
 */
function checkLanguage(language) {
	// check language information types
	checkRequiredParamType(
		language,
		'object',
		'language',
		'check-resume-lang',
		'language'
	);
	checkRequiredParamType(
		language.languageCode,
		'string',
		'language.languageCode',
		'check-resume-lang',
		'language'
	);
	checkRequiredParamType(
		language.language,
		'string',
		'language.language',
		'check-resume-lang',
		'language'
	);
}

/**
 * check if a languages array is correct
 * @param {array} languages the languages array to check
 */
function checkLanguages(languages) {
	// check experience information types
	checkRequiredParamType(
		languages,
		'object',
		'languages',
		'check-resume-lang',
		'languages'
	);

	// loop languages list
	for (const language of languages) {
		// check if a language object set is correct
		checkLanguage(language);
	}
}

module.exports = {
	checkLanguage,
	checkLanguages
};
