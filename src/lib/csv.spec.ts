import csv from './csv'

const expect = (globalThis as { expect?: Chai.ExpectStatic }).expect!

const newLine = '\r\n'

const columnSet1 = [{ id: 'cell1' }]
const columnSet2 = [{ id: 'cell1' }, { id: 'cell2' }]
const columnSet3 = [{ id: 'cell1', displayName: 'Cell name' }]
const columnSet4 = [{ id: 'cell2' }, { id: 'cell1' }]
const columnSet5 = [
  { displayName: 'FirstC', id: '2' },
  { displayName: 'SecondC', id: '1' },
  { displayName: 'ThirdC', id: '0' },
]

const dataSet1 = [{ cell1: 'row1' }]
const dataSet2 = [{ cell1: 'row1', cell2: 'row1' }]
const dataSet3 = [['cell1', 'cell2']]
const dataSet4 = [
  ['cell1', 'cell2'],
  ['cell1', 'cell2'],
]
const dataSet5 = [{ cell1: 'row1' }, { cell1: 'row2' }]
const dataSet6 = [{ cell1: 'row1' }, { cell1: null }, { cell1: 'row3' }]
const dataSet7 = [{ cell1: 'row1' }, { cell1: undefined }, { cell1: 'row3' }]
const dataSet8 = [['ThirdD', 'SecondD', 'FirstD']]

