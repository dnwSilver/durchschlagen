import {Card}                             from '@blueprintjs/core'
import {useCallback, useEffect, useState} from 'react'
import {useParams}                        from 'react-router-dom'
import CommentForm                        from '../../components/CommentForm/CommentForm'
import Auction                            from '../../domain/Auction'
import backend                            from '../../services/Backend'
import AuctionInfo                        from '../../components/AuctionInfo/AuctionInfo'

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
  const [loading, setLoading] = useState(true)

  let {auctionId} = useParams()

  const updateComments = useCallback(()=>{
    const fetchAuctions = async ()=>{
      auctionId&&setAuction(await backend.getAuction(auctionId))
    }

    fetchAuctions().catch(console.error)
  }, [auctionId])

  useEffect(()=>{
    updateComments()
  }, [auctionId, updateComments])

  if(!auction){
    return <>🤷‍♂️ Not found auction!</>
  }

  return <>
    <Card style={{width: 400, margin: 'auto'}}>
      <AuctionInfo auction={auction}/>
    </Card>
    <Card style={{width: 400, margin: 'auto'}}>
      <CommentForm onCommentCreate={updateComments} auctionId={auction.id.toString()}/>
    </Card>
    <Card style={{width: 400, margin: 'auto'}}>
      {auction.comments.map((comment, idx)=>{
        XSSExploit(comment.message)
        return <div key={idx} style={{display: 'flex', justifyContent: 'space-between'}}>
          <p dangerouslySetInnerHTML={{__html: comment.message||''}}/>
          <p>{comment.owner}</p>
        </div>
      })}
    </Card>
  </>
}

export default AuctionFullInfo
