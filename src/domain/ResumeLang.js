'use strict';

// import data checkers
const checkResumeLang = require('./utils/checkResumeLang');

/**
 * Manage resume languages
 */
class ResumeLang {
	#id1;
	#filter;
	#hydrated;
	#username;
	#defaultLanguage;
	#languages;

	constructor(username) {
		this.#username = username;

		// update the resource identification
		this.#id1 = 'user_' + this.#username;
		this.#filter = 'resume';
		this.#hydrated = false;
	}

	/**
	 * hydrate the resume languages container
	 * @param {function} dbReadByIdAndFilter the data reader
	 */
	async hydrate(dbReadByIdAndFilter) {
		// get data from database
		await dbReadByIdAndFilter(this.#id1, this.#filter)
			.then(data => {
				// check if the data is retrieved
				if (data !== undefined) {
					// hydrate with the data
					this.#defaultLanguage = data.defaultLanguage;
					this.#languages = data.languages;
					this.#hydrated = true;
				}
			})
			.catch(err => {
				// throw db error to be catch by upper function
				throw err;
			});
	}

	/**
	 * the hydration status
	 */
	get hydrated() {
		return this.#hydrated;
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
