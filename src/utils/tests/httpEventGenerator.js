'use strict';

/**
 * http event generator
 * @param {string} httpMethod the request method
 * @param {object} body the request body
 * @param {object} params the request path params
 * @param {object} queries the request path queries
 * @param {object} headers the request headers
 * @param {object} user the identified user
 * @param {string} sourceIp the ip address
 */
const httpEventGenerator = (
	httpMethod,
	body = false,
	params = false,
	queries = false,
	headers = false,
	user = false,
	sourceIp = '127.0.0.1'
) => {
	// configure the sample api gateway request event
	const event = {
		resource: '',
		path: '',
		httpMethod,
		headers: headers || null,
		multiValueHeaders: null,
		queryStringParameters: queries || null,
		multiValueQueryStringParameters: null,
		pathParameters: params || null,
		stageVariables: null,
		requestContext: {
			resourceId: '',
			authorizer: user
				? {
						claims: {
							at_hash: '',
							sub: '',
							email_verified: 'true',
							iss: '',
							phone_number_verified: 'true',
							'cognito:username':
								user.username !== undefined
									? user.username
									: '',
							aud: '',
							event_id: '',
							token_use: '',
							auth_time: '',
							phone_number:
								user.phoneNumber !== undefined
									? user.phoneNumber
									: '',
							exp: '',
							iat: '',
							email: user.email !== undefined ? user.email : ''
						}
				  }
				: undefined,
			resourcePath: '',
			httpMethod,
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
				sourceIp,
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
		body: body ? JSON.stringify(body) : null,
		isBase64Encoded: false
	};

	// check if the authorizer is not defined
	if (event.requestContext.authorizer === undefined) {
		// remove the authorizer from the event
		delete event.requestContext.authorizer;
	}

	return event;
};

// double export for test purpose
module.exports = function () {
	return module.exports.httpEventGenerator.apply(this, arguments);
};
module.exports.httpEventGenerator = httpEventGenerator;
