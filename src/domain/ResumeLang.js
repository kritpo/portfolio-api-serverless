'use strict';

// import data checkers
const checkResumeLang = require('./utils/checkResumeLang');

/**
 * Manage resume languages
 */
class ResumeLang {
	#username;
	#defaultLanguage;
	#languages;

	constructor(username) {
		this.#username = username;
	}

	/**
	 * the owner of the resume
	 */
	get username() {
		return this.#username;
	}

	/**
	 * the default language
	 */
	get defaultLanguage() {
		// check if the property is not defined
		if (this.#defaultLanguage === undefined) {
			return undefined;
		}

		return this.#defaultLanguage;
	}
	set defaultLanguage(defaultLanguage) {
		// check the basics information object
		checkResumeLang.checkLanguage(defaultLanguage);

		// transpose data into object
		this.#defaultLanguage = {
			languageCode: defaultLanguage.languageCode,
			language: defaultLanguage.language
		};
	}

	/**
	 * the list of languages
	 */
	get languages() {
		// check if the property is not defined
		if (this.#languages === undefined) {
			return undefined;
		}

		return JSON.parse(JSON.stringify(this.#languages));
	}
	set languages(languages) {
		// check the basics information object
		checkResumeLang.checkLanguages(languages);

		// transpose all data into object
		this.#languages = languages.map(language => ({
			languageCode: language.languageCode,
			language: language.language
		}));
	}
}

module.exports = ResumeLang;
