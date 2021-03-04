'use strict';

// import aws-sdk-mock
const AWS = require('aws-sdk-mock');

// import the http event generator
const httpEventGenerator = require('../../utils/tests/httpEventGenerator');

// retrieve the tested handler
const resumeLangPUT = require('./resumeLangPUT');

// configure the test suite
describe('resumeLangPUT', () => {
	// setup the aws mock
	beforeEach(() => {
		// initialize the aws mock
		AWS.mock('DynamoDB.DocumentClient', 'get', (params, callback) => {
			// check if the PK is right
			if (params.Key.PK === 'user_good_username') {
				// call the callback with success response
				callback(null, {
					Item: {
						id1: 'user_good_username',
						filter: 'resume',
						defaultLanguage: {
							languageCode: 'en',
							language: 'English'
						},
						languages: [
							{ languageCode: 'en', language: 'English' },
							{ languageCode: 'fr', language: 'Français' }
						]
					}
				});
			} else {
				// otherwise call the callback with success empty response
				callback(null, {});
			}
		});
		AWS.mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
			callback(null, {});
		});
	});

	// reset the aws mock
	afterEach(() => AWS.restore());

	// configure the test with NO CONTENT response
	it('with NO CONTENT response', async () => {
		// initialize the sample http event
		const sampleHttpEvent = httpEventGenerator(
			'PUT',
			{ languageCode: 'fr' },
			{ username: 'good_username' },
			false,
			false,
			{ username: 'good_username' }
		);

		// retrieve the result of the handler
		const result = await resumeLangPUT(sampleHttpEvent);

		result.should.be.deep.equal({
			statusCode: 204,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: undefined
		});
	});

	// configure the tests with BAD REQUEST response
	describe('with BAD REQUEST response', () => {
		// configure the test with no params
		it('with no params', async () => {
			// initialize the sample http event
			const sampleHttpEvent = httpEventGenerator(
				'PUT',
				{ languageCode: 'fr' },
				false,
				false,
				false,
				{ username: 'dumb_username' }
			);

			// retrieve the result of the handler
			const result = await resumeLangPUT(sampleHttpEvent);

			result.should.be.deep.equal({
				statusCode: 400,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': true
				},
				body: JSON.stringify({ message: 'Bad Request' })
			});
		});

		// configure the test with no data
		it('with no data', async () => {
			// initialize the sample http event
			const sampleHttpEvent = httpEventGenerator(
				'PUT',
				false,
				{ username: 'good_username' },
				false,
				false,
				{ username: 'good_username' }
			);

			// retrieve the result of the handler
			const result = await resumeLangPUT(sampleHttpEvent);

			result.should.be.deep.equal({
				statusCode: 400,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': true
				},
				body: JSON.stringify({ message: 'Bad Request' })
			});
		});

		// configure the test with wrong language
		it('with wrong language', async () => {
			// initialize the sample http event
			const sampleHttpEvent = httpEventGenerator(
				'PUT',
				{ languageCode: 'de' },
				{ username: 'good_username' },
				false,
				false,
				{ username: 'good_username' }
			);

			// retrieve the result of the handler
			const result = await resumeLangPUT(sampleHttpEvent);

			result.should.be.deep.equal({
				statusCode: 400,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': true
				},
				body: JSON.stringify({ message: 'Bad Request' })
			});
		});
	});

	// configure the test with FORBIDDEN response
	it('with FORBIDDEN response', async () => {
		// initialize the sample http event
		const sampleHttpEvent = httpEventGenerator(
			'PUT',
			{ languageCode: 'fr' },
			{ username: 'wrong_username' },
			false,
			false,
			{ username: 'dumb_username' }
		);

		// retrieve the result of the handler
		const result = await resumeLangPUT(sampleHttpEvent);

		result.should.be.deep.equal({
			statusCode: 403,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify({ message: 'Forbidden' })
		});
	});

	// configure the test with NOT FOUND response
	it('with NOT FOUND response', async () => {
		// initialize the sample http event
		const sampleHttpEvent = httpEventGenerator(
			'PUT',
			{ languageCode: 'fr' },
			{ username: 'wrong_username' },
			false,
			false,
			{ username: 'wrong_username' }
		);

		// retrieve the result of the handler
		const result = await resumeLangPUT(sampleHttpEvent);

		result.should.be.deep.equal({
			statusCode: 404,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify({ message: 'Not Found' })
		});
	});

	// configure the test with INTERNAL SERVER ERROR response
	it('with INTERNAL SERVER ERROR response', async () => {
		// reset the aws mock
		AWS.remock('DynamoDB.DocumentClient', 'get', (params, callback) => {
			// call the callback with error
			callback(new Error('dumb_error'));
		});

		// initialize the sample http event
		const sampleHttpEvent = httpEventGenerator(
			'PUT',
			{ languageCode: 'fr' },
			{ username: 'dumb_username' },
			false,
			false,
			{ username: 'dumb_username' }
		);

		// retrieve the result of the handler
		const result = await resumeLangPUT(sampleHttpEvent);

		result.should.be.deep.equal({
			statusCode: 500,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify({ message: 'Internal Server Error' })
		});
	});
});
