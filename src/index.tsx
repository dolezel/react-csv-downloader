import * as FileSaver from 'file-saver'
import * as React from 'react'

import toCsv, { ICsvProps } from './lib/csv'

export { toCsv, ICsvProps }

export type PrefixSuffix = boolean | string | number

export interface ICsvDownloadProps
  extends ICsvProps,
    Omit<React.HTMLAttributes<HTMLDivElement | HTMLButtonElement>, 'prefix'> {
  bom?: boolean
  filename: string
  extension?: string
  prefix?: PrefixSuffix
  suffix?: PrefixSuffix
  text?: string
  disabled?: boolean
  meta?: boolean
  handleError?: (err: unknown) => void
  handleEmpty?: () => void
  title?: string
}

export default class CsvDownload extends React.Component<ICsvDownloadProps> {
  public handleClick = async () => {
    const { suffix, prefix, bom, extension, disabled, meta, separator, handleError, handleEmpty } = this.props

    if (disabled) {
      return
    }

    let { filename } = this.props
    let csv: string | void
    try {
      csv = await toCsv(this.props)
    } catch (err) {
      return handleError?.(err)
    }
    if (!csv) {
      if (handleEmpty) {
        return handleEmpty()
      } else {
        csv = ''
      }
    }
    const bomCode = bom !== false ? '\ufeff' : ''
    const metaContent = meta ? `sep=${separator}\r\n` : ''

    const resolvedExtension = extension || '.csv'
    if (filename.indexOf(resolvedExtension) === -1) {
      filename += resolvedExtension
    }

    if (suffix) {
      filename =
        typeof suffix === 'string' || typeof suffix === 'number'
          ? filename.replace(resolvedExtension, `_${suffix}${resolvedExtension}`)
          : filename.replace(resolvedExtension, `_${new Date().getTime()}${resolvedExtension}`)
    }

    if (prefix) {
      filename =
        typeof prefix === 'string' || typeof prefix === 'number'
          ? `${prefix}_${filename}`
          : `${new Date().getTime()}_${filename}`
    }

    const blob = new Blob([`${bomCode}${metaContent}${csv}`], {
      type: 'text/csv;charset=utf-8',
    })
    FileSaver.saveAs(blob, filename)
  }

  public render() {
    const {
      children,
      text,
      disabled,
      /* eslint-disable @typescript-eslint/no-unused-vars */
      bom,
      filename,
      extension,
      prefix,
      suffix,
      meta,
      handleError,
      handleEmpty,
      columns,
      datas,
      separator,
      noHeader,
      wrapColumnChar,
      newLineAtEnd,
      chunkSize,
      /* eslint-enable @typescript-eslint/no-unused-vars */
      ...props
    } = this.props

    if (typeof children === 'undefined') {
      return (
        <button type="button" {...props} onClick={this.handleClick} disabled={disabled}>
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