describe('CSV Creator', () => {
  it('Should work with empty data', async () => {
    const result = await csv({ columns: [], datas: [] })
    expect(result).to.equal(``)
  })

  describe('Default separator', () => {
    const separator = ','

    it('Single cell', async () => {
      const result = await csv({ columns: columnSet1, datas: dataSet1 })
      expect(result).to.equal(`cell1${newLine}row1`)
    })

    it('Multiple cell', async () => {
      const result = await csv({ columns: columnSet2, datas: dataSet2 })
      expect(result).to.equal(`cell1${separator}cell2${newLine}row1${separator}row1`)
    })

    it('Header display name', async () => {
      const result = await csv({ columns: columnSet3, datas: dataSet1 })
      expect(result).to.equal(`Cell name${newLine}row1`)
    })

    it('Ordered cell', async () => {
      const result = await csv({ columns: columnSet4, datas: dataSet2 })
      expect(result).to.equal(`cell2${separator}cell1${newLine}row1${separator}row1`)
    })

    it('Ordered cell 2', async () => {
      const result = await csv({ columns: columnSet5, datas: dataSet8 })
      expect(result).to.equal(
        `FirstC${separator}SecondC${separator}ThirdC${newLine}FirstD${separator}SecondD${separator}ThirdD`
      )
    })

    it('No header', async () => {
      const result = await csv({
        columns: columnSet1,
        datas: dataSet1,
        separator,
        noHeader: true,
      })
      expect(result).to.equal('row1')
    })

    it('Auto header', async () => {
      const result = await csv({ columns: false, datas: dataSet2 })
      expect(result).to.equal(`cell1${separator}cell2${newLine}row1${separator}row1`)
    })

    it('array of array datas - single row', async () => {
      const result = await csv({ columns: false, datas: dataSet3 })
      expect(result).to.equal(`cell1${separator}cell2`)
    })

    it('array of array datas - multiple row', async () => {
      const result = await csv({ columns: false, datas: dataSet4 })
      expect(result).to.equal(`cell1${separator}cell2${newLine}cell1${separator}cell2`)
    })

    it('array of array datas - with header', async () => {
      const result = await csv({ columns: columnSet4, datas: dataSet4 })
      expect(result).to.equal(`cell2${separator}cell1${newLine}cell1${separator}cell2${newLine}cell1${separator}cell2`)
    })
  })

  describe('Column Wrap', () => {
    const separator = ','
    const wrapColumnChar = '"'

    it('Single cell', async () => {
      const result = await csv({
        columns: columnSet1,
        datas: dataSet1,
        wrapColumnChar,
      })
      expect(result).to.equal(`${wrapColumnChar}cell1${wrapColumnChar}${newLine}${wrapColumnChar}row1${wrapColumnChar}`)
    })

    it('Multiple cell', async () => {
      const result = await csv({
        columns: columnSet2,
        datas: dataSet2,
        wrapColumnChar,
      })
      expect(result).to.equal(
        `${wrapColumnChar}cell1${wrapColumnChar}${separator}${wrapColumnChar}cell2${wrapColumnChar}${newLine}${wrapColumnChar}row1${wrapColumnChar}${separator}${wrapColumnChar}row1${wrapColumnChar}`
      )
    })

    it('Header display name', async () => {
      const result = await csv({
        columns: columnSet3,
        datas: dataSet1,
        wrapColumnChar,
      })
      expect(result).to.equal(
        `${wrapColumnChar}Cell name${wrapColumnChar}${newLine}${wrapColumnChar}row1${wrapColumnChar}`
      )
    })

    it('Ordered cell', async () => {
      const result = await csv({
        columns: columnSet4,
        datas: dataSet2,
        wrapColumnChar,
      })
      expect(result).to.equal(
        `${wrapColumnChar}cell2${wrapColumnChar}${separator}${wrapColumnChar}cell1${wrapColumnChar}${newLine}${wrapColumnChar}row1${wrapColumnChar}${separator}${wrapColumnChar}row1${wrapColumnChar}`
      )
    })

    it('No header', async () => {
      const result = await csv({
        columns: columnSet1,
        datas: dataSet1,
        separator,
        noHeader: true,
        wrapColumnChar,
      })
      expect(result).to.equal(`${wrapColumnChar}row1${wrapColumnChar}`)
    })

    it('Auto header', async () => {
      const result = await csv({
        columns: false,
        datas: dataSet2,
        wrapColumnChar,
      })
      expect(result).to.equal(
        `${wrapColumnChar}cell1${wrapColumnChar}${separator}${wrapColumnChar}cell2${wrapColumnChar}${newLine}${wrapColumnChar}row1${wrapColumnChar}${separator}${wrapColumnChar}row1${wrapColumnChar}`
      )
    })

    it('array of array datas - single row', async () => {
      const result = await csv({
        columns: false,
        datas: dataSet3,
        wrapColumnChar,
      })
      expect(result).to.equal(
        `${wrapColumnChar}cell1${wrapColumnChar}${separator}${wrapColumnChar}cell2${wrapColumnChar}`
      )
    })

    it('array of array datas - multiple row', async () => {
      const result = await csv({
        columns: false,
        datas: dataSet4,
        wrapColumnChar,
      })
      expect(result).to.equal(
        `${wrapColumnChar}cell1${wrapColumnChar}${separator}${wrapColumnChar}cell2${wrapColumnChar}${newLine}${wrapColumnChar}cell1${wrapColumnChar}${separator}${wrapColumnChar}cell2${wrapColumnChar}`
      )
    })

    it('array of array datas - with header', async () => {
      const result = await csv({
        columns: columnSet4,
        datas: dataSet4,
        wrapColumnChar,
      })
      expect(result).to.equal(
        `${wrapColumnChar}cell2${wrapColumnChar}${separator}${wrapColumnChar}cell1${wrapColumnChar}${newLine}${wrapColumnChar}cell1${wrapColumnChar}${separator}${wrapColumnChar}cell2${wrapColumnChar}${newLine}${wrapColumnChar}cell1${wrapColumnChar}${separator}${wrapColumnChar}cell2${wrapColumnChar}`
      )
    })
  })

  describe('Semicolon separator', () => {
    const separator = ';'

    it('Single cell', async () => {
      const result = await csv({
        columns: columnSet1,
        datas: dataSet1,
        separator,
      })
      expect(result).to.equal(`cell1${newLine}row1`)
    })

    it('Multiple cell', async () => {
      const result = await csv({
        columns: columnSet2,
        datas: dataSet2,
        separator,
      })
      expect(result).to.equal(`cell1${separator}cell2${newLine}row1${separator}row1`)
    })

    it('Header display name', async () => {
      const result = await csv({
        columns: columnSet3,
        datas: dataSet1,
        separator,
      })
      expect(result).to.equal(`Cell name${newLine}row1`)
    })

    it('Ordered cell', async () => {
      const result = await csv({
        columns: columnSet4,
        datas: dataSet2,
        separator,
      })
      expect(result).to.equal(`cell2${separator}cell1${newLine}row1${separator}row1`)
    })

    it('No header', async () => {
      const result = await csv({
        columns: columnSet1,
        datas: dataSet1,
        separator,
        noHeader: true,
      })
      expect(result).to.equal('row1')
    })

    it('Auto header', async () => {
      const result = await csv({ columns: false, datas: dataSet2, separator })
      expect(result).to.equal(`cell1${separator}cell2${newLine}row1${separator}row1`)
    })

    it('array of array datas - single row', async () => {
      const result = await csv({ columns: false, datas: dataSet3, separator })
      expect(result).to.equal(`cell1${separator}cell2`)
    })

    it('array of array datas - multiple row', async () => {
      const result = await csv({ columns: false, datas: dataSet4, separator })
      expect(result).to.equal(`cell1${separator}cell2${newLine}cell1${separator}cell2`)
    })

    it('array of array datas - with header', async () => {
      const result = await csv({
        columns: columnSet4,
        datas: dataSet4,
        separator,
      })
      expect(result).to.equal(`cell2${separator}cell1${newLine}cell1${separator}cell2${newLine}cell1${separator}cell2`)
    })
  })

  describe('New line at end', () => {
    it('should not insert new line at end', async () => {
      const result = await csv({
        columns: columnSet1,
        datas: dataSet5,
        newLineAtEnd: false,
      })
      expect(result).to.equal(`cell1${newLine}row1${newLine}row2`)
    })
    it('should insert new line at end', async () => {
      const result = await csv({
        columns: columnSet1,
        datas: dataSet5,
        newLineAtEnd: true,
      })
      expect(result).to.equal(`cell1${newLine}row1${newLine}row2${newLine}`)
    })
  })

  describe('Should process chunks', () => {
    it('should process each line as a chunk', async () => {
      const result = await csv({
        columns: columnSet1,
        datas: dataSet5,
        chunkSize: 1,
      })
      expect(result).to.equal(`cell1${newLine}row1${newLine}row2`)
    })
  })

  describe('Nulls and undefineds', () => {
    it('should convert null to empty field', async () => {
      const result = await csv({ columns: columnSet1, datas: dataSet6 })
      expect(result).to.equal(`cell1${newLine}row1${newLine}${newLine}row3`)
    })

    it('should convert null to empty field', async () => {
      const result = await csv({ columns: columnSet1, datas: dataSet7 })
      expect(result).to.equal(`cell1${newLine}row1${newLine}${newLine}row3`)
    })
  })

  describe('Issue #411', () => {
    it('should not duplicate columns', async () => {
      const data = [
        { k1: 'v1', k2: 'v2' },
        { k1: 'v3', k2: 'v4' },
        { k1: 'v5', k2: 'v6' },
      ]
      const result = await csv({ datas: data })
      expect(result).to.equal(`k1,k2${newLine}v1,v2${newLine}v3,v4${newLine}v5,v6`)
    })
  })

  describe('Numbers', () => {
    it('should be ok', async () => {
      const people = [
        { name: 'Alice', age: 25 },
        { name: 'Bob', age: 27 },
        { name: 'Charlie', age: 40 },
      ]
      const result = await csv({ datas: people })
      expect(result).to.equal(`name,age${newLine}Alice,25${newLine}Bob,27${newLine}Charlie,40`)
    })
  })
})
