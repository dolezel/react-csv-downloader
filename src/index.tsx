import * as FileSaver from 'file-saver'
import * as React from 'react'

import toCsv, { ICsvProps } from './lib/csv'

export type PrefixSuffix = boolean | string | number

export interface ICsvDownloadProps extends ICsvProps, Omit<React.HTMLAttributes<HTMLDivElement | HTMLButtonElement>, 'prefix'> {
  bom?: boolean
  filename: string
  prefix?: PrefixSuffix
  suffix?: PrefixSuffix
  text?: string
}

export default class CsvDownload extends React.Component<ICsvDownloadProps> {
  public handleClick = async () => {
    const { suffix, prefix, bom } = this.props
    let { filename } = this.props
    const csv = await toCsv(this.props)

    const bomCode = bom !== false ? '\ufeff' : ''

    if (filename.indexOf('.xlsx') === -1) {
      filename += '.xlsx'
    }

    if (suffix) {
      filename =
        typeof suffix === 'string' || typeof suffix === 'number'
          ? filename.replace('.xlsx', `_${suffix}.xlsx`)
          : filename.replace('.xlsx', `_${new Date().getTime()}.xlsx`)
    }

    if (prefix) {
      filename =
        typeof prefix === 'string' || typeof prefix === 'number'
          ? `${prefix}_${filename}`
          : `${new Date().getTime()}_${filename}`
    }

    const blob = new Blob([`${bomCode}${csv}`], { type: 'text/csv;charset=utf-8' })
    FileSaver.saveAs(blob, filename)
  }

  public render() {
    const {
      children, text,
      filename, suffix, prefix, bom,
      columns, datas, separator, noHeader, wrapColumnChar, newLineAtEnd, chunkSize,
      ...props
    } = this.props

    if (typeof children === 'undefined') {
      return (
        <button type="button" {...props} onClick={this.handleClick}>
          {text ? text : 'Download'}
        </button>
      )
    }

    return (
      <div role="button" tabIndex={0} {...props} onClick={this.handleClick} onKeyPress={this.handleClick}>
        {children}
      </div>
    )
  }
}
