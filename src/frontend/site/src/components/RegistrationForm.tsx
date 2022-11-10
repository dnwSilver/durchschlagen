import {Button, Card, Elevation, FormGroup, InputGroup} from '@blueprintjs/core'
import {FormEvent, useEffect, useState}                 from 'react'
import Marquee                                          from 'react-fast-marquee'
import {useNavigate}                                    from 'react-router-dom'
import {AppToaster}                                     from '../features/Toaster'
import backend                                          from '../services/Backend'
import PasswordInput                                    from './UIKit/PasswordInput'

const RegistrationForm = ()=>{
  const [needRedirect, setNeedRedirect] = useState<boolean>()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const elements = (e.target as any).elements
    const login = elements['login'].value
    const email = elements['email'].value
    const firstname = elements['firstname'].value
    const lastname = elements['lastname'].value
    const password = elements['password'].value
    const passwordRepeat = elements['password-repeat'].value
    if(!(login&&password&&passwordRepeat&&email&&firstname&&lastname)){
      AppToaster.show({message: '😡All fields required!', intent: 'warning', timeout: 1500})

      return
    }

    if(password!==passwordRepeat){
      AppToaster.show({message: '🙄Passwords do not match!', intent: 'warning', timeout: 1500})

      return
    }

    await backend.register(login, email, password, firstname, lastname)
    setNeedRedirect(true)
  }

  useEffect(()=>{
    if(needRedirect){
      navigate('/login')
    }
  }, [navigate, needRedirect])

  return <Card style={{width: 400, margin: 'auto'}} elevation={Elevation.TWO}>
    <h1>Create your account</h1>
    <Marquee style={{color: 'red', fontSize: '1.5rem', marginBottom: '1rem'}}> Attention ☝️! Don't use real password
      🙅🏾‍♂️. This site
      completely full of holes. </Marquee>
    <form onSubmit={handleSubmit}>
      <FormGroup
        label="Identification"
        labelFor="login"
        labelInfo="(required)"
      >
        <InputGroup style={{marginBottom: '1rem'}} id="login" placeholder="Enter your login"/>
        <InputGroup style={{marginBottom: '1rem'}} id="email" placeholder="Enter your email"/>
        <InputGroup style={{marginBottom: '1rem'}} id="firstname" placeholder="Enter your firstname"/>
        <InputGroup id="lastname" placeholder="Enter your lastname"/>
      </FormGroup>
      <FormGroup
        label="Password"
        labelFor="password"
        labelInfo="(required)">

        <PasswordInput style={{marginBottom: '1rem'}} id="password" placeholder="Enter your password..."/>
        <PasswordInput id="password-repeat" placeholder="Repeat your password..."/>
      </FormGroup>
      <Button type="submit" intent="primary" className="bp3-intent-primary">Submit</Button>

    </form>
  </Card>
}

export default RegistrationForm
