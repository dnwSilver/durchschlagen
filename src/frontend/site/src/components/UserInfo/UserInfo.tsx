import {FC}             from 'react'
import {Link}           from 'react-router-dom'
import {useRecoilState} from 'recoil'
import authTokenAtom    from '../../features/authToken'

const parseJwt = (token: string)=>{
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    return '%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))

  return JSON.parse(jsonPayload)
}

const UserCard = ({token}: { token: string })=>{
  const user = parseJwt(token)
  return <>{user.login} ({user.email})</>
}

const UserInfo: FC = ()=>{
  const [authToken] = useRecoilState(authTokenAtom)
  return <>{authToken ? <UserCard token={authToken}/> :
    <Link to="/login">Sign in</Link>}</>
}

export default UserInfo
