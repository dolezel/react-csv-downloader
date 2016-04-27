import React, { PropTypes, Component } from 'react';
import csv from './lib/csv.js';

const PrefixSuffixType = PropTypes.oneOfType([
  PropTypes.bool,
  PropTypes.string,
  PropTypes.number
]);

export default class CsvDownload extends Component {
  static propTypes = {
    bom: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.array,
      PropTypes.string,
      PropTypes.element
    ]),
    columns: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.array,
      PropTypes.arrayOf(PropTypes.object)
    ]),
    datas: PropTypes.arrayOf(PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.array
    ])).isRequired,
    filename: PropTypes.string.isRequired,
    noHeader: PropTypes.bool,
    prefix: PrefixSuffixType,
    separator: PropTypes.string,
    text: PropTypes.string,
    suffix: PrefixSuffixType
  };

  static defaultProps = {
    separator: ',',
    columns: false,
    bom: true,
    noHeader: false
  };

  constructor(props) {
    super();
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      csv: csv(props.columns, props.datas, props.separator, props.noHeader)
    };
  }

  componentWillReceiveProps(props) {
    this.setState({
      ...this.state,
      csv: csv(props.columns, props.datas, props.separator, props.noHeader)
    });
  }

  isIE() {
    return window.navigator.userAgent.indexOf("MSIE ") > -1 || !!navigator.userAgent.match(/Trident.*rv\:11\./);
  }

  handleClick() {
    const { suffix, prefix, bom, separator } = this.props;

    let bomCode = '';
    let blobBomCode = '';
    let filename = this.props.filename;

    if (filename.indexOf('.csv') === -1) {
      filename += '.csv';
    }

    if (bom) {
      bomCode = '%EF%BB%BF';
      blobBomCode = '\ufeff';
    }

    if (suffix) {
      if (typeof suffix === 'string' || typeof suffix === 'number') {
        filename = filename.replace('.csv', `_${suffix}.csv`);
      }
      else {
        filename = filename.replace('.csv', `_${(new Date()).getTime()}.csv`);
      }
    }

    if (prefix) {
      if (typeof prefix === 'string' || typeof prefix === 'number') {
        filename = `${prefix}_${filename}`;
      }
      else {
        filename = `${(new Date()).getTime()}_${filename}`;
      }
    }

    if (this.isIE()) {
      if (window.Blob && window.navigator.msSaveOrOpenBlob) {
        const blob = new Blob([`${blobBomCode}${this.state.csv}`]);
        window.navigator.msSaveOrOpenBlob(blob, filename);
      }
      else {
        const iframe = document.createElement('iframe');
        document.body.appendChild(iframe);
        iframe.document.open('text/html', 'replace');
        iframe.document.write(`sep=${separator}\r\n${bomCode}${this.state.csv}`);
        iframe.document.close();
        iframe.focus();
        iframe.document.execCommand('SaveAs', true, filename);
        document.body.removeChild(iframe);
      }
    }
    else {
      const a = document.createElement('a');
      a.textContent = 'download';
      a.download = filename;
      a.href = `data:text/csv;charset=utf-8,${bomCode}${encodeURIComponent(this.state.csv)}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  render() {
    const { children, text } = this.props;

    if (typeof children === 'undefined') {
      return (
        <button onClick={this.handleClick}>
          {(() => {
            if (text) {
              return text;
            }
            return `Download`;
          })()}
        </button>
      );
    }

    return (
      <div onClick={this.handleClick}>
        {children}
      </div>
    );
  }
}
