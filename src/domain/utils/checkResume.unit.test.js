'use strict';

// import sinon
const sinon = require('sinon');

// import the tested function dependencies
const checkRequiredParamType = require('../../utils/checkRequiredParamType');
const checkParamType = require('../../utils/checkParamType');
const checkParamFormat = require('../../utils/checkParamFormat');

// retrieve the tested module
const checkResume = require('./checkResume');

// configure the test suite
describe('checkResume', () => {
	let checkReqParamTypeStub;
	let checkParamTypeStub;
	let checkParamFormatStub;

	// setup the stubs
	beforeEach(() => {
		// initialize the stubs
		checkReqParamTypeStub = sinon.stub(
			checkRequiredParamType,
			'checkRequiredParamType'
		);
		checkParamTypeStub = sinon.stub(checkParamType, 'checkParamType');
		checkParamFormatStub = sinon.stub(checkParamFormat, 'checkParamFormat');
	});

	// reset the stubs
	afterEach(() => sinon.restore());

	// configure the tests of basics check
	describe('basics', () => {
		// configure the test with sample set
		it('with sample set', () => {
			// execute the function
			checkResume.checkBasics({
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

			checkReqParamTypeStub.should.have.been.calledWith(
				{
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
				'object',
				'basics',
				'check-resume(basics)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'John DOE',
				'string',
				'basics.name',
				'check-resume(basics)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'Programmer',
				'string',
				'basics.label',
				'check-resume(basics)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'https://website.com/picture.jpg',
				'string',
				'basics.picture',
				'check-resume(basics)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'john@gmail.com',
				'string',
				'basics.email',
				'check-resume(basics)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'(912) 555-4321',
				'string',
				'basics.phone',
				'check-resume(basics)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'http://johndoe.com',
				'string',
				'basics.website',
				'check-resume(basics)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'A summary of John Doe...',
				'string',
				'basics.summary',
				'check-resume(basics)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				{
					address: '2712 Broadway St',
					postalCode: 'CA 94115',
					city: 'San Francisco',
					countryCode: 'US',
					region: 'California'
				},
				'object',
				'basics.location',
				'check-resume(basics)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'2712 Broadway St',
				'string',
				'basics.location.address',
				'check-resume(basics)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'CA 94115',
				'string',
				'basics.location.postalCode',
				'check-resume(basics)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'San Francisco',
				'string',
				'basics.location.city',
				'check-resume(basics)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'US',
				'string',
				'basics.location.countryCode',
				'check-resume(basics)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'California',
				'string',
				'basics.location.region',
				'check-resume(basics)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				[
					{
						network: 'Twitter',
						username: 'john',
						url: 'http://twitter.com/john'
					}
				],
				'object',
				'basics.profiles',
				'check-resume(basics)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'Twitter',
				'string',
				'profile.network',
				'check-resume(basics)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'john',
				'string',
				'profile.username',
				'check-resume(basics)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'http://twitter.com/john',
				'string',
				'profile.url',
				'check-resume(basics)'
			);
			checkParamFormatStub.should.have.been.calledWith(
				'john@gmail.com',
				/^[a-z0-9\.\-\_]+@[a-z0-9\.\-\_]+\.[a-z0-9]{2,}$/,
				'basics.email',
				'check-resume(basics)'
			);
		});
	});

	// configure the tests of career check
	describe('career', () => {
		// configure the test with work sample set
		it('with work sample set', () => {
			// execute the function
			checkResume.checkCareer(
				[
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

			checkReqParamTypeStub.should.have.been.calledWith(
				[
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
				'object',
				'career',
				'check-resume(career)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'Company',
				'string',
				'experience.company',
				'check-resume(career)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'Programmer',
				'string',
				'experience.position',
				'check-resume(career)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'https://company.com/',
				'string',
				'experience.website',
				'check-resume(career)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'2019-01-01',
				'string',
				'experience.startDate',
				'check-resume(career)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'Description...',
				'string',
				'experience.summary',
				'check-resume(career)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				['CProject'],
				'object',
				'experience.highlights',
				'check-resume(career)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'CProject',
				'string',
				'highlight',
				'check-resume(career)'
			);
			checkParamTypeStub.should.have.been.calledWith(
				true,
				'boolean',
				'experience.isInternship',
				'check-resume(career)'
			);
			checkParamTypeStub.should.have.been.calledWith(
				'2020-01-01',
				'string',
				'experience.endDate',
				'check-resume(career)'
			);
			checkParamFormatStub.should.have.been.calledWith(
				'2019-01-01',
				checkResume.DATE_REGEX,
				'experience.startDate',
				'check-resume(career)'
			);
			checkParamFormatStub.should.have.been.calledWith(
				'2020-01-01',
				checkResume.DATE_REGEX,
				'experience.endDate',
				'check-resume(career)'
			);
		});

		// configure the test with volunteer sample set
		it('with volunteer sample set', () => {
			// execute the function
			checkResume.checkCareer(
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

			checkReqParamTypeStub.should.have.been.calledWith(
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
				'object',
				'career',
				'check-resume(career)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'Organization',
				'string',
				'experience.organization',
				'check-resume(career)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'Volunteer',
				'string',
				'experience.position',
				'check-resume(career)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'https://organization.fr/',
				'string',
				'experience.website',
				'check-resume(career)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'2019-01-01',
				'string',
				'experience.startDate',
				'check-resume(career)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'Description...',
				'string',
				'experience.summary',
				'check-resume(career)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				["Organization's website"],
				'object',
				'experience.highlights',
				'check-resume(career)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				"Organization's website",
				'string',
				'highlight',
				'check-resume(career)'
			);
			checkParamTypeStub.should.have.been.calledWith(
				'2020-01-01',
				'string',
				'experience.endDate',
				'check-resume(career)'
			);
			checkParamFormatStub.should.have.been.calledWith(
				'2019-01-01',
				checkResume.DATE_REGEX,
				'experience.startDate',
				'check-resume(career)'
			);
			checkParamFormatStub.should.have.been.calledWith(
				'2020-01-01',
				checkResume.DATE_REGEX,
				'experience.endDate',
				'check-resume(career)'
			);
		});
	});

	// configure the tests of education check
	describe('education', () => {
		// configure the test with sample set
		it('with sample set', () => {
			// execute the function
			checkResume.checkEducation([
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

			checkReqParamTypeStub.should.have.been.calledWith(
				[
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
				'object',
				'education',
				'check-resume(education)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'School',
				'string',
				'entry.institution',
				'check-resume(education)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'Computer Science',
				'string',
				'entry.area',
				'check-resume(education)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'Engineering Studies',
				'string',
				'entry.studyType',
				'check-resume(education)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'2018-09-01',
				'string',
				'entry.startDate',
				'check-resume(education)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'4',
				'string',
				'entry.gpa',
				'check-resume(education)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				[
					{
						category: 'Y1',
						courses: ['TS1001 - Algorithmic']
					}
				],
				'object',
				'entry.courses',
				'check-resume(education)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'Y1',
				'string',
				'course.category',
				'check-resume(education)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				['TS1001 - Algorithmic'],
				'object',
				'course.courses',
				'check-resume(education)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'TS1001 - Algorithmic',
				'string',
				'courseTitle',
				'check-resume(education)'
			);
			checkParamTypeStub.should.have.been.calledWith(
				'2020-07-01',
				'string',
				'entry.endDate',
				'check-resume(education)'
			);
			checkParamFormatStub.should.have.been.calledWith(
				'2018-09-01',
				checkResume.DATE_REGEX,
				'entry.startDate',
				'check-resume(education)'
			);
			checkParamFormatStub.should.have.been.calledWith(
				'2020-07-01',
				checkResume.DATE_REGEX,
				'entry.endDate',
				'check-resume(education)'
			);
		});
	});

	// configure the tests of projects check
	describe('projects', () => {
		// configure the test with sample set
		it('with sample set', () => {
			// execute the function
			checkResume.checkProjects([
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

			checkReqParamTypeStub.should.have.been.calledWith(
				[
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
				'object',
				'projects',
				'check-resume(projects)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'Project',
				'string',
				'project.name',
				'check-resume(projects)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'A single project to do everything!',
				'string',
				'project.summary',
				'check-resume(projects)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'2018-09-01',
				'string',
				'project.startDate',
				'check-resume(projects)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'https://website.com/cproject-picture.jpg',
				'string',
				'project.picture',
				'check-resume(projects)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'https://github.com/john/cproject',
				'string',
				'project.url',
				'check-resume(projects)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				['Javascript'],
				'object',
				'project.technologies',
				'check-resume(projects)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'Javascript',
				'string',
				'technology',
				'check-resume(projects)'
			);
			checkParamTypeStub.should.have.been.calledWith(
				'2020-07-01',
				'string',
				'project.endDate',
				'check-resume(projects)'
			);
			checkParamFormatStub.should.have.been.calledWith(
				'2018-09-01',
				checkResume.DATE_REGEX,
				'project.startDate',
				'check-resume(projects)'
			);
			checkParamFormatStub.should.have.been.calledWith(
				'2020-07-01',
				checkResume.DATE_REGEX,
				'project.endDate',
				'check-resume(projects)'
			);
		});
	});

	// configure the tests of skills check
	describe('skills', () => {
		// configure the test with pure skills sample set
		it('with pure skills sample set', () => {
			// execute the function
			checkResume.checkSkills(
				[
					{
						name: 'Javascript',
						level: 'Advanced'
					}
				],
				true
			);

			checkReqParamTypeStub.should.have.been.calledWith(
				[
					{
						name: 'Javascript',
						level: 'Advanced'
					}
				],
				'object',
				'skills',
				'check-resume(skills)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'Javascript',
				'string',
				'skill.name'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'Advanced',
				'string',
				'skill.level',
				'check-resume(skills)'
			);
		});

		// configure the test with languages sample set
		it('with languages sample set', () => {
			// execute the function
			checkResume.checkSkills(
				[
					{
						language: 'French',
						fluency: 'Advanced'
					}
				],
				false
			);

			checkReqParamTypeStub.should.have.been.calledWith(
				[
					{
						language: 'French',
						fluency: 'Advanced'
					}
				],
				'object',
				'skills',
				'check-resume(skills)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'French',
				'string',
				'skill.language'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'Advanced',
				'string',
				'skill.fluency',
				'check-resume(skills)'
			);
		});
	});

	// configure the tests of interests check
	describe('interests', () => {
		// configure the test with sample set
		it('with sample set', () => {
			// execute the function
			checkResume.checkInterests([
				{
					name: 'Computer',
					keywords: ['Problem solving']
				}
			]);

			checkReqParamTypeStub.should.have.been.calledWith(
				[
					{
						name: 'Computer',
						keywords: ['Problem solving']
					}
				],
				'object',
				'interests',
				'check-resume(interests)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'Computer',
				'string',
				'interest.name',
				'check-resume(interests)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				['Problem solving'],
				'object',
				'interest.keywords',
				'check-resume(interests)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'Problem solving',
				'string',
				'keyword',
				'check-resume(interests)'
			);
		});
	});

	// configure the tests of references check
	describe('references', () => {
		// configure the test with sample set
		it('with sample set', () => {
			// execute the function
			checkResume.checkReferences([
				{
					name: 'Jane Doe',
					reference: 'Reference...'
				}
			]);

			checkReqParamTypeStub.should.have.been.calledWith(
				[
					{
						name: 'Jane Doe',
						reference: 'Reference...'
					}
				],
				'object',
				'references',
				'check-resume(references)'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'Jane Doe',
				'string',
				'reference.name'
			);
			checkReqParamTypeStub.should.have.been.calledWith(
				'Reference...',
				'string',
				'reference.reference',
				'check-resume(references)'
			);
		});
	});
});
