import {Button, Card, Elevation, FormGroup, InputGroup, Intent} from '@blueprintjs/core'
import {FormEvent, useEffect, useState}                         from 'react'
import {Link, useNavigate}                                      from 'react-router-dom'
import {useRecoilState}                                         from 'recoil'
import PasswordInput                                            from './UIKit/PasswordInput'
import {useCurrentUser}                                         from '../hooks/useCurrentUser'
import authTokenAtom                                            from '../features/authToken'
import {useLocalStorage}                                        from '../hooks/useLocalStorage'
import backend                                                  from '../services/Backend'

const LoginForm = ()=>{
  const [loginIntent, setLoginIntent] = useState<Intent>()
  const [authToken, setToken] = useLocalStorage('token', '')
  const [, setTokenInMemory] = useRecoilState<string>(authTokenAtom)
  const [needUpdateUser, setNeedUpdateUser] = useState<boolean>()
  const user = useCurrentUser()

  let navigate = useNavigate()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const elements = (e.target as any).elements
    const login = elements['login'].value
    const password = elements['password'].value
    setLoginIntent(!login ? 'danger' : undefined)
    if(!(login&&password)){
      return
    }

    const token = await backend.auth(login, password)
    if(token){
      setToken(token)
      setNeedUpdateUser(true)
    }
  }

  useEffect(()=>{
    if(user){
      navigate('/')
      setTokenInMemory(authToken)
    }
  }, [navigate, authToken, setTokenInMemory, user])

  useEffect(()=>{
    if(needUpdateUser){
      navigate('/')
      setTokenInMemory(authToken)
    }
  }, [authToken, navigate, needUpdateUser, setTokenInMemory])

  return <Card style={{width: 400, margin: 'auto'}} elevation={Elevation.TWO}>
    <h1>Sell all you can 💵</h1>
    <form onSubmit={handleSubmit}>
      <FormGroup
        label="Login"
        labelFor="login"
        labelInfo="(required)"
      >
        <InputGroup
          intent={loginIntent}
          id="login"
          onChange={()=>setLoginIntent(undefined)}
          onBlur={()=>setLoginIntent(undefined)}
          placeholder="bran@gmail.com"/>
      </FormGroup>
      <FormGroup
        label="Password"
        labelFor="password"
        labelInfo="(required)">
        <PasswordInput id="password" placeholder="Enter your password..."/>
      </FormGroup>
      <Button type="submit" intent="primary" className="bp3-intent-primary">Submit</Button>
      <Link style={{marginLeft: '1rem'}} to="/registration">Sign up</Link>
    </form>
  </Card>
}

export default LoginForm
