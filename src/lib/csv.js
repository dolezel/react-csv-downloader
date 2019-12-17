const newLine = '\r\n';

export default function csv(columns, datas, separator = ',', noHeader = false, wrapColumnChar = '') {
  const columnOrder = columns
    ? columns.map((v) => (typeof v === 'string' ? v : v.id))
    : datas.reduce(
      (acc, v) => (Array.isArray(v) ? acc : acc.concat(Object.keys(v))),
      [],
    ).filter((value, index, self) => self.indexOf(value) === index);

  const content = [];

  if (!noHeader && columnOrder.length > 0) {
    const headers = columns
      ? columns.map((v) => {
        if (typeof v === 'string') {
          return v;
        } if (typeof v.displayName !== 'undefined') {
          return v.displayName;
        }
        return v.id;
      })
      : columnOrder;
    content.push(headers.map((header) => wrapColumnChar + header + wrapColumnChar).join(separator));
  }

  if (Array.isArray(datas)) {
    datas.map((v) => (Array.isArray(v)
      ? v
      : columnOrder.map((k) => (typeof v[k] === 'undefined' ? '' : v[k])))).forEach((v) => {
      content.push(v.map((colVal) => wrapColumnChar + colVal + wrapColumnChar).join(separator));
    });
  }

  return content.join(newLine);
}
