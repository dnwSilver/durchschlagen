import {Button, InputGroup, Intent} from '@blueprintjs/core'
import {CSSProperties, useState}    from 'react'

type Props = {
  id: string
  placeholder: string
  style?: CSSProperties
}

const PasswordInput = (props: Props)=>{
  const [show, setShow] = useState(false)
  const [intent, setIntent] = useState<Intent>()

  return <InputGroup
    style={props.style}
    placeholder={props.placeholder}
    id={props.id}
    intent={intent}
    type={show ? 'text' : 'password'}
    onChange={(e)=>{
      setIntent(!e.target.value ? 'danger' : undefined)
    }}
    onBlur={()=>setIntent(undefined)}
    rightElement={
      <Button
        icon={show ? 'unlock' : 'lock'}
        intent="primary"
        minimal={true}
        onClick={()=>setShow(!show)}
      />}
  />
}

export default PasswordInput
