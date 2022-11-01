import {FC}             from 'react'
import {Link}           from 'react-router-dom'
import User             from '../../domain/User'
import {useCurrentUser} from '../../hooks/useCurrentUser'

const UserCard = ({user}: { user: User })=>{
  return <>{user.login} ({user.email})</>
}

const UserInfo: FC = ()=>{
  const user = useCurrentUser()
  return <>{user ? <UserCard user={user}/> :
    <Link to="/login">Sign in</Link>}</>
}

export default UserInfo
