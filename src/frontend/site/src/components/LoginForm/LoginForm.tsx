import {Button, Card, Elevation, FormGroup, InputGroup, Intent} from '@blueprintjs/core'
import {FormEvent, useState}                                    from 'react'
import backend                                                  from '../../services/Backend'
import styles                                                   from './LoginForm.module.css'

const LoginForm = ()=>{
  const [showPassword, setShowPassword] = useState(false)
  const [loginIntent, setLoginIntent] = useState<Intent>()
  const [passwordIntent, setPasswordIntent] = useState<Intent>()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const elements = (e.target as any).elements
    const login = elements['login'].value
    const password = elements['password'].value
    setLoginIntent(!login ? 'danger' : undefined)
    setPasswordIntent(!elements['password'].value ? 'danger' : undefined)

    if(!(login&&password)){
      return
    }

    const token = await backend.auth(login, password)
    if(token){

    }
  }
  return <>
    <Card className={styles.login} elevation={Elevation.TWO}>
      <h1>Create account</h1>
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
          <InputGroup
            placeholder="Enter your password..."
            id="password"
            intent={passwordIntent}
            type={showPassword ? 'text' : 'password'}
            onChange={()=>setPasswordIntent(undefined)}
            onBlur={()=>setPasswordIntent(undefined)}
            rightElement={
              <Button
                icon={showPassword ? 'unlock' : 'lock'}
                intent="primary"
                minimal={true}
                onClick={()=>setShowPassword(!showPassword)}
              />}
          />
        </FormGroup>
        <Button type="submit" intent="primary" className="bp3-intent-primary">Submit</Button>
      </form>
    </Card>
  </>
}

export default LoginForm
