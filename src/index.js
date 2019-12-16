import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FileSaver from 'file-saver';

import toCsv from './lib/csv';

export default class CsvDownload extends Component {
  handleClick = () => {
    const {
      suffix, prefix, bom, columns, datas, separator, noHeader, wrapColumnChar,
    } = this.props;
    const csv = toCsv(columns, datas, separator, noHeader, wrapColumnChar);

    const bomCode = bom ? '\ufeff' : '';
    let { filename } = this.props;

    if (filename.indexOf('.csv') < 0) {
      filename += '.csv';
    }

    if (suffix) {
      filename = typeof suffix === 'string' || typeof suffix === 'number'
        ? filename.replace('.csv', `_${suffix}.csv`)
        : filename.replace('.csv', `_${(new Date()).getTime()}.csv`);
    }

    if (prefix) {
      filename = typeof prefix === 'string' || typeof prefix === 'number'
        ? `${prefix}_${filename}`
        : `${(new Date()).getTime()}_${filename}`;
    }

    const blob = new Blob([`${bomCode}${csv}`], { type: 'text/csv;charset=utf-8' });
    FileSaver.saveAs(blob, filename);
  };

  render() {
    const { children, text } = this.props;

    return typeof children === 'undefined'
      ? (
        <button onClick={this.handleClick} type="button">
          {text || 'Download'}
        </button>
      )
      : (
        <div onClick={this.handleClick} onKeyPress={this.handleClick} role="button" tabIndex={0}>
          {children}
        </div>
      );
  }
}

const PrefixSuffixType = PropTypes.oneOfType([
  PropTypes.bool,
  PropTypes.string,
  PropTypes.number,
]);

CsvDownload.propTypes = {
  bom: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.element,
  ]),
  columns: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.array,
    PropTypes.arrayOf(PropTypes.object),
  ]),
  datas: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ])).isRequired,
  filename: PropTypes.string.isRequired,
  noHeader: PropTypes.bool,
  prefix: PrefixSuffixType,
  separator: PropTypes.string,
  text: PropTypes.string,
  suffix: PrefixSuffixType,
  wrapColumnChar: PropTypes.string,
};

CsvDownload.defaultProps = {
  separator: ',',
  columns: false,
  bom: true,
  noHeader: false,
};
