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

	// configure the tests of hydrate
	describe('hydrate', () => {
		let readStub;

		// setup the resume
		beforeEach(() => {
			// initialize the stub
			readStub = sinon.stub();

			// configure the stub
			readStub.withArgs('user_good_username', 'resume').resolves({
				defaultLanguage: { languageCode: 'en', language: 'english' },
				languages: [{ languageCode: 'en', language: 'english' }]
			});
			readStub
				.withArgs('user_wrong_username', 'resume')
				.resolves(undefined);
		});

		// configure the test with right data
		it('with right data', async () => {
			// initialize the resume languages container
			const resumeLang = new ResumeLang('good_username');

			// execute the function
			await resumeLang.hydrate(readStub);

			resumeLang.hydrated.should.be.equal(true);
			resumeLang.defaultLanguage.should.be.deep.equal({
				languageCode: 'en',
				language: 'english'
			});
			resumeLang.languages.should.be.deep.equal([
				{ languageCode: 'en', language: 'english' }
			]);
		});

		// configure the test with wrong data
		it('with wrong data', async () => {
			// initialize the resume languages container
			const resumeLang = new ResumeLang('wrong_username');

			// execute the function
			await resumeLang.hydrate(readStub);

			resumeLang.hydrated.should.be.equal(false);
			should.not.exist(resumeLang.defaultLanguage);
			should.not.exist(resumeLang.languages);
		});

		// configure the test with emulated db error
		it('with emulated db error', async () => {
			// try to execute the function
			try {
				// initialize the resume languages container
				const resumeLang = new ResumeLang('dumb_username');

				// configure the stub
				readStub.rejects(new Error('dumb_error'));

				// execute the function
				await resumeLang.hydrate(readStub);

				// shouldn't be executed
				true.should.be.equal(false, 'should not be executed');
			} catch (e) {
				e.should.be
					.a('Error')
					.which.have.property('message', 'dumb_error');
			}
		});
	});

	// configure the tests of getters and setters
	describe('getters and setters', () => {
		let resumeLang;

		// setup the resume
		beforeEach(() => {
			// initialize the resume languages
			resumeLang = new ResumeLang('dumb_username');
		});

		// configure the tests of hydrated
		describe('hydrated', () => {
			// configure the test with get
			it('with get', () => {
				// execute the function
				const result = resumeLang.hydrated;

				result.should.be.equal(false);
			});
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
