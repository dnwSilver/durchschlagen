import './App.css'
import {Route, Routes} from 'react-router-dom'
import Auctions        from './components/Auctions/Auctions'
import LoginForm       from './components/LoginForm/LoginForm'
import 'normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img alt="durchschlagen" width={52} height={52} src="/logo512.png"/>
      </header>

      <Routes>
        <Route path="/" element={<Auctions/>}/>
        <Route path="/login" element={<LoginForm/>}/>
      </Routes>

    </div>
  )
}

export default App
