'use strict';

// import data checkers
const checkResumeLang = require('./utils/checkResumeLang');

// import errors manager
const errors = require('../utils/errors');

/**
 * Manage resume languages
 */
class ResumeLang {
	#id1;
	#filter;
	#username;
	#defaultLanguage;
	#languages;

	constructor(username) {
		this.#username = username;

		// update the resource identification
		this.#id1 = 'user_' + this.#username;
		this.#filter = 'resume';
	}

	/**
	 * hydrate the resume languages container
	 * @param {function} dbReadByIdAndFilter the data reader
	 */
	async hydrate(dbReadByIdAndFilter) {
		// get data from database
		await dbReadByIdAndFilter(this.#id1, this.#filter)
			// catch db error
			.catch(err => {
				// throw server db error
				throw new errors.ServerError(errors.ioTypes.DB, err.message);
			})
			.then(data => {
				// check if the data is retrieved
				if (data !== undefined) {
					// hydrate with the data
					this.#defaultLanguage = data.defaultLanguage;
					this.#languages = data.languages;
				} else {
					// throw a not found resume error
					throw new errors.NotFoundError(
						'RESUME_LANG',
						'resume languages not found'
					);
				}
			})
			.catch(err => {
				// throw error to be catch by upper function
				throw err;
			});
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
		try {
			checkResumeLang.checkLanguage(defaultLanguage);
		} catch (err) {
			// throw a client resume error
			throw new errors.ClientError('RESUME_LANG', err.message);
		}

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
		try {
			checkResumeLang.checkLanguages(languages);
		} catch (err) {
			// throw a client resume error
			throw new errors.ClientError('RESUME_LANG', err.message);
		}

		// transpose all data into object
		this.#languages = languages.map(language => ({
			languageCode: language.languageCode,
			language: language.language
		}));
	}
}

module.exports = ResumeLang;
