'use strict';

// import sinon
const sinon = require('sinon');

// import the tested function dependency
const dbReadByIdAndFilter = require('../dbReadByIdAndFilter');

// retrieve the tested function
const checkDBKeysExistence = require('./checkDBKeysExistence');

// configure the test suite
describe('checkDBKeysExistence', () => {
	let readStub;

	// setup the stub
	beforeEach(() => {
		// initialize the stub
		readStub = sinon.stub(dbReadByIdAndFilter, 'dbReadByIdAndFilter');

		// configure the stub
		readStub.withArgs('good_id1', 'good_filter').resolves({ data: 42 });
	});

	// reset the stub
	afterEach(() => sinon.restore());

	// configure the test with good keys set
	it('with good keys set', async () => {
		// execute the function
		const result = await checkDBKeysExistence(
			'good_id1',
			'good_filter',
			'dumb_service',
			'dumb_context'
		);

		result.should.have.property('data', 42);
		readStub.should.have.been.calledWith('good_id1', 'good_filter');
	});

	// configure the test with wrong keys set
	it('with wrong keys set', async () => {
		// try to execute the function
		try {
			// execute the function
			await checkDBKeysExistence(
				'wrong_id1',
				'wrong_filter',
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
					'dumb_service(dumb_context): the set `id1` and `filter` is not defined'
				);
		}

		readStub.should.have.been.calledWith('wrong_id1', 'wrong_filter');
	});
});
