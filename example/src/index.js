import React from 'react'
import * as ReactDOMClient from 'react-dom/client'
import './index.css'
import App from './App'

const container = document.getElementById('root')
const root = ReactDOMClient.createRoot(container)
root.render(<App />)
