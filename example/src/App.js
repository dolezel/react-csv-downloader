import React from 'react';
import logo from './logo.svg';
import './App.css';

import CsvDownloader from 'react-csv-downloader';

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

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CsvDownloader
          filename="myfile"
          separator=";"
          columns={head}
          datas={datas}
        />
      </header>
    </div>
  );
}

export default App;
