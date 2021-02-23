'use strict';

// retrieve the tested function
const checkParamFormat = require('./checkParamFormat');

// configure the test suite
describe('checkParamFormat', () => {
	// configure the tests with right param
	describe('with right param', () => {
		// configure the test with regex
		it('with regex', () => {
			// execute the function
			checkParamFormat(
				'dumb@mail.address',
				/^[a-z0-9\.\-\_]+@[a-z0-9\.\-\_]+\.[a-z0-9]{2,}$/,
				'dumb_name',
				'dumb_service',
				'dumb_context'
			);

			// nothing should happen
		});

		// configure the test with string
		it('with string', () => {
			// execute the function
			checkParamFormat(
				'dumb@mail.address',
				'^[a-z0-9\\.\\-\\_]+@[a-z0-9\\.\\-\\_]+\\.[a-z0-9]{2,}$',
				'dumb_name',
				'dumb_service',
				'dumb_context'
			);

			// nothing should happen
		});
	});

	// configure the test with wrong param
	it('with wrong param', () => {
		// try to execute the function
		try {
			// execute the function
			checkParamFormat(
				'dumb@mail-address',
				/^[a-z0-9\.\-\_]+@[a-z0-9\.\-\_]+\.[a-z0-9]{2,}$/,
				'dumb_name',
				'dumb_service',
				'dumb_context'
			);

			// shouldn't be executed
			true.should.be.equal(false, 'should not be executed');
		} catch (e) {
			e.should.be
				.a('Error')
				.which.have.property(
					'message',
					'dumb_service(dumb_context): `dumb_name` parameter is not `/^[a-z0-9\\.\\-\\_]+@[a-z0-9\\.\\-\\_]+\\.[a-z0-9]{2,}$/` format'
				);
		}
	});
});
