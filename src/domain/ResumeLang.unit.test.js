'use strict';

// import sinon
const sinon = require('sinon');

// import the tested function dependency
const checkResumeLang = require('./utils/checkResumeLang');

// retrieve the tested class
const ResumeLang = require('./ResumeLang');

// configure the test suite
describe('ResumeLang', () => {
	let checkResumeLangStub;

	// setup the stub
	beforeEach(() => {
		// initialize the stub
		checkResumeLangStub = sinon.stub(checkResumeLang);
	});

	// reset the stubs
	afterEach(() => sinon.restore());

	// configure the tests of getters and setters
	describe('getters and setters', () => {
		let resumeLang;

		// setup the resume
		beforeEach(() => {
			// initialize the resume languages
			resumeLang = new ResumeLang('dumb_username');
		});

		// configure the tests of username
		describe('username', () => {
			// configure the test with get
			it('with get', () => {
				// execute the function
				const result = resumeLang.username;

				result.should.be.equal('dumb_username');
			});
		});

		// configure the tests of default language
		describe('defaultLanguage', () => {
			// configure the test with get
			it('with get', () => {
				// execute the function
				const result = resumeLang.defaultLanguage;

				should.not.exist(result);
			});

			// configure the test with set
			it('with set', () => {
				// execute the function
				resumeLang.defaultLanguage = {
					languageCode: 'en',
					language: 'english'
				};
				const result = resumeLang.defaultLanguage;

				result.should.be.deep.equal({
					languageCode: 'en',
					language: 'english'
				});
				checkResumeLangStub.checkLanguage.should.have.been.calledWith({
					languageCode: 'en',
					language: 'english'
				});
			});
		});

		// configure the tests of languages
		describe('languages', () => {
			// configure the test with get
			it('with get', () => {
				// execute the function
				const result = resumeLang.languages;

				should.not.exist(result);
			});

			// configure the test with set
			it('with set', () => {
				// execute the function
				resumeLang.languages = [
					{ languageCode: 'en', language: 'english' }
				];
				const result = resumeLang.languages;

				result.should.be.deep.equal([
					{ languageCode: 'en', language: 'english' }
				]);
				checkResumeLangStub.checkLanguages.should.have.been.calledWith([
					{ languageCode: 'en', language: 'english' }
				]);
			});
		});
	});
});
