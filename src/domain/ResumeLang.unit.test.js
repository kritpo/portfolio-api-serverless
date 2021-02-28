'use strict';

// import sinon
const sinon = require('sinon');

// import the tested function dependency
const checkResumeLang = require('./utils/checkResumeLang');
const errors = require('../utils/errors');

// retrieve the tested class
const ResumeLang = require('./ResumeLang');

// configure the test suite
describe('ResumeLang', () => {
	let checkResumeLangStub;
	let clientErrorStub;
	let notFoundErrorStub;
	let serverErrorStub;

	// setup the stubs
	beforeEach(() => {
		// initialize the stubs
		checkResumeLangStub = sinon.stub(checkResumeLang);
		clientErrorStub = sinon.stub(errors, 'ClientError');
		notFoundErrorStub = sinon.stub(errors, 'NotFoundError');
		serverErrorStub = sinon.stub(errors, 'ServerError');

		// configure the stubs
		clientErrorStub.throws(new Error('dumb_client_error'));
		notFoundErrorStub.throws(new Error('dumb_not_found_error'));
		serverErrorStub.throws(new Error('dumb_server_error'));
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
			// try to execute the function
			try {
				// initialize the resume languages container
				const resumeLang = new ResumeLang('wrong_username');

				// execute the function
				await resumeLang.hydrate(readStub);

				// shouldn't be executed
				true.should.be.equal(false, 'should not be executed');
			} catch (e) {
				e.should.be
					.a('Error')
					.which.have.property('message', 'dumb_not_found_error');
				notFoundErrorStub.should.have.been.calledWith(
					'RESUME_LANG',
					'resume languages not found'
				);
			}
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
					.which.have.property('message', 'dumb_server_error');
				serverErrorStub.should.have.been.calledWith('DB', 'dumb_error');
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

			// configure the tests with set
			describe('with set', () => {
				// configure the test with sample set
				it('with sample set', () => {
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
					checkResumeLangStub.checkLanguage.should.have.been.calledWith(
						{
							languageCode: 'en',
							language: 'english'
						}
					);
				});

				// configure the test with emulated error
				it('with emulated error', () => {
					// reset the stub
					checkResumeLangStub.checkLanguage.throws(
						new Error('dumb_error')
					);

					// try to execute the function
					try {
						// execute the function
						resumeLang.defaultLanguage = {};

						// shouldn't be executed
						true.should.be.equal(false, 'should not be executed');
					} catch (e) {
						e.should.be
							.a('Error')
							.which.have.property(
								'message',
								'dumb_client_error'
							);
						clientErrorStub.should.have.been.calledWith(
							'RESUME_LANG',
							'dumb_error'
						);
					}
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

			// configure the tests with set
			describe('with set', () => {
				// configure the test with sample set
				it('with sample set', () => {
					// execute the function
					resumeLang.languages = [
						{ languageCode: 'en', language: 'english' }
					];
					const result = resumeLang.languages;

					result.should.be.deep.equal([
						{ languageCode: 'en', language: 'english' }
					]);
					checkResumeLangStub.checkLanguages.should.have.been.calledWith(
						[{ languageCode: 'en', language: 'english' }]
					);
				});

				// configure the test with emulated error
				it('with emulated error', () => {
					// reset the stub
					checkResumeLangStub.checkLanguages.throws(
						new Error('dumb_error')
					);

					// try to execute the function
					try {
						// execute the function
						resumeLang.languages = {};

						// shouldn't be executed
						true.should.be.equal(false, 'should not be executed');
					} catch (e) {
						e.should.be
							.a('Error')
							.which.have.property(
								'message',
								'dumb_client_error'
							);
						clientErrorStub.should.have.been.calledWith(
							'RESUME_LANG',
							'dumb_error'
						);
					}
				});
			});
		});
	});
});
