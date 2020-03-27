export interface IColumn {
  displayName?: string
  id: string
}

export type ColumnsDefinition = (string | IColumn)[]
export type Columns = ColumnsDefinition | undefined | false
export type Datas = (string[] | { [key: string]: string })[]

const newLine = '\r\n'

const makeWrapper = (wrapChar: string) => (str: string) => `${wrapChar}${str}${wrapChar}`

const identityMapping = (arr: string[], initialMapping: Record<string, string>): Record<string, string> =>
  arr.reduce(
    (acc, k) => {
      acc[k] = k
      return acc
    },
    initialMapping,
  )

const extractHeaderFromData = (datas: Datas): Record<string, string> =>
  datas.reduce(
    (acc: Record<string, string>, v) => Array.isArray(v)
      ? acc
      : identityMapping(Object.keys(v), acc),
    {},
  )

const extractHeaderFromColumns = (columns: ColumnsDefinition): Record<string, string> =>
  columns.reduce(
    (acc: Record<string, string>, v) => {
      if (typeof v === 'string') {
        acc[v] = v
      } else {
        acc[v.id] = (typeof v.displayName !== 'undefined') ? v.displayName : v.id
      }
      return acc
    },
    {},
  )

export default function csv(
  columns: Columns,
  datas: Datas,
  separator = ',',
  noHeader = false,
  wrapColumnChar = '',
) {
  const wrap = makeWrapper(wrapColumnChar)

  const header: Record<string, string> = columns
    ? extractHeaderFromColumns(columns)
    : extractHeaderFromData(datas)

  const content = []

  if (!noHeader) {
    const headerNames = Object.values(header)
    if (headerNames.length > 0) {
      content.push(headerNames.map(wrap).join(separator))
    }
  }

  if (Array.isArray(datas)) {
    const columnOrder = Object.keys(header)
    datas
      .map((v) =>
        Array.isArray(v)
          ? v
          : columnOrder.map((k) =>
              typeof v[k] !== 'undefined'
                ? v[k]
                : '',
            )
      )
      .forEach((v) => {
        content.push(v.map(wrap).join(separator))
      })
  }

  return content.join(newLine)
}
