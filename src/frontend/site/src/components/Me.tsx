import {Card, Label, Spinner} from '@blueprintjs/core'
import {useEffect, useState}  from 'react'
import User                   from '../domain/User'
import {useCurrentUser}       from '../hooks/useCurrentUser'
import backend                from '../services/Backend'

const Me = ()=>{
  const user = useCurrentUser()

  const [me, setMe] = useState<User | null>()
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const fetchMe = async ()=>{
      user&&setMe(await backend.getMe(user.user_id))
      setLoading(false)
    }

    !me&&fetchMe().catch(console.error)
  }, [me, user])

  if(!user){
    return <>You are not sign in! Get out!🚨</>
  }

  if(loading){
    return <Spinner/>
  }

  return <div style={{margin: '2rem'}}>
    <label className="bp4-label .modifier">
      Identifier
      <span className="bp4-text-muted">(required)</span>
      <input className="bp4-input" value={me?.user_id} disabled type="text" placeholder="Text input"
             dir="auto"/>
    </label>
    <label className="bp4-label .modifier">
      Login
      <span className="bp4-text-muted">(required)</span>
      <input className="bp4-input" value={me?.login} disabled type="text" placeholder="Text input"
             dir="auto"/>
    </label>
    <label className="bp4-label .modifier">
      email
      <span className="bp4-text-muted">(required)</span>
      <input className="bp4-input" value={me?.email} disabled type="text" placeholder="Text input"
             dir="auto"/>
    </label>
    <label className="bp4-label .modifier">
      firstname
      <span className="bp4-text-muted">(optional)</span>
      <input className="bp4-input" value={me?.firstName} disabled type="text" placeholder="Text input"
             dir="auto"/>
    </label>
    <label className="bp4-label .modifier">
      lastname
      <span className="bp4-text-muted">(optional)</span>
      <input className="bp4-input" value={me?.lastName} disabled type="text" placeholder="Text input"
             dir="auto"/>
    </label>
  </div>
}

export default Me
