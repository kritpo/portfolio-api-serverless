'use strict';

// import sinon
const sinon = require('sinon');

// import the tested function dependency
const checkParamType = require('./checkParamType');

// retrieve the tested function
const checkRequiredParamType = require('./checkRequiredParamType');

// configure the test suite
describe('checkRequiredParamType', () => {
	let checkTypeStub;

	// setup the stub
	beforeEach(() => {
		// initialize the stub
		checkTypeStub = sinon.stub(checkParamType, 'checkParamType');
	});

	// reset the stub
	afterEach(() => sinon.restore());

	// configure the test with param
	it('with param', () => {
		// execute the function
		checkRequiredParamType(
			42,
			'number',
			'dumb_name',
			'dumb_service',
			'dumb_context'
		);

		checkTypeStub.should.have.been.calledWith(
			42,
			'number',
			'dumb_name',
			'dumb_service',
			'dumb_context'
		);
	});

	// configure the tests with no param
	describe('with no param', () => {
		// configure the test with null param
		it('with null param', async () => {
			// try to execute the function
			try {
				// execute the function
				checkRequiredParamType(
					null,
					'string',
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
						'dumb_service(dumb_context): `dumb_name` parameter is missing'
					);
			}

			checkTypeStub.should.have.not.been.called;
		});

		// configure the test with undefined param
		it('with undefined param', async () => {
			// try to execute the function
			try {
				// execute the function
				checkRequiredParamType(
					undefined,
					'string',
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
						'dumb_service(dumb_context): `dumb_name` parameter is missing'
					);
			}

			checkTypeStub.should.have.not.been.called;
		});
	});
});
