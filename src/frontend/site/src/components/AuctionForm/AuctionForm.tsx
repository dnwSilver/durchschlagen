import {Button, Card, Elevation, FormGroup, InputGroup, Intent} from '@blueprintjs/core'
import {FormEvent, useEffect, useState}                         from 'react'
import {useNavigate}                                            from 'react-router-dom'
import backend                                                  from '../../services/Backend'
import LotSelect                                                from '../../components/LotSelect/LotSelect'
import Lot                                                      from '../../domain/Lot'
import {useCurrentUser}                                         from '../../hooks/useCurrentUser'

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

    const finish = elements['finish'].value
    setFinishIntent(!finish ? 'danger' : undefined)

    if(title&&cost&&finish&&user?.user_id&&selectedLot?.id){
      const auctionId = await backend.createAuction({
        title,
        cost,
        end: finish,
        owner_id: user?.user_id,
        lot_id: selectedLot?.id
      })
      console.log(auctionId)
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
          onChange={()=>setCostIntent(undefined)}
          onBlur={()=>setCostIntent(undefined)}
          placeholder="1233"/>
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
          placeholder="23.07.2022"/>
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
