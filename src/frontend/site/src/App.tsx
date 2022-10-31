import './App.css'
import {Route, Routes} from 'react-router-dom'
import {RecoilRoot}    from 'recoil'
import UserInfo        from './components/UserInfo/UserInfo'
import Auctions        from './components/Auctions/Auctions'
import LoginForm       from './components/LoginForm/LoginForm'
import 'normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'

function App() {
  return (<RecoilRoot>

      <div className="App">
        <header className="App-header">
          <img alt="durchschlagen" width={52} height={52} src="/logo512.png"/>
          <UserInfo/>
        </header>

        <Routes>
          <Route path="/" element={<Auctions/>}/>
          <Route path="/login" element={<LoginForm/>}/>
        </Routes>

      </div>
    </RecoilRoot>

  )
}

export default App
