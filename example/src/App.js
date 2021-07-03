import React from 'react'
import logo from './logo.svg'
import './App.css'

import CsvDownloader from 'react-csv-downloader'

const head = [
  {
    id: 'first',
    displayName: 'First column',
  },
  {
    id: 'second',
    displayName: 'Second column',
  },
]

const datas = [
  {
    first: 'foo',
    second: 'bar',
  },
  {
    first: 'foobar',
    second: 'foobar',
  },
]

const asyncComputeDatas = async () => {
  return Promise.resolve(datas)
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CsvDownloader filename="myfile" separator=";" columns={head} datas={datas} />

        <CsvDownloader
          filename="myfile"
          separator=";"
          columns={head}
          datas={asyncComputeDatas}
          text="Using Async Callback to Compute Datas"
        />
      </header>
    </div>
  )
}

export default App
