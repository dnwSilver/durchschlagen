import {Card}          from '@blueprintjs/core'
import {useEffect, useState} from 'react'
import AuctionInfo           from '../../components/AuctionInfo/AuctionInfo'
import backend               from '../../services/Backend'
import styles                from './Auctions.module.css'
import Auction               from '../../domain/Auction'

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
        <AuctionInfo auction={auction}/>
      </Card>)}
    </div>
  </>
}

export default Auctions
