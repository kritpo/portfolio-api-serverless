'use strict';

const handler = async event => {
	return {
		statusCode: 200,
		body: JSON.stringify(
			{
				message:
					'Go Serverless v1.0! Your function executed successfully!',
				input: event
			},
			null,
			4
		)
	};
};

module.exports.hello = handler;
