'use strict';

// import data checkers
const checkResumeLang = require('./utils/checkResumeLang');

// import errors manager
const errors = require('../utils/errors');

// import language constants
const languageConst = require('./utils/languageConst');

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
	 * create the resume languages container
	 * @param {function} dbCreate the data creator
	 */
	async create(dbCreate) {
		// check if some attributes are not defined
		if (
			this.#defaultLanguage === undefined ||
			this.#languages === undefined
		) {
			// throw a client resume languages error
			throw new errors.ClientError(
				'RESUME_LANG',
				'resume languages attribute missing'
			);
		}

		// put data into database
		return (
			dbCreate(this.#id1, this.#filter, null, {
				defaultLanguage: this.#defaultLanguage,
				languages: this.#languages
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
	 * hydrate the resume languages container
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
				.then(data => {
					// check if the data is retrieved
					if (data !== undefined) {
						// hydrate with the data
						this.#defaultLanguage = data.defaultLanguage;
						this.#languages = data.languages;
					} else {
						// throw a not found resume languages error
						throw new errors.NotFoundError(
							'RESUME_LANG',
							'resume languages not found'
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
	 * replace the resume languages container
	 * @param {function} dbUpdateByReplace the data updater
	 */
	async updateByReplace(dbUpdateByReplace) {
		// check if some attributes are not defined
		if (
			this.#defaultLanguage === undefined ||
			this.#languages === undefined
		) {
			// throw a client resume languages error
			throw new errors.ClientError(
				'RESUME_LANG',
				'resume languages attribute missing'
			);
		}

		// replace data in the database
		return (
			dbUpdateByReplace(this.#id1, this.#filter, {
				defaultLanguage: this.#defaultLanguage,
				languages: this.#languages
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
	 * delete the resume languages container
	 * @param {function} dbDelete the data deleter
	 */
	async delete(dbDelete) {
		// delete data from the database
		return (
			dbDelete(this.#id1, this.#filter)
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
	 * update the default language of the resume languages container
	 * @param {string} languageCode the language code
	 */
	updateDefaultLanguage(languageCode) {
		// retrieve the language in the languages container
		const foundedLanguagesIndex = this.#languages.findIndex(
			lang => lang.languageCode === languageCode
		);

		// check if the language is not in the resume languages container
		if (foundedLanguagesIndex === -1) {
			// throw a client error
			throw new errors.ClientError('RESUME_LANG', 'language not exist');
		}

		// replace the default language
		this.#defaultLanguage = { ...this.#languages[foundedLanguagesIndex] };
	}

	/**
	 * add a language code into the resume languages container
	 * @param {string} languageCode the language code
	 */
	add(languageCode) {
		// check if the language code is not correct
		if (languageConst[languageCode] === undefined) {
			// throw a client error
			throw new errors.ClientError(
				'RESUME_LANG',
				'language code not correct'
			);
		}

		// check if the default language is not defined
		if (this.#defaultLanguage === undefined) {
			// replace the default language with the current language
			this.#defaultLanguage = { ...languageConst[languageCode] };

			// initialize the languages container
			this.#languages = [];
		}

		// retrieve the language in the languages container
		const foundedLanguages = this.#languages.find(
			lang => lang.languageCode === languageCode
		);

		// check if the language is not already in the languages container
		if (foundedLanguages === undefined) {
			// add the language in the list
			this.#languages.push({ ...languageConst[languageCode] });
		} else {
			// throw a client error
			throw new errors.ClientError(
				'RESUME_LANG',
				'language already exist'
			);
		}
	}

	/**
	 * remove a language code from the resume languages container
	 * @param {string} languageCode the language code
	 */
	remove(languageCode) {
		// retrieve the language in the languages container
		const foundedLanguages = this.#languages.findIndex(
			lang => lang.languageCode === languageCode
		);

		// check if the language is not in the resume languages container
		if (foundedLanguages === -1) {
			// throw a client error
			throw new errors.ClientError('RESUME_LANG', 'language not exist');
		} else {
			// otherwise remove the language from the list
			this.#languages.splice(foundedLanguages, 1);
		}

		// check if the default language is the language
		if (this.#defaultLanguage.languageCode === languageCode) {
			// check if the languages container is not empty
			if (this.#languages.length > 0) {
				// replace the default language with the first language
				this.#defaultLanguage = { ...this.#languages[0] };
			} else {
				// otherwise replace the default language with nothing
				this.#defaultLanguage = undefined;
			}
		}
	}

	/**
	 * empty the resume languages container
	 */
	empty() {
		// empty container
		this.#defaultLanguage = undefined;
		this.#languages = [];
	}

	/**
	 * size of the resume languages container
	 */
	size() {
		// return the size of the resume languages container array
		return this.#languages.length;
	}

	/**
	 * Array.map() equivalent in the resume languages container
	 * @param {function} func the function which perform the map
	 */
	map(func) {
		// perform the map
		return this.#languages.map(func);
	}

	/**
	 * check if the language code is in the resume languages container
	 * @param {string} languageCode the language code
	 */
	contains(languageCode) {
		// retrieve the language in the languages container
		const foundedLanguages = this.#languages.find(
			lang => lang.languageCode === languageCode
		);

		// check if the language is not already in the languages container
		if (foundedLanguages === undefined) {
			// throw a client error
			throw new errors.NotFoundError(
				'RESUME_LANG',
				'language not defined'
			);
		}
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
