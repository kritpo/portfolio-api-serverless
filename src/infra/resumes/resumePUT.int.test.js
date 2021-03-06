'use strict';

// import aws-sdk-mock
const AWS = require('aws-sdk-mock');

// import the http event generator
const httpEventGenerator = require('../../utils/tests/httpEventGenerator');

// retrieve the tested handler
const resumePUT = require('./resumePUT');

// configure the test suite
describe('resumePUT', () => {
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
									fluency: 'Advanced',
									countryCode: 'FR'
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
		AWS.mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
			// call the callback with success empty response
			callback(null, {});
		});
		AWS.mock('DynamoDB.DocumentClient', 'update', (params, callback) => {
			// call the callback with success empty response
			callback(null, {});
		});
	});

	// reset the aws mock
	afterEach(() => AWS.restore());

	// configure the tests with NO CONTENT response
	describe('with NO CONTENT response', () => {
		// configure the test with full update
		it('with full update', async () => {
			// initialize the sample http event
			const sampleHttpEvent = httpEventGenerator(
				'PUT',
				{
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
							company: 'Company',
							position: 'Programmer',
							website: 'https://company.com/',
							startDate: '2020-01-01',
							summary: 'Description...',
							highlights: []
						},
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
								},
								{
									category: 'Y2',
									courses: ['TS2001 - Programming']
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
							fluency: 'Advanced',
							countryCode: 'FR'
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
				},
				{ username: 'good_username' },
				false,
				false,
				{ username: 'good_username' }
			);

			// retrieve the result of the handler
			const result = await resumePUT(sampleHttpEvent);

			result.should.be.deep.equal({
				statusCode: 204,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': true
				},
				body: undefined
			});
		});

		// configure the test with partial update
		it('with partial update', async () => {
			// initialize the sample http event
			const sampleHttpEvent = httpEventGenerator(
				'PUT',
				{
					isPartial: true,
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
					}
				},
				{ username: 'good_username' },
				false,
				false,
				{ username: 'good_username' }
			);

			// retrieve the result of the handler
			const result = await resumePUT(sampleHttpEvent);

			result.should.be.deep.equal({
				statusCode: 204,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': true
				},
				body: undefined
			});
		});
	});

	// configure the tests with BAD REQUEST response
	describe('with BAD REQUEST response', () => {
		// configure the test with bad params
		it('with bad params', async () => {
			// initialize the sample http event
			const sampleHttpEvent = httpEventGenerator(
				'PUT',
				{
					languageCode: 'en'
				},
				false,
				false,
				false,
				{ username: 'dumb_username' }
			);

			// retrieve the result of the handler
			const result = await resumePUT(sampleHttpEvent);

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
				{
					languageCode: 'en'
				},
				{ username: 'good_username' },
				false,
				false,
				{ username: 'good_username' }
			);

			// retrieve the result of the handler
			const result = await resumePUT(sampleHttpEvent);

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
			{
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
						company: 'Company',
						position: 'Programmer',
						website: 'https://company.com/',
						startDate: '2020-01-01',
						summary: 'Description...',
						highlights: []
					},
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
							},
							{
								category: 'Y2',
								courses: ['TS2001 - Programming']
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
						fluency: 'Advanced',
						countryCode: 'FR'
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
			},
			{ username: 'wrong_username' },
			false,
			false,
			{ username: 'dumb_username' }
		);

		// retrieve the result of the handler
		const result = await resumePUT(sampleHttpEvent);

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
			{
				languageCode: 'fr',
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
						company: 'Company',
						position: 'Programmer',
						website: 'https://company.com/',
						startDate: '2020-01-01',
						summary: 'Description...',
						highlights: []
					},
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
							},
							{
								category: 'Y2',
								courses: ['TS2001 - Programming']
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
						fluency: 'Advanced',
						countryCode: 'FR'
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
			},
			{ username: 'good_username' },
			false,
			false,
			{ username: 'good_username' }
		);

		// retrieve the result of the handler
		const result = await resumePUT(sampleHttpEvent);

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
			{
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
						company: 'Company',
						position: 'Programmer',
						website: 'https://company.com/',
						startDate: '2020-01-01',
						summary: 'Description...',
						highlights: []
					},
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
							},
							{
								category: 'Y2',
								courses: ['TS2001 - Programming']
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
						fluency: 'Advanced',
						countryCode: 'FR'
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
			},
			{ username: 'dumb_username' },
			false,
			false,
			{ username: 'dumb_username' }
		);

		// retrieve the result of the handler
		const result = await resumePUT(sampleHttpEvent);

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
