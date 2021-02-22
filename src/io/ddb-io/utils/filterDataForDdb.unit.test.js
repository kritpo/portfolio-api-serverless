'use strict';

// retrieve the tested function
const filterDataForDdb = require('./filterDataForDdb');

// configure the test suite
describe('filterDataForDdb', () => {
	// configure the test with no data
	it('with no data', () => {
		// execute the function
		const result = filterDataForDdb(undefined);

		should.not.exist(result);
	});

	// configure the tests with data
	describe('with data', () => {
		// configure the test with all transferable data
		it('with all transferable data', () => {
			// setup initial data
			const data = { id1: 'PK', filter: 'SK', id2: 'GSI' };

			// execute the function
			const result = filterDataForDdb(data);

			data.should.be.deep
				.equal({ PK: 'PK', SK: 'SK', GSI: 'GSI' })
				.and.not.have.any.keys('id1', 'filter', 'id2');
			result.should.be.deep
				.equal({ PK: 'PK', SK: 'SK', GSI: 'GSI' })
				.and.not.have.any.keys('id1', 'filter', 'id2');
		});

		// configure the test with some transferable data
		it('with some transferable data', () => {
			// setup initial data
			const data = { id1: 'PK', filter: 'SK' };

			// execute the function
			const result = filterDataForDdb(data);

			data.should.be.deep
				.equal({ PK: 'PK', SK: 'SK', GSI: undefined })
				.and.not.have.any.keys('id1', 'filter', 'id2');
			result.should.be.deep
				.equal({ PK: 'PK', SK: 'SK', GSI: undefined })
				.and.not.have.any.keys('id1', 'filter', 'id2');
		});
	});
});
