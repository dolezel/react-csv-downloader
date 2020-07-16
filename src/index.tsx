import * as FileSaver from 'file-saver'
import * as React from 'react'

import toCsv, { Columns, Datas } from './lib/csv'

export type PrefixSuffix = boolean | string | number

export interface ICsvDownloadProps {
  bom: boolean
  columns: Columns
  datas: Datas
  filename: string
  noHeader?: boolean
  prefix: PrefixSuffix
  separator?: string
  text?: string
  suffix: PrefixSuffix
  wrapColumnChar?: string
  newLineAtEnd?: boolean
}

type DefaultProps = 'bom' | 'columns' | 'noHeader' | 'separator'

export default class CsvDownload extends React.Component<ICsvDownloadProps> {
  public static defaultProps: Pick<ICsvDownloadProps, DefaultProps> = {
    bom: true,
    columns: false,
    noHeader: false,
    separator: ',',
  }

  public handleClick = () => {
    const { suffix, prefix, bom, columns, datas, separator, noHeader, wrapColumnChar, newLineAtEnd } = this.props
    const csv = toCsv(columns, datas, separator, noHeader, wrapColumnChar, newLineAtEnd)

    const bomCode = bom ? '\ufeff' : ''
    let { filename } = this.props

    if (filename.indexOf('.csv') === -1) {
      filename += '.csv'
    }

    if (suffix) {
      filename = typeof suffix === 'string' || typeof suffix === 'number'
        ? filename.replace('.csv', `_${suffix}.csv`)
        : filename.replace('.csv', `_${(new Date()).getTime()}.csv`)
    }

    if (prefix) {
      filename = typeof prefix === 'string' || typeof prefix === 'number'
        ? `${prefix}_${filename}`
        : `${(new Date()).getTime()}_${filename}`
    }

    const blob = new Blob([`${bomCode}${csv}`], { type: 'text/csv;charset=utf-8' })
    FileSaver.saveAs(blob, filename)
  }

  public render() {
    const { children, text } = this.props

    if (typeof children === 'undefined') {
      return (
        <button onClick={this.handleClick} type="button">
          {text ? text : 'Download'}
        </button>
      )
    }

    return (
      <div onClick={this.handleClick} onKeyPress={this.handleClick} role="button" tabIndex={0}>
        {children}
      </div>
    )
  }
}
