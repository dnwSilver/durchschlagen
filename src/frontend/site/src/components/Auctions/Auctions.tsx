import {Card, Icon}          from '@blueprintjs/core'
import {useEffect, useState} from 'react'
import {Link}                from 'react-router-dom'
import ReverseTimer          from '../ReverseTimer/ReverseTimer'
import backend, {Auction}    from '../../services/Backend'
import styles                from './Auctions.module.css'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

const Auctions = ()=>{
  const [auctions, setAuctions] = useState<Auction[]>([])

  useEffect(()=>{
    const fetchAuctions = async ()=>{
      setAuctions(await backend.getAuctions())
    }

    fetchAuctions().catch(console.error)

  }, [])

  return <>
    <div className={styles.auctions}>
      {auctions.map((auction, idx)=><Card key={idx} elevation={3} className={styles.auction}>
        <h3>{auction.status==='ACTIVE'
          ? <Icon icon="take-action" intent="primary"/>
          : <Icon icon="endorsed" intent="none"/>} {auction.title}</h3>
        <header>Redemption price {formatter.format(auction.cost)}</header>
        {auction.lot.name}
        <footer>{auction.owner}</footer>
        {auction.status==='ACTIVE'&&<ReverseTimer endDate={new Date(auction.end)}/>}
      </Card>)}
    </div>
  </>
}

export default Auctions
