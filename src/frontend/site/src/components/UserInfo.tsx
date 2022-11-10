import {Button, Classes, Drawer} from '@blueprintjs/core'
import {FC, useState}            from 'react'
import {Link}                    from 'react-router-dom'
import {useCurrentUser}          from '../hooks/useCurrentUser'
import Bets                      from './Bets'
import Me                        from './Me'

const UserInfo: FC = ()=>{
  const user = useCurrentUser()
  const [isOpen, setIsOpen] = useState(false)
  const handleOpen = ()=>{
    setIsOpen(true)
  }
  const handleClose = ()=>{
    setIsOpen(false)
  }
  if(user){
    return <>
      <Button intent="primary" icon="user" onClick={handleOpen}>{user.login}&nbsp;({user.email})</Button>
      <Drawer
        icon="user"
        title="User Information"
        isOpen={isOpen}
        onClose={handleClose} hasBackdrop>
        <Me/>
        <hr/>
        <Bets/>
        <div style={{position: 'absolute', width: '100%', bottom: 0}} className={Classes.DRAWER_FOOTER}>☝ Best user
          ever!️
        </div>
      </Drawer>
    </>
  }

  return <>
    <Link to="/login"> Sign in</Link>
    <Link to="/registration">Sign up</Link>
  </>
}

export default UserInfo
