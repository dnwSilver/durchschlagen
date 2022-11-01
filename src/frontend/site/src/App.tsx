import './App.css'
import {Icon}                from '@blueprintjs/core'
import {Link, Route, Routes} from 'react-router-dom'
import {RecoilRoot}          from 'recoil'
import AuthContainer         from './components/AuthContainer/AuthContainer'
import AuctionForm           from './components/AuctionForm/AuctionForm'
import UserInfo              from './components/UserInfo/UserInfo'
import Auctions              from './components/Auctions/Auctions'
import LoginForm             from './components/LoginForm/LoginForm'
import 'normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'

function App() {
  return (<RecoilRoot>

      <div className="App">
        <header className="App-header">
          <Link to="/"><img alt="durchschlagen" width={52} height={52} src="/logo512.png"/></Link>
          <Link className="App-link" to="/auction/create"><Icon size={20} icon="add" intent="primary"/>Create
            auction</Link>
          <UserInfo/>
        </header>

        <Routes>
          <Route path="/" element={<Auctions/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/auction/create" element={<AuthContainer><AuctionForm/></AuthContainer>}/>
        </Routes>

      </div>
    </RecoilRoot>

  )
}

export default App
