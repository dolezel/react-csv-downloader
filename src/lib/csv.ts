export interface IColumn {
  displayName?: string
  id: string
}

export type ColumnsDefinition = (string | IColumn)[]
export type Columns = ColumnsDefinition | undefined | false
export type Datas = (string[] | { [key: string]: string | null | undefined })[]

const newLine = '\r\n'
const raf = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : process.nextTick

const makeWrapper = (wrapChar: string) => (str: string) => `${wrapChar}${str}${wrapChar}`
const makeResolver = (resolve: (result: string) => unknown, newLineAtEnd: boolean) => (content: string[]) => {
  if (newLineAtEnd) {
    content.push('')
  }

  resolve(content.join(newLine))
}

const identityMapping = (arr: string[], initialMapping: Record<string, string>): Record<string, string> =>
  arr.reduce((acc, k) => {
    acc[k] = k
    return acc
  }, initialMapping)

const extractHeaderFromData = (datas: Datas): Record<string, string> =>
  datas.reduce((acc: Record<string, string>, v) => (Array.isArray(v) ? acc : identityMapping(Object.keys(v), acc)), {})

const extractHeaderFromColumns = (columns: ColumnsDefinition): Record<string, string> =>
  columns.reduce((acc: Record<string, string>, v) => {
    if (typeof v === 'string') {
      acc[v] = v
    } else {
      acc[v.id] = v.displayName ?? v.id
    }
    return acc
  }, {})

function toChunks<T>(arr: T[], chunkSize: number): T[][] {
  return [...Array(Math.ceil(arr.length / chunkSize))].reduce((acc, _, i) => {
    const begin = i * chunkSize
    return acc.concat([arr.slice(begin, begin + chunkSize)])
  }, [])
}

const createChunkProcessor = (
  resolve: ReturnType<typeof makeResolver>,
  wrap: ReturnType<typeof makeWrapper>,
  content: string[],
  datas: Datas,
  columnOrder: string[],
  separator: string,
  chunkSize: number
) => {
  const chunks = toChunks(datas, chunkSize)
  let i = 0
  return function processChunk() {
    if (i >= chunks.length) {
      resolve(content)
      return
    }

    const chunk = chunks[i]
    i += 1
    chunk
      .map((v) => (Array.isArray(v) ? v : columnOrder.map((k) => v[k] ?? '')))
      .forEach((v) => {
        content.push(v.map(wrap).join(separator))
      })

    raf(processChunk)
  }
}

export interface ICsvProps {
  columns?: Columns
  datas: Datas | (() => Datas) | (() => Promise<Datas>) | Promise<Datas>
  separator?: string
  noHeader?: boolean
  wrapColumnChar?: string
  newLineAtEnd?: boolean
  chunkSize?: number
}

export default async function csv({
  columns,
  datas,
  separator = ',',
  noHeader = false,
  wrapColumnChar = '',
  newLineAtEnd = false,
  chunkSize = 1000,
}: ICsvProps) {
  // eslint-disable-next-line no-async-promise-executor
  return new Promise<void | string>(async (_resolve, reject) => {
    const resolve = makeResolver(_resolve, newLineAtEnd)
    const wrap = makeWrapper(wrapColumnChar)

    try {
      datas = typeof datas === 'function' ? await datas() : await datas
      if (!Array.isArray(datas)) {
        return _resolve()
      }

      const header: Record<string, string> = columns ? extractHeaderFromColumns(columns) : extractHeaderFromData(datas)

      const content: string[] = []

      if (!noHeader) {
        const headerNames = Object.values(header)
        if (headerNames.length > 0) {
          content.push(headerNames.map(wrap).join(separator))
        }
      }

      const columnOrder = Object.keys(header)

      const processChunk = createChunkProcessor(resolve, wrap, content, datas, columnOrder, separator, chunkSize)

      raf(processChunk)
    } catch (err) {
      return reject(err)
    }
  })
}
