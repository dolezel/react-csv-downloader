import React, { Component } from 'react';
import PropTypes from 'prop-types';
import toCsv from './lib/csv';

const PrefixSuffixType = PropTypes.oneOfType([
  PropTypes.bool,
  PropTypes.string,
  PropTypes.number,
]);

export default class CsvDownload extends Component {
  static propTypes = {
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
  };

  static defaultProps = {
    separator: ',',
    columns: false,
    bom: true,
    noHeader: false,
  };

  state = {
    // eslint-disable-next-line react/destructuring-assignment
    csv: toCsv(this.props.columns, this.props.datas, this.props.separator, this.props.noHeader),
  };

  componentWillReceiveProps(props) {
    this.setState({
      csv: toCsv(props.columns, props.datas, props.separator, props.noHeader),
    });
  }

  handleClick = () => {
    const { suffix, prefix, bom } = this.props;
    const { csv } = this.state;

    const bomCode = bom ? '%EF%BB%BF' : '';
    let { filename } = this.props;

    if (filename.indexOf('.csv') === -1) {
      filename += '.csv';
    }

    if (suffix) {
      if (typeof suffix === 'string' || typeof suffix === 'number') {
        filename = filename.replace('.csv', `_${suffix}.csv`);
      } else {
        filename = filename.replace('.csv', `_${(new Date()).getTime()}.csv`);
      }
    }

    if (prefix) {
      if (typeof prefix === 'string' || typeof prefix === 'number') {
        filename = `${prefix}_${filename}`;
      } else {
        filename = `${(new Date()).getTime()}_${filename}`;
      }
    }

    const a = document.createElement('a');
    const blob = new Blob([`${bomCode}${csv}`], { type: 'text/csv;charset=utf-8' });
    a.textContent = 'download';
    a.download = filename;
    a.href = URL.createObjectURL(blob);
    a.dispatchEvent(new MouseEvent("click", {
      "view": window,
      "bubbles": true,
      "cancelable": false
    }));
  };

  render() {
    const { children, text } = this.props;

    if (typeof children === 'undefined') {
      return (
        <button onClick={this.handleClick} type="button">
          {(() => {
            if (text) {
              return text;
            }
            return 'Download';
          })()}
        </button>
      );
    }

    return (
      <div onClick={this.handleClick} onKeyPress={this.handleClick} role="button" tabIndex={0}>
        {children}
      </div>
    );
  }
}
