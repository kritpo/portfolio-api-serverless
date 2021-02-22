'use strict';

// retrieve the tested handler
const { hello } = require('./handler');

// configure the test suite
describe('hello', () => {
	// configure the test with sample set
	it('with sample set', async () => {
		// retrieve the result of the handler
		const result = await hello();

		result.should.have.property('statusCode', 200);
		result.should.have.property('body').to.be.a('string');
	});
});
