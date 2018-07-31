import React from 'react';
import { hot } from 'react-hot-loader';

import CsvDownloader from '../src';

const App = () => {
  const head = [{
    id: 'first',
    displayName: 'First column',
  }, {
    id: 'second',
    displayName: 'Second column',
  }];

  const datas = [{
    first: 'foo',
    second: 'bar',
  }, {
    first: 'foobar',
    second: 'foobar',
  }];

  return (
    <div>
      <CsvDownloader
        filename="myfile"
        separator=";"
        columns={head}
        datas={datas}
      >
        {' '}
test
        {' '}
      </CsvDownloader>
    </div>
  );
};

export default hot(module)(App);
