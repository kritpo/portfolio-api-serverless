'use strict';

// import the params checker
const checkRequiredParamType = require('../../utils/checkRequiredParamType');

/**
 * decode a http request from a http event
 * @param {object} event the http event
 * @param {boolean} includeParams if includes the params
 * @param {boolean} includeQueries if includes the queries
 * @param {boolean} includeHeaders if includes the headers
 */
const httpRequestDecode = (
	event,
	includeParams = false,
	includeQueries = false,
	includeHeaders = false
) => {
	// setup the scope for error message purpose
	const scope = 'http-io(request-decode)';

	// check if the parameters are right
	checkRequiredParamType(event, 'object', 'event', scope);
	checkRequiredParamType(includeParams, 'boolean', 'includeParams', scope);
	checkRequiredParamType(includeQueries, 'boolean', 'includeQueries', scope);
	checkRequiredParamType(includeHeaders, 'boolean', 'includeHeaders', scope);

	// configure the decoded request
	const request = {
		method: event.httpMethod,
		body: JSON.parse(event.body),
		ipAddress: event.requestContext.identity.sourceIp
	};

	// check if the decoded request need to includes params
	if (includeParams === true) {
		// configure the params
		request.params = event.pathParameters;
	}

	// check if the decoded request need to includes queries
	if (includeQueries === true) {
		// configure the queries
		request.queries = event.queryStringParameters;
	}

	// check if the decoded request need to includes headers
	if (includeHeaders === true) {
		// configure the headers
		request.headers = event.headers;
	}

	// check if the request includes an authorizer
	if (event.requestContext.authorizer !== undefined) {
		// retrieve cognito data
		const cognito = event.requestContext.authorizer.claims;

		// configure the user data
		request.user = {
			username: cognito['cognito:username'],
			email: cognito['email'],
			phoneNumber: cognito['phone_number']
		};
	}

	// log the retrieved request for debug purpose
	console.debug(request);

	return request;
};

module.exports = httpRequestDecode;
