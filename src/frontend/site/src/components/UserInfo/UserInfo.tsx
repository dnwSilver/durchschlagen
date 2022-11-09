import {FC}             from 'react'
import {Link}           from 'react-router-dom'
import User             from '../../domain/User'
import {useCurrentUser} from '../../hooks/useCurrentUser'

const UserInfo: FC = ()=>{
  const user = useCurrentUser()

  if(user){
    return <>
      {user.login}&nbsp;({user.email})
    </>
  }

  return <>
    <Link to="/login">Sign in</Link>
    <Link to="/registration">Sign up</Link>
  </>
}

export default UserInfo
