'use strict';

// import sinon
const sinon = require('sinon');

// import the tested function dependency
const checkRequiredParamType = require('../../utils/checkRequiredParamType');

// import the http event generator
const httpEventGenerator = require('../../utils/tests/httpEventGenerator');

// retrieve the tested function
const httpRequestDecode = require('./httpRequestDecode');

// configure the test suite
describe('httpRequestDecode', () => {
	let checkReqParamStub;
	let debugStub;
	let sampleHttpEvent;

	// setup the tests variables
	beforeEach(() => {
		// initialize the stubs
		checkReqParamStub = sinon.stub(
			checkRequiredParamType,
			'checkRequiredParamType'
		);
		debugStub = sinon.stub(console, 'debug');

		// initialize the sample http event
		sampleHttpEvent = httpEventGenerator(
			'GET',
			{ data: 42 },
			{ dumb_param: 42 },
			{ dumb_query: 42 },
			{ dumb_header: 42 },
			{
				username: 'dumb_username',
				email: 'dumb_email',
				phoneNumber: 'dumb_phone_number'
			},
			'dumb_ip'
		);
	});

	// reset the stub
	afterEach(() => sinon.restore());

	// configure the tests with user
	describe('with user', () => {
		// configure the test with sample set
		it('with sample set', () => {
			// execute the function
			const result = httpRequestDecode(sampleHttpEvent, true, true, true);

			result.should.be.deep.equal({
				method: 'GET',
				body: { data: 42 },
				ipAddress: 'dumb_ip',
				params: { dumb_param: 42 },
				queries: { dumb_query: 42 },
				headers: { dumb_header: 42 },
				user: {
					username: 'dumb_username',
					email: 'dumb_email',
					phoneNumber: 'dumb_phone_number'
				}
			});
			checkReqParamStub.should.have.been.calledWith(
				sampleHttpEvent,
				'object',
				'event',
				'http-io(request-decode)'
			);
			checkReqParamStub.should.have.been.calledWith(
				true,
				'boolean',
				'includeParams',
				'http-io(request-decode)'
			);
			checkReqParamStub.should.have.been.calledWith(
				true,
				'boolean',
				'includeQueries',
				'http-io(request-decode)'
			);
			checkReqParamStub.should.have.been.calledWith(
				true,
				'boolean',
				'includeHeaders',
				'http-io(request-decode)'
			);
			debugStub.should.have.been.calledWith({
				method: 'GET',
				body: { data: 42 },
				ipAddress: 'dumb_ip',
				params: { dumb_param: 42 },
				queries: { dumb_query: 42 },
				headers: { dumb_header: 42 },
				user: {
					username: 'dumb_username',
					email: 'dumb_email',
					phoneNumber: 'dumb_phone_number'
				}
			});
		});

		// configure the test with minimum params
		it('with minimum params', () => {
			// execute the function
			const result = httpRequestDecode(sampleHttpEvent);

			result.should.be.deep.equal({
				method: 'GET',
				body: { data: 42 },
				ipAddress: 'dumb_ip',
				user: {
					username: 'dumb_username',
					email: 'dumb_email',
					phoneNumber: 'dumb_phone_number'
				}
			});
			checkReqParamStub.should.have.been.calledWith(
				sampleHttpEvent,
				'object',
				'event',
				'http-io(request-decode)'
			);
			checkReqParamStub.should.have.been.calledWith(
				false,
				'boolean',
				'includeParams',
				'http-io(request-decode)'
			);
			checkReqParamStub.should.have.been.calledWith(
				false,
				'boolean',
				'includeQueries',
				'http-io(request-decode)'
			);
			checkReqParamStub.should.have.been.calledWith(
				false,
				'boolean',
				'includeHeaders',
				'http-io(request-decode)'
			);
			debugStub.should.have.been.calledWith({
				method: 'GET',
				body: { data: 42 },
				ipAddress: 'dumb_ip',
				user: {
					username: 'dumb_username',
					email: 'dumb_email',
					phoneNumber: 'dumb_phone_number'
				}
			});
		});
	});

	// configure the tests with no user
	describe('with no user', () => {
		// configure the test with sample set
		it('with sample set', () => {
			// remove the authorizer from the sample http event
			delete sampleHttpEvent.requestContext.authorizer;

			// execute the function
			const result = httpRequestDecode(sampleHttpEvent, true, true, true);

			result.should.be.deep.equal({
				method: 'GET',
				body: { data: 42 },
				ipAddress: 'dumb_ip',
				params: { dumb_param: 42 },
				queries: { dumb_query: 42 },
				headers: { dumb_header: 42 }
			});
			checkReqParamStub.should.have.been.calledWith(
				sampleHttpEvent,
				'object',
				'event',
				'http-io(request-decode)'
			);
			checkReqParamStub.should.have.been.calledWith(
				true,
				'boolean',
				'includeParams',
				'http-io(request-decode)'
			);
			checkReqParamStub.should.have.been.calledWith(
				true,
				'boolean',
				'includeQueries',
				'http-io(request-decode)'
			);
			checkReqParamStub.should.have.been.calledWith(
				true,
				'boolean',
				'includeHeaders',
				'http-io(request-decode)'
			);
			debugStub.should.have.been.calledWith({
				method: 'GET',
				body: { data: 42 },
				ipAddress: 'dumb_ip',
				params: { dumb_param: 42 },
				queries: { dumb_query: 42 },
				headers: { dumb_header: 42 }
			});
		});

		// configure the test with minimum params
		it('with minimum params', () => {
			// remove the authorizer from the sample http event
			delete sampleHttpEvent.requestContext.authorizer;

			// execute the function
			const result = httpRequestDecode(sampleHttpEvent);

			result.should.be.deep.equal({
				method: 'GET',
				body: { data: 42 },
				ipAddress: 'dumb_ip'
			});
			checkReqParamStub.should.have.been.calledWith(
				sampleHttpEvent,
				'object',
				'event',
				'http-io(request-decode)'
			);
			checkReqParamStub.should.have.been.calledWith(
				false,
				'boolean',
				'includeParams',
				'http-io(request-decode)'
			);
			checkReqParamStub.should.have.been.calledWith(
				false,
				'boolean',
				'includeQueries',
				'http-io(request-decode)'
			);
			checkReqParamStub.should.have.been.calledWith(
				false,
				'boolean',
				'includeHeaders',
				'http-io(request-decode)'
			);
			debugStub.should.have.been.calledWith({
				method: 'GET',
				body: { data: 42 },
				ipAddress: 'dumb_ip'
			});
		});
	});

	// configure the tests with no data
	it('with no data', () => {
		// reset the sample http event
		sampleHttpEvent = httpEventGenerator('GET');

		// reset the authorizer of the sample http event
		sampleHttpEvent.requestContext.authorizer = { claims: {} };

		// execute the function
		const result = httpRequestDecode(sampleHttpEvent, true, true, true);

		result.should.be.deep.equal({
			method: 'GET',
			body: null,
			ipAddress: '127.0.0.1',
			params: {},
			queries: {},
			headers: {},
			user: {
				username: undefined,
				email: undefined,
				phoneNumber: undefined
			}
		});
		checkReqParamStub.should.have.been.calledWith(
			sampleHttpEvent,
			'object',
			'event',
			'http-io(request-decode)'
		);
		checkReqParamStub.should.have.been.calledWith(
			true,
			'boolean',
			'includeParams',
			'http-io(request-decode)'
		);
		checkReqParamStub.should.have.been.calledWith(
			true,
			'boolean',
			'includeQueries',
			'http-io(request-decode)'
		);
		checkReqParamStub.should.have.been.calledWith(
			true,
			'boolean',
			'includeHeaders',
			'http-io(request-decode)'
		);
		debugStub.should.have.been.calledWith({
			method: 'GET',
			body: null,
			ipAddress: '127.0.0.1',
			params: {},
			queries: {},
			headers: {},
			user: {
				username: undefined,
				email: undefined,
				phoneNumber: undefined
			}
		});
	});
});
