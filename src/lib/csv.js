const newLine = '\r\n';

function createHeader(columns, separator) {
  const header = columns.map(v => {
    return v;
  });
  return header.join(separator) + newLine;
}

function createRows(columns, datas, separator, force) {
  let column = '';
  if (force) {
    column = columns;
  }
  else {
    column = columns.map(v => {
      return v.id;
    });
  }
  const content = datas.map(v => {
    return column.map(k => {
      if (typeof v[k] !== 'undefined') {
        return v[k];
      }
      return '';
    });
  });

  const rows = content.map(v => {
    return v.join(separator);
  });

  return rows.join(newLine);
}

export default function csv(header, datas, separator, noHeader) {
  let column = '';
  let displayHeader = '';
  let displayContent = '';

  if (header) {
    column = header.map(v => {
      if (typeof v.displayName !== 'undefined') {
        return v.displayName;
      }

      return v.id;
    });
  }
  else {
    column = [];
    datas.map(v => {
      Object.keys(v).map(k => {
        if (column.indexOf(k) === -1) {
          column.push(k);
        }
      });
    });
  }

  if (noHeader === false) {
    displayHeader = createHeader(column, separator);
  }

  displayContent = createRows(
    (!header) ? column : header,
    datas,
    separator,
    !header
  );

  return `${displayHeader}${displayContent}`;
}
