/* tslint:disable no-duplicate-string */
import { expect } from 'chai'
import csv from './csv'

const newLine = '\r\n'

const columnSet1 = [{ id: 'cell1' }]
const columnSet2 = [{ id: 'cell1' }, { id: 'cell2' }]
const columnSet3 = [{ id: 'cell1', displayName: 'Cell name' }]
const columnSet4 = [{ id: 'cell2' }, { id: 'cell1' }]

const dataSet1 = [{ cell1: 'row1' }]
const dataSet2 = [{ cell1: 'row1', cell2: 'row1' }]
const dataSet3 = [['cell1', 'cell2']]
const dataSet4 = [['cell1', 'cell2'], ['cell1', 'cell2']]
const dataSet5 = [{ cell1: 'row1' }, { cell1: 'row2' }]

describe('CSV Creator', () => {
  describe('Default separator', () => {
    const separator = ','

    it('Single cell', () => {
      const result = csv(columnSet1, dataSet1)
      expect(result).to.equal(`cell1${newLine}row1`)
    })

    it('Multiple cell', () => {
      const result = csv(columnSet2, dataSet2)
      expect(result).to.equal(`cell1${separator}cell2${newLine}row1${separator}row1`)
    })

    it('Header display name', () => {
      const result = csv(columnSet3, dataSet1)
      expect(result).to.equal(`Cell name${newLine}row1`)
    })

    it('Ordered cell', () => {
      const result = csv(columnSet4, dataSet2)
      expect(result).to.equal(`cell2${separator}cell1${newLine}row1${separator}row1`)
    })

    it('No header', () => {
      const result = csv(columnSet1, dataSet1, separator, true)
      expect(result).to.equal('row1')
    })

    it('Auto header', () => {
      const result = csv(false, dataSet2)
      expect(result).to.equal(`cell1${separator}cell2${newLine}row1${separator}row1`)
    })

    it('array of array datas - single row', () => {
      const result = csv(false, dataSet3)
      expect(result).to.equal(`cell1${separator}cell2`)
    })

    it('array of array datas - multiple row', () => {
      const result = csv(false, dataSet4)
      expect(result).to.equal(`cell1${separator}cell2${newLine}cell1${separator}cell2`)
    })

    it('array of array datas - with header', () => {
      const result = csv(columnSet4, dataSet4)
      expect(result).to.equal(`cell2${separator}cell1${newLine}cell1${separator}cell2${newLine}cell1${separator}cell2`)
    })
  })

  describe('Column Wrap', () => {
    const separator = ','
    const wrapColumnChar = '"'

    it('Single cell', () => {
      const result = csv(columnSet1, dataSet1, undefined, undefined, wrapColumnChar)
      expect(result).to.equal(`${wrapColumnChar}cell1${wrapColumnChar}${newLine}${wrapColumnChar}row1${wrapColumnChar}`)
    })

    it('Multiple cell', () => {
      const result = csv(columnSet2, dataSet2, undefined, undefined, wrapColumnChar)
      expect(result).to.equal(`${wrapColumnChar}cell1${wrapColumnChar}${separator}${wrapColumnChar}cell2${wrapColumnChar}${newLine}${wrapColumnChar}row1${wrapColumnChar}${separator}${wrapColumnChar}row1${wrapColumnChar}`)
    })

    it('Header display name', () => {
      const result = csv(columnSet3, dataSet1, undefined, undefined, wrapColumnChar)
      expect(result).to.equal(`${wrapColumnChar}Cell name${wrapColumnChar}${newLine}${wrapColumnChar}row1${wrapColumnChar}`)
    })

    it('Ordered cell', () => {
      const result = csv(columnSet4, dataSet2, undefined, undefined, wrapColumnChar)
      expect(result).to.equal(`${wrapColumnChar}cell2${wrapColumnChar}${separator}${wrapColumnChar}cell1${wrapColumnChar}${newLine}${wrapColumnChar}row1${wrapColumnChar}${separator}${wrapColumnChar}row1${wrapColumnChar}`)
    })

    it('No header', () => {
      const result = csv(columnSet1, dataSet1, separator, true, wrapColumnChar)
      expect(result).to.equal(`${wrapColumnChar}row1${wrapColumnChar}`)
    })

    it('Auto header', () => {
      const result = csv(false, dataSet2, undefined, undefined, wrapColumnChar)
      expect(result).to.equal(`${wrapColumnChar}cell1${wrapColumnChar}${separator}${wrapColumnChar}cell2${wrapColumnChar}${newLine}${wrapColumnChar}row1${wrapColumnChar}${separator}${wrapColumnChar}row1${wrapColumnChar}`)
    })

    it('array of array datas - single row', () => {
      const result = csv(false, dataSet3, undefined, undefined, wrapColumnChar)
      expect(result).to.equal(`${wrapColumnChar}cell1${wrapColumnChar}${separator}${wrapColumnChar}cell2${wrapColumnChar}`)
    })

    it('array of array datas - multiple row', () => {
      const result = csv(false, dataSet4, undefined, undefined, wrapColumnChar)
      expect(result).to.equal(`${wrapColumnChar}cell1${wrapColumnChar}${separator}${wrapColumnChar}cell2${wrapColumnChar}${newLine}${wrapColumnChar}cell1${wrapColumnChar}${separator}${wrapColumnChar}cell2${wrapColumnChar}`)
    })

    it('array of array datas - with header', () => {
      const result = csv(columnSet4, dataSet4, undefined, undefined, wrapColumnChar)
      expect(result).to.equal(`${wrapColumnChar}cell2${wrapColumnChar}${separator}${wrapColumnChar}cell1${wrapColumnChar}${newLine}${wrapColumnChar}cell1${wrapColumnChar}${separator}${wrapColumnChar}cell2${wrapColumnChar}${newLine}${wrapColumnChar}cell1${wrapColumnChar}${separator}${wrapColumnChar}cell2${wrapColumnChar}`)
    })
  })

  describe('Semicolon separator', () => {
    const separator = ';'

    it('Single cell', () => {
      const result = csv(columnSet1, dataSet1, separator)
      expect(result).to.equal(`cell1${newLine}row1`)
    })

    it('Multiple cell', () => {
      const result = csv(columnSet2, dataSet2, separator)
      expect(result).to.equal(`cell1${separator}cell2${newLine}row1${separator}row1`)
    })

    it('Header display name', () => {
      const result = csv(columnSet3, dataSet1, separator)
      expect(result).to.equal(`Cell name${newLine}row1`)
    })

    it('Ordered cell', () => {
      const result = csv(columnSet4, dataSet2, separator)
      expect(result).to.equal(`cell2${separator}cell1${newLine}row1${separator}row1`)
    })

    it('No header', () => {
      const result = csv(columnSet1, dataSet1, separator, true)
      expect(result).to.equal('row1')
    })

    it('Auto header', () => {
      const result = csv(false, dataSet2, separator)
      expect(result).to.equal(`cell1${separator}cell2${newLine}row1${separator}row1`)
    })

    it('array of array datas - single row', () => {
      const result = csv(false, dataSet3, separator)
      expect(result).to.equal(`cell1${separator}cell2`)
    })

    it('array of array datas - multiple row', () => {
      const result = csv(false, dataSet4, separator)
      expect(result).to.equal(`cell1${separator}cell2${newLine}cell1${separator}cell2`)
    })

    it('array of array datas - with header', () => {
      const result = csv(columnSet4, dataSet4, separator)
      expect(result).to.equal(`cell2${separator}cell1${newLine}cell1${separator}cell2${newLine}cell1${separator}cell2`)
    })
  })

  describe('Headers', () => {
    it('should insert header', () => {
      const result = csv(columnSet1, dataSet5, ',', false)
      expect(result).to.equal(`cell1${newLine}row1${newLine}row2`)
    })
    it('should not insert header', () => {
      const result = csv(columnSet1, dataSet5, ',', true)
      expect(result).to.equal(`row1${newLine}row2`)
    })
  })

  describe('Column Wrapper', () => {
    it('should not wrap column in extra char', () => {
      const result = csv(columnSet1, dataSet5, ',', false, '')
      expect(result).to.equal(`cell1${newLine}row1${newLine}row2`)
    })
    it('should wrap column in extra char', () => {
      const result = csv(columnSet1, dataSet5, ',', false, '"')
      expect(result).to.equal(`"cell1"${newLine}"row1"${newLine}"row2"`)
    })
  })

  describe('New line at end', () => {
    it('should not insert new line at end', () => {
      const result = csv(columnSet1, dataSet5, ',', false, '', false)
      expect(result).to.equal(`cell1${newLine}row1${newLine}row2`)
    })
    it('should insert new line at end', () => {
      const result = csv(columnSet1, dataSet5, ',', false, '', true)
      expect(result).to.equal(`cell1${newLine}row1${newLine}row2${newLine}`)
    })
  })
})
