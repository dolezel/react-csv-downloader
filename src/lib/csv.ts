export interface IColumn {
  displayName?: string
  id: string
}

export type ColumnsDefinition = (string | IColumn)[]
export type Columns = ColumnsDefinition | undefined | false
export type Datas = (string[] | { [key: string]: string | number | null | undefined })[]

interface Header {
  order: string[]
  map: Record<string, string>
}

const newLine = '\r\n'
const raf = typeof requestAnimationFrame === 'function' ? requestAnimationFrame : process.nextTick

const makeWrapper = (wrapChar: string) => (str: string) => `${wrapChar}${str}${wrapChar}`
const makeResolver = (resolve: (result: string) => unknown, newLineAtEnd: boolean) => (content: string[]) => {
  if (newLineAtEnd) {
    content.push('')
  }

  resolve(content.join(newLine))
}

const identityMapping = (arr: string[], initialMapping: Header): Header =>
  arr.reduce((acc, k) => {
    if (!acc.map[k]) {
      acc.map[k] = k
      acc.order.push(k)
    }
    return acc
  }, initialMapping)

const extractHeaderFromData = (datas: Datas): Header =>
  datas.reduce(
    (acc: Header, v) => {
      return Array.isArray(v) ? acc : identityMapping(Object.keys(v), acc)
    },
    {
      order: [],
      map: {},
    }
  )

const extractHeaderFromColumns = (columns: ColumnsDefinition): Header =>
  columns.reduce(
    (acc: Header, v) => {
      let id, value
      if (typeof v === 'string') {
        id = v
        value = v
      } else {
        id = v.id
        value = v.displayName ?? v.id
      }
      acc.map[id] = value
      acc.order.push(id)
      return acc
    },
    { order: [], map: {} }
  )

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
    // @ts-expect-error 7053
    const asArray = Array.isArray(chunk[0]) && !columnOrder.some((k) => typeof chunk[0][k] !== 'undefined')
    i += 1
    chunk
      // @ts-expect-error 7053
      .map((v) => (asArray ? v : columnOrder.map((k) => v[k] ?? '')) as string[])
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
  title?: string
}

export default async function csv({
  columns,
  datas,
  separator = ',',
  noHeader = false,
  wrapColumnChar = '',
  newLineAtEnd = false,
  chunkSize = 1000,
  title = '',
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

      const { map, order }: Header = columns ? extractHeaderFromColumns(columns) : extractHeaderFromData(datas)

      const content: string[] = []

      if (!noHeader) {
        const headerNames = order.map((id) => map[id])
        if (headerNames.length > 0) {
          if (title !== '') {
            content.push(title)
          }
          content.push(headerNames.map(wrap).join(separator))
        }
      }

      const processChunk = createChunkProcessor(resolve, wrap, content, datas, order, separator, chunkSize)

      raf(processChunk)
    } catch (err) {
      return reject(err)
    }
  })
}
