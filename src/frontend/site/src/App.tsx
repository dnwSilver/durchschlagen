import './App.css'
import {Button}                           from '@blueprintjs/core'
import {Link, Route, Routes, useNavigate} from 'react-router-dom'
import {RecoilRoot}                       from 'recoil'
import Instruction                        from './components/Instruction/Instruction'
import Search                             from './components/Search/Search'
import WeatherWidget                      from './components/WeatherWidget/WeatherWidget'
import Auction                            from './components/Auction/Auction'
import AuthContainer                      from './components/AuthContainer/AuthContainer'
import AuctionForm                        from './components/AuctionForm/AuctionForm'
import UserInfo                           from './components/UserInfo/UserInfo'
import Auctions                           from './components/Auctions/Auctions'
import LoginForm                          from './components/LoginForm/LoginForm'
import 'normalize.css'
import '@blueprintjs/core/lib/css/blueprint.css'
import '@blueprintjs/icons/lib/css/blueprint-icons.css'
import RegistrationForm                   from './components/RegistrationForm/RegistrationForm'

function App() {
  const navigate = useNavigate()
  return (<RecoilRoot>

      <div className="App">
        <header className="App-header">
          <Link style={{height: '30px'}} to="/">
            <img
              alt="durchschlagen"
              width={30}
              height={30}
              src="/logo512.png"/>
          </Link>
          <Button rightIcon="take-action" intent="success" text="New auction"
                  onClick={()=>navigate('/auction/create')}/>
          <Search/>
          <WeatherWidget/>
          <UserInfo/>
        </header>
        <Instruction/>
        <Routes>
          <Route path="/" element={<Auctions/>}/>
          <Route path="/login" element={<LoginForm/>}/>
          <Route path="/registration" element={<RegistrationForm/>}/>
          <Route path="/ping" element={<>Pong</>}/>
          <Route path="/auction/:auctionId" element={<Auction/>}/>
          <Route path="/auction/create" element={<AuthContainer><AuctionForm/></AuthContainer>}/>
        </Routes>

      </div>
    </RecoilRoot>

  )
}

export default App
