import React from 'react';
import ReactDOM from 'react-dom';
import CsvDownloader from '../src/index.js';

class App extends React.Component {
  render() {
    const head = [{
      id: 'first',
      displayName: 'First column'
    }, {
      id: 'second',
      displayName: 'Second column'
    }];

    const datas = [{
      first: 'foo',
      second: 'bar'
    }, {
      first: 'foobar',
      second: 'foobar'
    }];

    return (
      <div>
        <CsvDownloader
          filename="myfile"
          separator=";"
          columns={head}
          datas={datas} > test </CsvDownloader>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('app'));
