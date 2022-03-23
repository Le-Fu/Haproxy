import React from 'react'
import ReactDOM from 'react-dom'
import Main from './components/main'
import 'antd/dist/antd.css'
import './global.scss'

function App() {
    return (
        <Main />
    )
}

ReactDOM.render(<App />, document.getElementById('root'))

