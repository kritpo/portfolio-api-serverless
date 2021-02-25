'use strict';

// import sinon
const sinon = require('sinon');

// import the tested function dependency
const checkResume = require('./utils/checkResume');

// retrieve the tested class
const Resume = require('./Resume');

// configure the test suite
describe('Resume', () => {
	let checkResumeStub;

	// setup the stub
	beforeEach(() => {
		// initialize the stub
		checkResumeStub = sinon.stub(checkResume);
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
			readStub.withArgs('user_good_username', 'resume_en').resolves({
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
			});
			readStub
				.withArgs('user_wrong_username', 'resume_en')
				.resolves(undefined);
		});

		// configure the test with right data
		it('with right data', async () => {
			// initialize the resume
			const resume = new Resume('good_username', 'en');

			// execute the function
			await resume.hydrate(readStub);

			resume.hydrated.should.be.equal(true);
			resume.basics.should.be.deep.equal({
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
			});
			resume.work.should.be.deep.equal([
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
			]);
			resume.volunteer.should.be.deep.equal([
				{
					organization: 'Organization',
					position: 'Volunteer',
					website: 'https://organization.fr/',
					startDate: '2019-01-01',
					endDate: '2020-01-01',
					summary: 'Description...',
					highlights: ["Organization's website"]
				}
			]);
			resume.education.should.be.deep.equal([
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
			]);
			resume.projects.should.be.deep.equal([
				{
					name: 'Project',
					summary: 'A single project to do everything!',
					startDate: '2018-09-01',
					endDate: '2020-07-01',
					picture: 'https://website.com/cproject-picture.jpg',
					url: 'https://github.com/john/cproject',
					technologies: ['Javascript']
				}
			]);
			resume.skills.should.be.deep.equal([
				{
					name: 'Javascript',
					level: 'Advanced'
				}
			]);
			resume.languages.should.be.deep.equal([
				{
					language: 'French',
					fluency: 'Advanced'
				}
			]);
			resume.interests.should.be.deep.equal([
				{
					name: 'Computer',
					keywords: ['Problem solving', 'Programming', 'Algorithmic']
				}
			]);
			resume.references.should.be.deep.equal([
				{
					name: 'Jane Doe',
					reference: 'Reference...'
				}
			]);
		});

		// configure the test with wrong data
		it('with wrong data', async () => {
			// initialize the resume
			const resume = new Resume('wrong_username', 'en');

			// execute the function
			await resume.hydrate(readStub);

			resume.hydrated.should.be.equal(false);
			should.not.exist(resume.basics);
			should.not.exist(resume.work);
			should.not.exist(resume.volunteer);
			should.not.exist(resume.education);
			should.not.exist(resume.projects);
			should.not.exist(resume.skills);
			should.not.exist(resume.languages);
			should.not.exist(resume.interests);
			should.not.exist(resume.references);
		});

		// configure the test with emulated db error
		it('with emulated db error', async () => {
			// try to execute the function
			try {
				// initialize the resume
				const resume = new Resume('dumb_username', 'en');

				// configure the stub
				readStub.rejects(new Error('dumb_error'));

				// execute the function
				await resume.hydrate(readStub);

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
		let resume;

		// setup the resume
		beforeEach(() => {
			// initialize the resume
			resume = new Resume('dumb_username', 'dumb_language_code');
		});

		// configure the tests of hydrated
		describe('hydrated', () => {
			// configure the test with get
			it('with get', () => {
				// execute the function
				const result = resume.hydrated;

				result.should.be.equal(false);
			});
		});

		// configure the tests of username
		describe('username', () => {
			// configure the test with get
			it('with get', () => {
				// execute the function
				const result = resume.username;

				result.should.be.equal('dumb_username');
			});
		});

		// configure the tests of language code
		describe('languageCode', () => {
			// configure the test with get
			it('with get', () => {
				// execute the function
				const result = resume.languageCode;

				result.should.be.equal('dumb_language_code');
			});
		});

		// configure the tests of basics
		describe('basics', () => {
			// configure the test with get
			it('with get', () => {
				// execute the function
				const result = resume.basics;

				should.not.exist(result);
			});

			// configure the test with set
			it('with set', () => {
				// execute the function
				resume.basics = {
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
				};
				const result = resume.basics;

				result.should.be.deep.equal({
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
				});
				checkResumeStub.checkBasics.should.have.been.calledWith({
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
				});
			});
		});

		// configure the tests of work
		describe('work', () => {
			// configure the test with get
			it('with get', () => {
				// execute the function
				const result = resume.work;

				should.not.exist(result);
			});

			// configure the test with set
			it('with set', () => {
				// execute the function
				resume.work = [
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
				];
				const result = resume.work;

				result.should.be.deep.equal([
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
				]);
				checkResumeStub.checkCareer.should.have.been.calledWith(
					[
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
					true
				);
			});
		});

		// configure the tests of volunteer
		describe('volunteer', () => {
			// configure the test with get
			it('with get', () => {
				// execute the function
				const result = resume.volunteer;

				should.not.exist(result);
			});

			// configure the test with set
			it('with set', () => {
				// execute the function
				resume.volunteer = [
					{
						organization: 'Organization',
						position: 'Volunteer',
						website: 'https://organization.fr/',
						startDate: '2019-01-01',
						endDate: '2020-01-01',
						summary: 'Description...',
						highlights: ["Organization's website"]
					}
				];
				const result = resume.volunteer;

				result.should.be.deep.equal([
					{
						organization: 'Organization',
						position: 'Volunteer',
						website: 'https://organization.fr/',
						startDate: '2019-01-01',
						endDate: '2020-01-01',
						summary: 'Description...',
						highlights: ["Organization's website"]
					}
				]);
				checkResumeStub.checkCareer.should.have.been.calledWith(
					[
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
					false
				);
			});
		});

		// configure the tests of education
		describe('education', () => {
			// configure the test with get
			it('with get', () => {
				// execute the function
				const result = resume.education;

				should.not.exist(result);
			});

			// configure the test with set
			it('with set', () => {
				// execute the function
				resume.education = [
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
				];
				const result = resume.education;

				result.should.be.deep.equal([
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
				]);
				checkResumeStub.checkEducation.should.have.been.calledWith([
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
				]);
			});
		});

		// configure the tests of projects
		describe('projects', () => {
			// configure the test with get
			it('with get', () => {
				// execute the function
				const result = resume.projects;

				should.not.exist(result);
			});

			// configure the test with set
			it('with set', () => {
				// execute the function
				resume.projects = [
					{
						name: 'Project',
						summary: 'A single project to do everything!',
						startDate: '2018-09-01',
						endDate: '2020-07-01',
						picture: 'https://website.com/cproject-picture.jpg',
						url: 'https://github.com/john/cproject',
						technologies: ['Javascript']
					}
				];
				const result = resume.projects;

				result.should.be.deep.equal([
					{
						name: 'Project',
						summary: 'A single project to do everything!',
						startDate: '2018-09-01',
						endDate: '2020-07-01',
						picture: 'https://website.com/cproject-picture.jpg',
						url: 'https://github.com/john/cproject',
						technologies: ['Javascript']
					}
				]);
				checkResumeStub.checkProjects.should.have.been.calledWith([
					{
						name: 'Project',
						summary: 'A single project to do everything!',
						startDate: '2018-09-01',
						endDate: '2020-07-01',
						picture: 'https://website.com/cproject-picture.jpg',
						url: 'https://github.com/john/cproject',
						technologies: ['Javascript']
					}
				]);
			});
		});

		// configure the tests of skills
		describe('skills', () => {
			// configure the test with get
			it('with get', () => {
				// execute the function
				const result = resume.skills;

				should.not.exist(result);
			});

			// configure the test with set
			it('with set', () => {
				// execute the function
				resume.skills = [
					{
						name: 'Javascript',
						level: 'Advanced'
					}
				];
				const result = resume.skills;

				result.should.be.deep.equal([
					{
						name: 'Javascript',
						level: 'Advanced'
					}
				]);
				checkResumeStub.checkSkills.should.have.been.calledWith(
					[
						{
							name: 'Javascript',
							level: 'Advanced'
						}
					],
					true
				);
			});
		});

		// configure the tests of languages
		describe('languages', () => {
			// configure the test with get
			it('with get', () => {
				// execute the function
				const result = resume.languages;

				should.not.exist(result);
			});

			// configure the test with set
			it('with set', () => {
				// execute the function
				resume.languages = [
					{
						language: 'French',
						fluency: 'Advanced'
					}
				];
				const result = resume.languages;

				result.should.be.deep.equal([
					{
						language: 'French',
						fluency: 'Advanced'
					}
				]);
				checkResumeStub.checkSkills.should.have.been.calledWith(
					[
						{
							language: 'French',
							fluency: 'Advanced'
						}
					],
					false
				);
			});
		});

		// configure the tests of interests
		describe('interests', () => {
			// configure the test with get
			it('with get', () => {
				// execute the function
				const result = resume.interests;

				should.not.exist(result);
			});

			// configure the test with set
			it('with set', () => {
				// execute the function
				resume.interests = [
					{
						name: 'Computer',
						keywords: [
							'Problem solving',
							'Programming',
							'Algorithmic'
						]
					}
				];
				const result = resume.interests;

				result.should.be.deep.equal([
					{
						name: 'Computer',
						keywords: [
							'Problem solving',
							'Programming',
							'Algorithmic'
						]
					}
				]);
				checkResumeStub.checkInterests.should.have.been.calledWith([
					{
						name: 'Computer',
						keywords: [
							'Problem solving',
							'Programming',
							'Algorithmic'
						]
					}
				]);
			});
		});

		// configure the tests of references
		describe('references', () => {
			// configure the test with get
			it('with get', () => {
				// execute the function
				const result = resume.references;

				should.not.exist(result);
			});

			// configure the test with set
			it('with set', () => {
				// execute the function
				resume.references = [
					{
						name: 'Jane Doe',
						reference: 'Reference...'
					}
				];
				const result = resume.references;

				result.should.be.deep.equal([
					{
						name: 'Jane Doe',
						reference: 'Reference...'
					}
				]);
				checkResumeStub.checkReferences.should.have.been.calledWith([
					{
						name: 'Jane Doe',
						reference: 'Reference...'
					}
				]);
			});
		});
	});
});
