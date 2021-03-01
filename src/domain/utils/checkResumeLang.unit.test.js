'use strict';

// import sinon
const sinon = require('sinon');

// import the tested function dependency
const checkRequiredParamType = require('../../utils/checkRequiredParamType');

// retrieve the tested module
const checkResumeLang = require('./checkResumeLang');

// configure the test suite
describe('checkResumeLang', () => {
	let checkReqParamTypeStub;

	// setup the stub
	beforeEach(() => {
		// initialize the stub
		checkReqParamTypeStub = sinon.stub(
			checkRequiredParamType,
			'checkRequiredParamType'
		);
	});

	// reset the stub
	afterEach(() => sinon.restore());

	// configure the tests of language check
	describe('language', () => {
		// configure the test with sample set
		it('with sample set', () => {
			// execute the function
			checkResumeLang.checkLanguage({
				languageCode: 'en',
				language: 'English'
			});

			checkReqParamTypeStub.should.have.been.calledWith(
				{ languageCode: 'en', language: 'English' },
				'object',
				'language',
				'check-resume-lang(language)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'en',
				'string',
				'language.languageCode'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'English',
				'string',
				'language.language',
				'check-resume-lang(language)'
			);
		});
	});

	// configure the tests of languages check
	describe('languages', () => {
		// configure the test with sample set
		it('with sample set', () => {
			// execute the function
			checkResumeLang.checkLanguages([
				{ languageCode: 'en', language: 'English' }
			]);

			checkReqParamTypeStub.should.have.been.calledWith(
				[{ languageCode: 'en', language: 'English' }],
				'object',
				'languages',
				'check-resume-lang(languages)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				{ languageCode: 'en', language: 'English' },
				'object',
				'language',
				'check-resume-lang(language)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'en',
				'string',
				'language.languageCode',
				'check-resume-lang(language)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'English',
				'string',
				'language.language',
				'check-resume-lang(language)'
			);
		});
	});
});
