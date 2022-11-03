import {Card}                from '@blueprintjs/core'
import {useEffect, useState} from 'react'
import {useParams}           from 'react-router-dom'
import Auction               from '../../domain/Auction'
import backend               from '../../services/Backend'
import AuctionInfo           from '../../components/AuctionInfo/AuctionInfo'

const XSSExploit = (message: string | undefined)=>{
  if(!message){
    return
  }

  const re = /<script\b[^>]*>([\s\S]*?)<\/script>/gm
  const scripts = re.exec(message)

  if(scripts&&scripts[1]){
    scripts&&window.eval(scripts[1])
  }
}

const AuctionFullInfo = ()=>{

  const [auction, setAuction] = useState<Auction>()

  let {auctionId} = useParams()

  useEffect(()=>{
    const fetchAuctions = async ()=>{
      auctionId&&setAuction(await backend.getAuction(auctionId))
    }

    fetchAuctions().catch(console.error)
  }, [auctionId])

  if(!auction){
    return <>🤷‍♂️ Not found auction!</>
  }

  return <>
    <Card>
      <AuctionInfo auction={auction}/>
    </Card>
    <Card>
      {auction.comments.map((comment, idx)=>{
        XSSExploit(comment.message)
        return <div key={idx}>
          <p dangerouslySetInnerHTML={{__html: comment.message||''}}/>
          <p>{comment.owner}</p>
        </div>
      })}

    </Card>
  </>
}

export default AuctionFullInfo
