'use strict';

// import aws-sdk-mock
const AWS = require('aws-sdk-mock');

// import the http event generator
const httpEventGenerator = require('../../utils/tests/httpEventGenerator');

// retrieve the tested handler
const resumesPOST = require('./resumesPOST');

// configure the test suite
describe('resumesPOST', () => {
	// setup the aws mock
	beforeEach(() => {
		// initialize the aws mock
		AWS.mock('DynamoDB.DocumentClient', 'get', (params, callback) => {
			// check if the PK is right
			if (
				params.Key.PK === 'user_good_username' &&
				params.Key.SK === 'resume'
			) {
				// call the callback with success response
				callback(null, {
					Item: {
						id1: 'user_good_username',
						filter: 'resume',
						defaultLanguage: {
							languageCode: 'fr',
							language: 'Français'
						},
						languages: [
							{
								languageCode: 'fr',
								language: 'Français'
							}
						]
					}
				});
			} else {
				// otherwise call the callback with success empty response
				callback(null, {});
			}
		});
		AWS.mock('DynamoDB.DocumentClient', 'put', (params, callback) => {
			// call the callback with success empty response
			callback(null, {});
		});
	});

	// reset the aws mock
	afterEach(() => AWS.restore());

	// configure the tests with CREATED response
	describe('with CREATED response', () => {
		// configure the test with existing resume languages container
		it('with existing resume languages container', async () => {
			// initialize the sample http event
			const sampleHttpEvent = httpEventGenerator(
				'POST',
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
				false,
				false,
				false,
				{
					username: 'good_username'
				}
			);

			// retrieve the result of the handler
			const result = await resumesPOST(sampleHttpEvent);

			result.should.be.deep.equal({
				statusCode: 201,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': true
				},
				body: undefined
			});
		});

		// configure the test with not existing resume languages container
		it('with not existing resume languages container', async () => {
			// initialize the sample http event
			const sampleHttpEvent = httpEventGenerator(
				'POST',
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
				false,
				false,
				false,
				{
					username: 'dumb_username'
				}
			);

			// retrieve the result of the handler
			const result = await resumesPOST(sampleHttpEvent);

			result.should.be.deep.equal({
				statusCode: 201,
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
				'POST',
				{
					languageCode: 'en'
				},
				false,
				false,
				false,
				{
					username: 'dumb_username'
				}
			);

			// retrieve the result of the handler
			const result = await resumesPOST(sampleHttpEvent);

			result.should.be.deep.equal({
				statusCode: 400,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': true
				},
				body: JSON.stringify({ message: 'Bad Request' })
			});
		});

		// configure the test with no language code
		it('with no language code', async () => {
			// initialize the sample http event
			const sampleHttpEvent = httpEventGenerator('POST', {});

			// retrieve the result of the handler
			const result = await resumesPOST(sampleHttpEvent);

			result.should.be.deep.equal({
				statusCode: 400,
				headers: {
					'Access-Control-Allow-Origin': '*',
					'Access-Control-Allow-Credentials': true
				},
				body: JSON.stringify({ message: 'Bad Request' })
			});
		});

		// configure the tests with bad language
		describe('with bad language', () => {
			// configure the test with existing resume languages container
			it('with existing resume languages container', async () => {
				// initialize the sample http event
				const sampleHttpEvent = httpEventGenerator(
					'POST',
					{
						languageCode: 'dumb_language_code',
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
					},
					false,
					false,
					false,
					{
						username: 'good_username'
					}
				);

				// retrieve the result of the handler
				const result = await resumesPOST(sampleHttpEvent);

				result.should.be.deep.equal({
					statusCode: 400,
					headers: {
						'Access-Control-Allow-Origin': '*',
						'Access-Control-Allow-Credentials': true
					},
					body: JSON.stringify({ message: 'Bad Request' })
				});
			});

			// configure the test with not existing resume languages container
			it('with not existing resume languages container', async () => {
				// initialize the sample http event
				const sampleHttpEvent = httpEventGenerator(
					'POST',
					{
						languageCode: 'dumb_language_code',
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
					},
					false,
					false,
					false,
					{
						username: 'dumb_username'
					}
				);

				// retrieve the result of the handler
				const result = await resumesPOST(sampleHttpEvent);

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
			'POST',
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
			false,
			false,
			false,
			{
				username: 'dumb_username'
			}
		);

		// retrieve the result of the handler
		const result = await resumesPOST(sampleHttpEvent);

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
