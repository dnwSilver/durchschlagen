import {Card, Icon}          from '@blueprintjs/core'
import {useEffect, useState} from 'react'
import ReverseTimer          from '../ReverseTimer/ReverseTimer'
import backend, {Auction}    from '../../services/Backend'
import styles                from './Auctions.module.css'
// Create our number formatter.
var formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'

  // These options are needed to round to whole numbers if that's what you want.
  //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
  //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
})

const Auctions = ()=>{
  const [auctions, setAuctions] = useState<Auction[]>([])

  useEffect(()=>{
    const fetchAuctions = async ()=>{
      setAuctions(await backend.getAuctions())
    }

    fetchAuctions().catch(console.error)

  }, [])

  return <div className={styles.auctions}>
    {auctions.map(auction=><Card elevation={3} className={styles.auction}>
      <h3>{auction.status==='ACTIVE'
        ? <Icon icon="take-action" intent="primary"/>
        : <Icon icon="endorsed" intent="none"/>} {auction.title}</h3>
      <header>Redemption price {formatter.format(auction.cost)}</header>
      {auction.lot.name}
      <footer>{auction.owner}</footer>
      {auction.status==='ACTIVE'&&<ReverseTimer endDate={new Date(auction.end)}/>}
    </Card>)}
  </div>
}

export default Auctions
