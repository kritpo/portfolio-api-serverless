'use strict';

// retrieve the tested function
const httpEventGenerator = require('./httpEventGenerator');

// configure the test suite
describe('checkParamType', () => {
	// configure the test with sample set
	it('with sample set', () => {
		// execute the function
		const result = httpEventGenerator(
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

		result.should.be.deep.equal({
			resource: '',
			path: '',
			httpMethod: 'GET',
			headers: { dumb_header: 42 },
			multiValueHeaders: null,
			queryStringParameters: { dumb_query: 42 },
			multiValueQueryStringParameters: null,
			pathParameters: { dumb_param: 42 },
			stageVariables: null,
			requestContext: {
				resourceId: '',
				authorizer: {
					claims: {
						at_hash: '',
						sub: '',
						email_verified: 'true',
						iss: '',
						phone_number_verified: 'true',
						'cognito:username': 'dumb_username',
						aud: '',
						event_id: '',
						token_use: '',
						auth_time: '',
						phone_number: 'dumb_phone_number',
						exp: '',
						iat: '',
						email: 'dumb_email'
					}
				},
				resourcePath: '',
				httpMethod: 'GET',
				extendedRequestId: '',
				requestTime: '',
				path: '',
				accountId: '',
				protocol: '',
				stage: '',
				domainPrefix: '',
				requestTimeEpoch: 42,
				requestId: '',
				identity: {
					cognitoIdentityPoolId: null,
					accountId: null,
					cognitoIdentityId: null,
					caller: null,
					sourceIp: 'dumb_ip',
					principalOrgId: null,
					accessKey: null,
					cognitoAuthenticationType: null,
					cognitoAuthenticationProvider: null,
					userArn: null,
					userAgent: '',
					user: null
				},
				domainName: '',
				apiId: ''
			},
			body: '{"data":42}',
			isBase64Encoded: false
		});
	});

	// configure the test with malformed user
	it('with malformed user', () => {
		// execute the function
		const result = httpEventGenerator(
			'GET',
			{ data: 42 },
			{ dumb_param: 42 },
			{ dumb_query: 42 },
			{ dumb_header: 42 },
			{},
			'dumb_ip'
		);

		result.should.be.deep.equal({
			resource: '',
			path: '',
			httpMethod: 'GET',
			headers: { dumb_header: 42 },
			multiValueHeaders: null,
			queryStringParameters: { dumb_query: 42 },
			multiValueQueryStringParameters: null,
			pathParameters: { dumb_param: 42 },
			stageVariables: null,
			requestContext: {
				resourceId: '',
				authorizer: {
					claims: {
						at_hash: '',
						sub: '',
						email_verified: 'true',
						iss: '',
						phone_number_verified: 'true',
						'cognito:username': '',
						aud: '',
						event_id: '',
						token_use: '',
						auth_time: '',
						phone_number: '',
						exp: '',
						iat: '',
						email: ''
					}
				},
				resourcePath: '',
				httpMethod: 'GET',
				extendedRequestId: '',
				requestTime: '',
				path: '',
				accountId: '',
				protocol: '',
				stage: '',
				domainPrefix: '',
				requestTimeEpoch: 42,
				requestId: '',
				identity: {
					cognitoIdentityPoolId: null,
					accountId: null,
					cognitoIdentityId: null,
					caller: null,
					sourceIp: 'dumb_ip',
					principalOrgId: null,
					accessKey: null,
					cognitoAuthenticationType: null,
					cognitoAuthenticationProvider: null,
					userArn: null,
					userAgent: '',
					user: null
				},
				domainName: '',
				apiId: ''
			},
			body: '{"data":42}',
			isBase64Encoded: false
		});
	});

	// configure the test with minimum params
	it('with minimum params', () => {
		// execute the function
		const result = httpEventGenerator('GET');

		result.should.be.deep.equal({
			resource: '',
			path: '',
			httpMethod: 'GET',
			headers: null,
			multiValueHeaders: null,
			queryStringParameters: null,
			multiValueQueryStringParameters: null,
			pathParameters: null,
			stageVariables: null,
			requestContext: {
				resourceId: '',
				resourcePath: '',
				httpMethod: 'GET',
				extendedRequestId: '',
				requestTime: '',
				path: '',
				accountId: '',
				protocol: '',
				stage: '',
				domainPrefix: '',
				requestTimeEpoch: 42,
				requestId: '',
				identity: {
					cognitoIdentityPoolId: null,
					accountId: null,
					cognitoIdentityId: null,
					caller: null,
					sourceIp: '127.0.0.1',
					principalOrgId: null,
					accessKey: null,
					cognitoAuthenticationType: null,
					cognitoAuthenticationProvider: null,
					userArn: null,
					userAgent: '',
					user: null
				},
				domainName: '',
				apiId: ''
			},
			body: null,
			isBase64Encoded: false
		});
	});
});
