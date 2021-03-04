'use strict';

// retrieve the tested function
const filterDataForApp = require('./filterDataForApp');

// configure the test suite
describe('filterDataForApp', () => {
	// configure the test with no data
	it('with no data', () => {
		// execute the function
		const result = filterDataForApp(undefined);

		should.not.exist(result);
	});

	// configure the tests with data
	describe('with data', () => {
		// configure the test with all transferable data
		it('with all transferable data', () => {
			// setup initial data
			const data = { PK: 'PK', SK: 'SK', GSI: 'GSI' };

			// execute the function
			const result = filterDataForApp(data);

			data.should.be.deep
				.equal({ id1: 'PK', filter: 'SK', id2: 'GSI' })
				.and.not.have.any.keys('PK', 'SK', 'GSI');
			result.should.be.deep
				.equal({ id1: 'PK', filter: 'SK', id2: 'GSI' })
				.and.not.have.any.keys('PK', 'SK', 'GSI');
		});

		// configure the test with some transferable data
		it('with some transferable data', () => {
			// setup initial data
			const data = { PK: 'PK', SK: 'SK' };

			// execute the function
			const result = filterDataForApp(data);

			data.should.be.deep
				.equal({ id1: 'PK', filter: 'SK', id2: undefined })
				.and.not.have.any.keys('PK', 'SK', 'GSI');
			result.should.be.deep
				.equal({
					id1: 'PK',
					filter: 'SK',
					id2: undefined
				})
				.and.not.have.any.keys('PK', 'SK', 'GSI');
		});
	});
});
