/* eslint-disable */
const newLine = '\r\n';
const csv = require('../csv.js').default;

const dataSet1 = [{cell1: 'test'}];
const dataSet2 = [{cell1: 'test', cell2: 'test', cell3: 'test'}];
const dataSet3 = [{cell1: 'test'}, {cell1: 'test'}, {cell1: 'test'}];

describe('CSV Creator', function() {
  describe('Comma separated', function() {
    const separator = ',';

    it('Single row', function() {
      const result = csv(false, dataSet1, separator, true);
      expect(result).to.equal('test');
    })

    it('Single row with header', function() {
      const result = csv(false, dataSet1);
      expect(result).to.equal('cell1'+newLine+'test');
    })

    it('Multiple cell', function() {
      const result = csv(false, dataSet2, separator, true);
      expect(result).to.equal('test'+separator+'test'+separator+'test');
      expect(result.split(separator).length).to.equal(3);
    })

    it('Multiple row - without header', function() {
      const result = csv(false, dataSet3, separator, true);
      expect(result).to.equal('test'+newLine+'test'+newLine+'test');
      expect(result.split(newLine).length).to.equal(3);
    })

    it('Multiple row - with header', function() {
      const result = csv(false, dataSet3);
      expect(result).to.equal('cell1'+newLine+'test'+newLine+'test'+newLine+'test');
      expect(result.split(newLine).length).to.equal(4);
    })
  })

  describe('Semicolon separated', function() {
    const separator = ';';

    it('Single row', function() {
      const result = csv(false, dataSet1, separator, true);
      expect(result).to.equal('test');
    })

    it('Single row with header', function() {
      const result = csv(false, dataSet1, separator);
      expect(result).to.equal('cell1'+newLine+'test');
    })

    it('Multiple cell', function() {
      const result = csv(false, dataSet2, separator, true);
      expect(result).to.equal('test'+separator+'test'+separator+'test');
      expect(result.split(separator).length).to.equal(3);
    })

    it('Multiple row - without header', function() {
      const result = csv(false, dataSet3, separator, true);
      expect(result).to.equal('test'+newLine+'test'+newLine+'test');
      expect(result.split(newLine).length).to.equal(3);
    })

    it('Multiple row - with header', function() {
      const result = csv(false, dataSet3, separator);
      expect(result).to.equal('cell1'+newLine+'test'+newLine+'test'+newLine+'test');
      expect(result.split(newLine).length).to.equal(4);
    })
  })

  describe('Pipe separated', function() {
    const separator = '|';

    it('Single row', function() {
      const result = csv(false, dataSet1, separator, true);
      expect(result).to.equal('test');
    })

    it('Single row with header', function() {
      const result = csv(false, dataSet1, separator);
      expect(result).to.equal('cell1'+newLine+'test');
    })

    it('Multiple cell', function() {
      const result = csv(false, dataSet2, separator, true);
      expect(result).to.equal('test'+separator+'test'+separator+'test');
      expect(result.split(separator).length).to.equal(3);
    })

    it('Multiple row - without header', function() {
      const result = csv(false, dataSet3, separator, true);
      expect(result).to.equal('test'+newLine+'test'+newLine+'test');
      expect(result.split(newLine).length).to.equal(3);
    })

    it('Multiple row - with header', function() {
      const result = csv(false, dataSet3, separator);
      expect(result).to.equal('cell1'+newLine+'test'+newLine+'test'+newLine+'test');
      expect(result.split(newLine).length).to.equal(4);
    })
  })
});
