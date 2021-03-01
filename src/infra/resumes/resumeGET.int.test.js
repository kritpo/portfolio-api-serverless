'use strict';

// import aws-sdk-mock
const AWS = require('aws-sdk-mock');

// import the http event generator
const httpEventGenerator = require('../../utils/tests/httpEventGenerator');

// retrieve the tested handler
const resumeGET = require('./resumeGET');

// configure the test suite
describe('resumeGET', () => {
	// setup the aws mock
	beforeEach(() => {
		// initialize the aws mock
		AWS.mock('DynamoDB.DocumentClient', 'get', (params, callback) => {
			// check if the PK is right
			if (params.Key.PK === 'user_good_username') {
				// check if the SK is right for resume languages
				if (params.Key.SK === 'resume') {
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
								{ languageCode: 'en', language: 'English' }
							]
						}
					});
				}
				// check if the SK is right for resume
				else if (params.Key.SK === 'resume_en') {
					// call the callback with success response
					callback(null, {
						Item: {
							id1: 'user_good_username',
							filter: 'resume_en',
							basics: {
								name: 'John DOE',
								label: 'Programmer',
								picture: 'https://website.com/picture.jpg',
								email: 'john@gmail.com',
								phone: '(912) 555-4321',
								website: 'http://johndoe.com',
								summary: 'A summary of John Doe...',
								location: {
									address: '2712 Broadway St',
									postalCode: 'CA 94115',
									city: 'San Francisco',
									countryCode: 'US',
									region: 'California'
								},
								profiles: [
									{
										network: 'Twitter',
										username: 'john',
										url: 'http://twitter.com/john'
									}
								]
							},
							work: [
								{
									isInternship: true,
									company: 'Company',
									position: 'Programmer',
									website: 'https://company.com/',
									startDate: '2019-01-01',
									endDate: '2020-01-01',
									summary: 'Description...',
									highlights: ['CProject']
								}
							],
							volunteer: [
								{
									organization: 'Organization',
									position: 'Volunteer',
									website: 'https://organization.fr/',
									startDate: '2019-01-01',
									endDate: '2020-01-01',
									summary: 'Description...',
									highlights: ["Organization's website"]
								}
							],
							education: [
								{
									institution: 'School',
									area: 'Computer Science',
									studyType: 'Engineering Studies',
									startDate: '2018-09-01',
									endDate: '2020-07-01',
									gpa: '4',
									courses: [
										{
											category: 'Y1',
											courses: ['TS1001 - Algorithmic']
										}
									]
								}
							],
							projects: [
								{
									name: 'Project',
									summary:
										'A single project to do everything!',
									startDate: '2018-09-01',
									endDate: '2020-07-01',
									picture:
										'https://website.com/cproject-picture.jpg',
									url: 'https://github.com/john/cproject',
									technologies: ['Javascript']
								}
							],
							skills: [
								{
									name: 'Javascript',
									level: 'Advanced'
								}
							],
							languages: [
								{
									language: 'French',
									fluency: 'Advanced'
								}
							],
							interests: [
								{
									name: 'Computer',
									keywords: [
										'Problem solving',
										'Programming',
										'Algorithmic'
									]
								}
							],
							references: [
								{
									name: 'Jane Doe',
									reference: 'Reference...'
								}
							]
						}
					});
				} else {
					// otherwise call the callback with success empty response
					callback(null, {});
				}
			} else {
				// otherwise call the callback with success empty response
				callback(null, {});
			}
		});
	});

	// reset the aws mock
	afterEach(() => AWS.restore());

	// configure the tests with OK response
	describe('with OK response', () => {
		// configure the test with language query
		it('with language query', async () => {
			// initialize the sample http event
			const sampleHttpEvent = httpEventGenerator(
				'GET',
				false,
				{ username: 'good_username' },
				{ languageCode: 'en' }
			);

			// retrieve the result of the handler
			const result = await resumeGET(sampleHttpEvent);

			result.should.be.deep.equal({
				statusCode: 200,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': true
				},
				body: JSON.stringify({
					username: 'good_username',
					languageCode: 'en',
					basics: {
						name: 'John DOE',
						label: 'Programmer',
						picture: 'https://website.com/picture.jpg',
						email: 'john@gmail.com',
						phone: '(912) 555-4321',
						website: 'http://johndoe.com',
						summary: 'A summary of John Doe...',
						location: {
							address: '2712 Broadway St',
							postalCode: 'CA 94115',
							city: 'San Francisco',
							countryCode: 'US',
							region: 'California'
						},
						profiles: [
							{
								network: 'Twitter',
								username: 'john',
								url: 'http://twitter.com/john'
							}
						]
					},
					work: [
						{
							isInternship: true,
							company: 'Company',
							position: 'Programmer',
							website: 'https://company.com/',
							startDate: '2019-01-01',
							endDate: '2020-01-01',
							summary: 'Description...',
							highlights: ['CProject']
						}
					],
					volunteer: [
						{
							organization: 'Organization',
							position: 'Volunteer',
							website: 'https://organization.fr/',
							startDate: '2019-01-01',
							endDate: '2020-01-01',
							summary: 'Description...',
							highlights: ["Organization's website"]
						}
					],
					education: [
						{
							institution: 'School',
							area: 'Computer Science',
							studyType: 'Engineering Studies',
							startDate: '2018-09-01',
							endDate: '2020-07-01',
							gpa: '4',
							courses: [
								{
									category: 'Y1',
									courses: ['TS1001 - Algorithmic']
								}
							]
						}
					],
					projects: [
						{
							name: 'Project',
							summary: 'A single project to do everything!',
							startDate: '2018-09-01',
							endDate: '2020-07-01',
							picture: 'https://website.com/cproject-picture.jpg',
							url: 'https://github.com/john/cproject',
							technologies: ['Javascript']
						}
					],
					skills: [
						{
							name: 'Javascript',
							level: 'Advanced'
						}
					],
					languages: [
						{
							language: 'French',
							fluency: 'Advanced'
						}
					],
					interests: [
						{
							name: 'Computer',
							keywords: [
								'Problem solving',
								'Programming',
								'Algorithmic'
							]
						}
					],
					references: [
						{
							name: 'Jane Doe',
							reference: 'Reference...'
						}
					]
				})
			});
		});

		// configure the test with no queries
		it('with no queries', async () => {
			// initialize the sample http event
			const sampleHttpEvent = httpEventGenerator('GET', false, {
				username: 'good_username'
			});

			// retrieve the result of the handler
			const result = await resumeGET(sampleHttpEvent);

			result.should.be.deep.equal({
				statusCode: 200,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': true
				},
				body: JSON.stringify({
					username: 'good_username',
					languageCode: 'en',
					basics: {
						name: 'John DOE',
						label: 'Programmer',
						picture: 'https://website.com/picture.jpg',
						email: 'john@gmail.com',
						phone: '(912) 555-4321',
						website: 'http://johndoe.com',
						summary: 'A summary of John Doe...',
						location: {
							address: '2712 Broadway St',
							postalCode: 'CA 94115',
							city: 'San Francisco',
							countryCode: 'US',
							region: 'California'
						},
						profiles: [
							{
								network: 'Twitter',
								username: 'john',
								url: 'http://twitter.com/john'
							}
						]
					},
					work: [
						{
							isInternship: true,
							company: 'Company',
							position: 'Programmer',
							website: 'https://company.com/',
							startDate: '2019-01-01',
							endDate: '2020-01-01',
							summary: 'Description...',
							highlights: ['CProject']
						}
					],
					volunteer: [
						{
							organization: 'Organization',
							position: 'Volunteer',
							website: 'https://organization.fr/',
							startDate: '2019-01-01',
							endDate: '2020-01-01',
							summary: 'Description...',
							highlights: ["Organization's website"]
						}
					],
					education: [
						{
							institution: 'School',
							area: 'Computer Science',
							studyType: 'Engineering Studies',
							startDate: '2018-09-01',
							endDate: '2020-07-01',
							gpa: '4',
							courses: [
								{
									category: 'Y1',
									courses: ['TS1001 - Algorithmic']
								}
							]
						}
					],
					projects: [
						{
							name: 'Project',
							summary: 'A single project to do everything!',
							startDate: '2018-09-01',
							endDate: '2020-07-01',
							picture: 'https://website.com/cproject-picture.jpg',
							url: 'https://github.com/john/cproject',
							technologies: ['Javascript']
						}
					],
					skills: [
						{
							name: 'Javascript',
							level: 'Advanced'
						}
					],
					languages: [
						{
							language: 'French',
							fluency: 'Advanced'
						}
					],
					interests: [
						{
							name: 'Computer',
							keywords: [
								'Problem solving',
								'Programming',
								'Algorithmic'
							]
						}
					],
					references: [
						{
							name: 'Jane Doe',
							reference: 'Reference...'
						}
					]
				})
			});
		});
	});

	// configure the tests with NOT FOUND response
	describe('with NOT FOUND response', () => {
		// configure the test with inexistant user
		it('with inexistant user', async () => {
			// initialize the sample http event
			const sampleHttpEvent = httpEventGenerator('GET', false, {
				username: 'wrong_username'
			});

			// retrieve the result of the handler
			const result = await resumeGET(sampleHttpEvent);

			result.should.be.deep.equal({
				statusCode: 404,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': true
				},
				body: JSON.stringify({ message: 'Not Found' })
			});
		});

		// configure the tests with inexistant default language
		describe('with inexistant default language', () => {
			// configure the test with language query
			it('with language query', async () => {
				// reset the aws mock
				AWS.remock(
					'DynamoDB.DocumentClient',
					'get',
					(params, callback) => {
						// check if the SK is right for resume languages
						if (params.Key.SK === 'resume') {
							// call the callback with success response
							callback(null, {
								Item: {
									id1: 'user_dumb_username',
									filter: 'resume',
									defaultLanguage: {
										languageCode: 'en',
										language: 'English'
									},
									languages: [
										{
											languageCode: 'en',
											language: 'English'
										}
									]
								}
							});
						} else {
							// otherwise call the callback with success empty response
							callback(null, {});
						}
					}
				);

				// initialize the sample http event
				const sampleHttpEvent = httpEventGenerator(
					'GET',
					false,
					{ username: 'dumb_username' },
					{ languageCode: 'dumb_language_code' }
				);

				// retrieve the result of the handler
				const result = await resumeGET(sampleHttpEvent);

				result.should.be.deep.equal({
					statusCode: 404,
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Credentials': true
					},
					body: JSON.stringify({ message: 'Not Found' })
				});
			});

			// configure the test with no queries
			it('with no queries', async () => {
				// reset the aws mock
				AWS.remock(
					'DynamoDB.DocumentClient',
					'get',
					(params, callback) => {
						// check if the SK is right for resume languages
						if (params.Key.SK === 'resume') {
							// call the callback with success response
							callback(null, {
								Item: {
									id1: 'user_dumb_username',
									filter: 'resume',
									defaultLanguage: {
										languageCode: 'en',
										language: 'English'
									},
									languages: [
										{
											languageCode: 'en',
											language: 'English'
										}
									]
								}
							});
						} else {
							// otherwise call the callback with success empty response
							callback(null, {});
						}
					}
				);

				// initialize the sample http event
				const sampleHttpEvent = httpEventGenerator('GET', false, {
					username: 'dumb_username'
				});

				// retrieve the result of the handler
				const result = await resumeGET(sampleHttpEvent);

				result.should.be.deep.equal({
					statusCode: 404,
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Credentials': true
					},
					body: JSON.stringify({ message: 'Not Found' })
				});
			});
		});
	});

	// configure the tests with INTERNAL SERVER ERROR response
	describe('with INTERNAL SERVER ERROR response', () => {
		// configure the test with language query
		it('with language query', async () => {
			// reset the aws mock
			AWS.remock('DynamoDB.DocumentClient', 'get', (params, callback) => {
				// call the callback with error
				callback(new Error('dumb_error'));
			});

			// initialize the sample http event
			const sampleHttpEvent = httpEventGenerator(
				'GET',
				false,
				{ username: 'dumb_username' },
				{ languageCode: 'dumb_language_code' }
			);

			// retrieve the result of the handler
			const result = await resumeGET(sampleHttpEvent);

			result.should.be.deep.equal({
				statusCode: 500,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': true
				},
				body: JSON.stringify({ message: 'Internal Server Error' })
			});
		});

		// configure the test with no queries
		it('with no queries', async () => {
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
			const result = await resumeGET(sampleHttpEvent);

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
});
