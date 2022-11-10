import {Card, NonIdealState, Spinner} from '@blueprintjs/core'
import {useEffect, useState}          from 'react'
import {useSearchParams}              from 'react-router-dom'
import AuctionInfo                    from './AuctionInfo'
import backend                        from '../services/Backend'
import styles                         from './Auctions.module.css'
import Auction                        from '../domain/Auction'

const Auctions = ()=>{
  const [auctions, setAuctions] = useState<Auction[]>([])
  const [loading, setLoading] = useState(true)
  const [searchParams] = useSearchParams()

  useEffect(()=>{
    const fetchAuctions = async ()=>{
      setAuctions(await backend.getAuctions(searchParams.get('search')))
      setLoading(false)
    }

    fetchAuctions().catch(console.error)

  }, [searchParams])

  return <div className={styles.auctions}>
    {loading ? <Spinner aria-label={'Loading...'}/> :
      <>
        {
          auctions.map((auction, idx)=><Card key={idx} elevation={3} className={styles.auction}>
            <AuctionInfo auction={auction}/>
          </Card>)
        }
        {auctions.length===0&&<NonIdealState
            icon="search"
            title="No search results"
            description="Your search didn't match any auctions.
Try searching for something else, or create a new auction."
            action={undefined}
        />}
      </>
    }
  </div>
}

export default Auctions
