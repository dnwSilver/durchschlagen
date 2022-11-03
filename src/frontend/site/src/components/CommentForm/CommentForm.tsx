import {Button, FormGroup, InputGroup, Intent} from '@blueprintjs/core'
import {FormEvent, useState}                   from 'react'
import backend                                 from '../../services/Backend'

type Props = {
  auctionId: string
  onCommentCreate: ()=>void
}

const CommentForm = (props: Props)=>{
  const [messageIntent, setMessageIntent] = useState<Intent>()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()

    const elements = (e.target as any).elements
    const message = elements['message'].value
    setMessageIntent(!message ? 'danger' : undefined)

    if(message){
      await backend.sendComment(props.auctionId, message).then(()=>props.onCommentCreate())
    }
  }

  return <form onSubmit={handleSubmit}>
    <FormGroup
      label="Message"
      labelFor="message"
      labelInfo="(required)"
    >
      <InputGroup
        intent={messageIntent}
        id="message"
        type="textarea"
        onChange={()=>setMessageIntent(undefined)}
        onBlur={()=>setMessageIntent(undefined)}
        placeholder="What wrong with you man? 😳"/>
    </FormGroup>
    <Button type="submit" intent="primary" className="bp3-intent-primary">✉️ Send comment</Button>

  </form>
}

export default CommentForm
