import * as FileSaver from 'file-saver'
import * as React from 'react'

import toCsv, { ICsvProps } from './lib/csv'

export type PrefixSuffix = boolean | string | number

export interface ICsvDownloadProps extends ICsvProps {
  bom: boolean
  filename: string
  prefix: PrefixSuffix
  text?: string
  suffix: PrefixSuffix
  [key: string]: any
}

type DefaultProps = 'bom' | 'columns' | 'noHeader' | 'separator'

export default class CsvDownload extends React.Component<ICsvDownloadProps> {
  public static defaultProps: Pick<ICsvDownloadProps, DefaultProps> = {
    bom: true,
    columns: false,
    noHeader: false,
    separator: ',',
  }

  public handleClick = async () => {
    const { suffix, prefix, bom } = this.props
    const csv = await toCsv(this.props)

    const bomCode = bom ? '\ufeff' : ''
    let { filename } = this.props

    if (filename.indexOf('.csv') === -1) {
      filename += '.csv'
    }

    if (suffix) {
      filename =
        typeof suffix === 'string' || typeof suffix === 'number'
          ? filename.replace('.csv', `_${suffix}.csv`)
          : filename.replace('.csv', `_${new Date().getTime()}.csv`)
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
      suffix, prefix, bom,
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
