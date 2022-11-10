import {useRecoilState} from 'recoil'
import User             from './../domain/User'
import authTokenAtom    from './../features/authToken'

const parseJwt = (token: string): User=>{
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
    return '%'+('00'+c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))

  return JSON.parse(jsonPayload)
}

export const useCurrentUser = (): User | null=>{
  const [authToken] = useRecoilState(authTokenAtom)
  const currentUser = authToken ? parseJwt(authToken) : null
  if(currentUser&&new Date(currentUser.exp*1000).getTime()>new Date().getTime()){
    document.cookie = `email:${currentUser?.email}`
    return currentUser
  } else
    return null
}
