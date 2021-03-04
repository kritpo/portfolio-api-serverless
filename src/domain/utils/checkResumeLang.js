'use strict';

// import the params checker
const checkRequiredParamType = require('../../utils/checkRequiredParamType');

/**
 * check if a language object set is correct
 * @param {object} language the language object to check
 */
function checkLanguage(language) {
	// setup the scope for error message purpose
	const scope = 'check-resume-lang(language)';

	// check language information types
	checkRequiredParamType(language, 'object', 'language', scope);
	checkRequiredParamType(
		language.languageCode,
		'string',
		'language.languageCode',
		scope
	);
	checkRequiredParamType(
		language.language,
		'string',
		'language.language',
		scope
	);
}

/**
 * check if a languages array is correct
 * @param {array} languages the languages array to check
 */
function checkLanguages(languages) {
	// setup the scope for error message purpose
	const scope = 'check-resume-lang(languages)';

	// check experience information types
	checkRequiredParamType(languages, 'object', 'languages', scope);

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
