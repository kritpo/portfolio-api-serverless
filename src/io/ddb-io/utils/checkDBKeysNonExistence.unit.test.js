'use strict';

// import sinon
const sinon = require('sinon');

// import the tested function dependency
const dbReadByIdAndFilter = require('../dbReadByIdAndFilter');

// retrieve the tested function
const checkDBKeysNonExistence = require('./checkDBKeysNonExistence');

// configure the test suite
describe('checkDBKeysNonExistence', () => {
	let readStub;

	// setup the stub
	beforeEach(() => {
		// initialize the stub
		readStub = sinon.stub(dbReadByIdAndFilter, 'dbReadByIdAndFilter');

		// configure the stub
		readStub.withArgs('good_id1', 'good_filter').resolves(undefined);
		readStub.withArgs(null, 'good_filter', 'good_id2').resolves(undefined);
		readStub.resolves({ data: 42 });
	});

	// reset the stub
	afterEach(() => sinon.restore());

	// configure the tests with good keys set
	describe('with good keys set', () => {
		// configure the test with [good_id1, good_filter] set
		it('with [good_id1, good_filter] set', async () => {
			// execute the function
			const result = await checkDBKeysNonExistence(
				'good_id1',
				'good_filter',
				null,
				'dumb_service',
				'dumb_context'
			);

			readStub.should.have.been.calledWith('good_id1', 'good_filter');
		});

		// configure the test with [good_id2, good_filter] set
		it('with [good_id2, good_filter] set', async () => {
			// execute the function
			const result = await checkDBKeysNonExistence(
				null,
				'good_filter',
				'good_id2',
				'dumb_service',
				'dumb_context'
			);

			readStub.should.have.been.calledWith(
				null,
				'good_filter',
				'good_id2'
			);
		});
	});

	// configure the tests with wrong keys set
	describe('with wrong keys set', () => {
		// configure the test with [wrong_id1, wrong_filter] set
		it('with [wrong_id1, wrong_filter] set', async () => {
			// try to execute the function
			try {
				// execute the function
				await checkDBKeysNonExistence(
					'wrong_id1',
					'wrong_filter',
					null,
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
						'dumb_service(dumb_context): the set `id1` and `filter` is already defined'
					);
			}

			readStub.should.have.been.calledWith('wrong_id1', 'wrong_filter');
		});

		// configure the test with [wrong_id2, wrong_filter] set
		it('with [wrong_id2, wrong_filter] set', async () => {
			// try to execute the function
			try {
				// execute the function
				await checkDBKeysNonExistence(
					null,
					'wrong_filter',
					'wrong_id2',
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
						'dumb_service(dumb_context): the set `id2` and `filter` is already defined'
					);
			}

			readStub.should.have.been.calledWith(
				null,
				'wrong_filter',
				'wrong_id2'
			);
		});
	});
});
