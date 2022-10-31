import React                          from 'react'
import './index.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import {RecoilRoot}                   from 'recoil'
import App                            from './App'
import ReactDOM                       from 'react-dom/client'

const container = document.getElementById('root') as HTMLElement
const root = ReactDOM.createRoot(container!)
root.render(
  <BrowserRouter>
      <Routes>
        <Route path="*" element={<App/>}/>
      </Routes>
  </BrowserRouter>
)
