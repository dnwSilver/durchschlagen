import {FC, PropsWithChildren, useEffect} from 'react'
import {useNavigate}                      from 'react-router-dom'
import {useRecoilState}                   from 'recoil'
import authTokenAtom                      from '../features/authToken'
import {useCurrentUser}                   from '../hooks/useCurrentUser'

const AuthContainer: FC<PropsWithChildren> = ({children})=>{
  const navigate = useNavigate()
  const user = useCurrentUser()
  const [, setTokenInMemory] = useRecoilState<string>(authTokenAtom)

  useEffect(()=>{
    if(!user){
      navigate('/login', {})
      setTokenInMemory('')
    }
  }, [navigate, setTokenInMemory, user])

  return <>{!user ? null : children}</>
}

export default AuthContainer
