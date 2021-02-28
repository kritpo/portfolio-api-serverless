'use strict';

// import aws-sdk-mock
const AWS = require('aws-sdk-mock');

// import the http event generator
const httpEventGenerator = require('../../utils/tests/httpEventGenerator');

// retrieve the tested handler
const resumeLangGET = require('./resumeLangGET');

// configure the test suite
describe('resumeLangGET', () => {
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
							language: 'english'
						},
						languages: [{ languageCode: 'en', language: 'english' }]
					}
				});
			} else {
				// otherwise call the callback with success empty response
				callback(null, {});
			}
		});
	});

	// reset the aws mock
	afterEach(() => AWS.restore());

	// configure the test with OK response
	it('with OK response', async () => {
		// initialize the sample http event
		const sampleHttpEvent = httpEventGenerator('GET', false, {
			username: 'good_username'
		});

		// retrieve the result of the handler
		const result = await resumeLangGET(sampleHttpEvent);

		result.should.be.deep.equal({
			statusCode: 200,
			headers: {
				'Access-Control-Allow-Origin': '*',
				'Access-Control-Allow-Credentials': true
			},
			body: JSON.stringify({
				username: 'good_username',
				defaultLanguage: { languageCode: 'en', language: 'english' },
				languages: [{ languageCode: 'en', language: 'english' }]
			})
		});
	});

	// configure the test with NOT FOUND response
	it('with NOT FOUND response', async () => {
		// initialize the sample http event
		const sampleHttpEvent = httpEventGenerator('GET', false, {
			username: 'wrong_username'
		});

		// retrieve the result of the handler
		const result = await resumeLangGET(sampleHttpEvent);

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
		const sampleHttpEvent = httpEventGenerator('GET', false, {
			username: 'dumb_username'
		});

		// retrieve the result of the handler
		const result = await resumeLangGET(sampleHttpEvent);

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
