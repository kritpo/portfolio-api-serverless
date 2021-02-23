'use strict';

// retrieve the tested function
const checkParamType = require('./checkParamType');

// configure the test suite
describe('checkParamType', () => {
	// configure the test with right param
	it('with right param', () => {
		// execute the function
		checkParamType(42, 'number', 'dumb_name', 'dumb_scope');

		// nothing should happen
	});

	// configure the test with wrong param
	it('with wrong param', () => {
		// try to execute the function
		try {
			// execute the function
			checkParamType(42, 'string', 'dumb_name', 'dumb_scope');

			// shouldn't be executed
			true.should.be.equal(false, 'should not be executed');
		} catch (e) {
			e.should.be
				.a('Error')
				.which.have.property(
					'message',
					'dumb_scope: `dumb_name` parameter is not `string` type'
				);
		}
	});
});
