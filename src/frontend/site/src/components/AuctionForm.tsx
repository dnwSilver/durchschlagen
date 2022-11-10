import {Button, Card, Elevation, FormGroup, InputGroup, Intent} from '@blueprintjs/core'
import {FormEvent, useEffect, useState}                         from 'react'
import {useNavigate}                                            from 'react-router-dom'
import LotSelect                                                from './LotSelect'
import Lot                                                      from '../domain/Lot'
import {useCurrentUser}                                         from '../hooks/useCurrentUser'
import backend                                                  from '../services/Backend'

const AuctionForm = ()=>{
  const [titleIntent, setTitleIntent] = useState<Intent>()
  const [costIntent, setCostIntent] = useState<Intent>()
  const [finishIntent, setFinishIntent] = useState<Intent>()
  const [selectedLot, setSetSelectedLot] = useState<Lot | undefined>()
  const user = useCurrentUser()
  const [createdAuctionId, setCreatedAuctionId] = useState<number>()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    const elements = (e.target as any).elements
    const title = elements['title'].value
    setTitleIntent(!title ? 'danger' : undefined)

    const cost = elements['cost'].value
    setCostIntent(!cost ? 'danger' : undefined)

    const finish = new Date(elements['finish'].value)
    setFinishIntent((!finish||isNaN(finish.getTime())) ? 'danger' : undefined)

    if(title&&cost&& !isNaN(finish.getTime())&&user?.user_id&&selectedLot?.id){
      const auctionId = await backend.createAuction({
        title,
        cost,
        end: new Date(finish).getTime()/1000,
        owner_id: user?.user_id,
        lot_id: selectedLot?.id
      })
      auctionId&&setCreatedAuctionId(auctionId)
    }
  }

  const handleLotChange = (lot: Lot | undefined)=>{
    setSetSelectedLot(lot)
  }

  useEffect(()=>{
    createdAuctionId&&navigate(`/auction/${createdAuctionId}`)
  }, [navigate, createdAuctionId])

  return <Card style={{width: 400, margin: 'auto'}} elevation={Elevation.TWO}>
    <h1>Create your auction</h1>
    <form onSubmit={handleSubmit}>
      <FormGroup
        label="Title"
        labelFor="title"
        labelInfo="(required)"
      >
        <InputGroup
          intent={titleIntent}
          id="title"
          onChange={()=>setTitleIntent(undefined)}
          onBlur={()=>setTitleIntent(undefined)}
          placeholder="Freedom Flag"/>
      </FormGroup>
      <FormGroup
        label="Redemption price"
        labelFor="cost"
        labelInfo="(required)"
      >
        <InputGroup
          intent={costIntent}
          id="cost"
          onChange={(event)=>{
            event.target.value = event.target.value.replaceAll(/\D+/g, '')
            setCostIntent(undefined)
          }}
          onBlur={()=>setCostIntent(undefined)}
          placeholder="12000"/>
      </FormGroup>
      <FormGroup
        label="Finish date"
        labelFor="finish"
        labelInfo="(required)"
      >
        <InputGroup
          intent={finishIntent}
          id="finish"
          onChange={()=>setFinishIntent(undefined)}
          onBlur={()=>setFinishIntent(undefined)}
          placeholder="2022/07/23"/>
      </FormGroup>
      <FormGroup
        label="Lot"
        labelFor="lotId"
        labelInfo="(required)">
        <LotSelect onLotChange={handleLotChange}/>
      </FormGroup>
      <Button type="submit" intent="primary" className="bp3-intent-primary">Submit</Button>
    </form>
  </Card>
}

export default AuctionForm
