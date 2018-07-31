import { expect } from 'chai';
import csv from './csv';

const newLine = '\r\n';

const columnSet1 = [{ id: 'cell1' }];
const columnSet2 = [{ id: 'cell1' }, { id: 'cell2' }];
const columnSet3 = [{ id: 'cell1', displayName: 'Cell name' }];
const columnSet4 = [{ id: 'cell2' }, { id: 'cell1' }];

const dataSet1 = [{ cell1: 'row1' }];
const dataSet2 = [{ cell1: 'row1', cell2: 'row1' }];
const dataSet3 = [['cell1', 'cell2']];
const dataSet4 = [['cell1', 'cell2'], ['cell1', 'cell2']];

describe('CSV Creator', () => {
  describe('Default separator', () => {
    const separator = ',';

    it('Single cell', () => {
      const result = csv(columnSet1, dataSet1);
      expect(result).to.equal(`cell1${newLine}row1`);
    });

    it('Multiple cell', () => {
      const result = csv(columnSet2, dataSet2);
      expect(result).to.equal(`cell1${separator}cell2${newLine}row1${separator}row1`);
    });

    it('Header display name', () => {
      const result = csv(columnSet3, dataSet1);
      expect(result).to.equal(`Cell name${newLine}row1`);
    });

    it('Ordered cell', () => {
      const result = csv(columnSet4, dataSet2);
      expect(result).to.equal(`cell2${separator}cell1${newLine}row1${separator}row1`);
    });

    it('No header', () => {
      const result = csv(columnSet1, dataSet1, separator, true);
      expect(result).to.equal('row1');
    });

    it('Auto header', () => {
      const result = csv(false, dataSet2);
      expect(result).to.equal(`cell1${separator}cell2${newLine}row1${separator}row1`);
    });

    it('array of array datas - single row', () => {
      const result = csv(false, dataSet3);
      expect(result).to.equal(`cell1${separator}cell2`);
    });

    it('array of array datas - multiple row', () => {
      const result = csv(false, dataSet4);
      expect(result).to.equal(`cell1${separator}cell2${newLine}cell1${separator}cell2`);
    });

    it('array of array datas - with header', () => {
      const result = csv(columnSet4, dataSet4);
      expect(result).to.equal(`cell2${separator}cell1${newLine}cell1${separator}cell2${newLine}cell1${separator}cell2`);
    });
  });

  describe('Semicolon separator', () => {
    const separator = ';';

    it('Single cell', () => {
      const result = csv(columnSet1, dataSet1, separator);
      expect(result).to.equal(`cell1${newLine}row1`);
    });

    it('Multiple cell', () => {
      const result = csv(columnSet2, dataSet2, separator);
      expect(result).to.equal(`cell1${separator}cell2${newLine}row1${separator}row1`);
    });

    it('Header display name', () => {
      const result = csv(columnSet3, dataSet1, separator);
      expect(result).to.equal(`Cell name${newLine}row1`);
    });

    it('Ordered cell', () => {
      const result = csv(columnSet4, dataSet2, separator);
      expect(result).to.equal(`cell2${separator}cell1${newLine}row1${separator}row1`);
    });

    it('No header', () => {
      const result = csv(columnSet1, dataSet1, separator, true);
      expect(result).to.equal('row1');
    });

    it('Auto header', () => {
      const result = csv(false, dataSet2, separator);
      expect(result).to.equal(`cell1${separator}cell2${newLine}row1${separator}row1`);
    });

    it('array of array datas - single row', () => {
      const result = csv(false, dataSet3, separator);
      expect(result).to.equal(`cell1${separator}cell2`);
    });

    it('array of array datas - multiple row', () => {
      const result = csv(false, dataSet4, separator);
      expect(result).to.equal(`cell1${separator}cell2${newLine}cell1${separator}cell2`);
    });

    it('array of array datas - with header', () => {
      const result = csv(columnSet4, dataSet4, separator);
      expect(result).to.equal(`cell2${separator}cell1${newLine}cell1${separator}cell2${newLine}cell1${separator}cell2`);
    });
  });
});
