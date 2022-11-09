import {Card, Spinner}                    from '@blueprintjs/core'
import {useCallback, useEffect, useState} from 'react'
import {Link, useParams}                  from 'react-router-dom'
import CommentForm                        from '../../components/CommentForm/CommentForm'
import Auction                            from '../../domain/Auction'
import {useCurrentUser}                   from '../../hooks/useCurrentUser'
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
  const user = useCurrentUser()
  const [auction, setAuction] = useState<Auction>()
  const [loading, setLoading] = useState(true)

  let {auctionId} = useParams()

  const updateComments = useCallback(()=>{
    const fetchAuctions = async ()=>{
      auctionId&&setAuction(await backend.getAuction(auctionId))
      setLoading(false)
    }

    fetchAuctions().catch(console.error)
  }, [auctionId])

  useEffect(()=>{
    updateComments()

  }, [auctionId, updateComments])

  if(loading){
    return <Spinner/>
  }

  if(!auction){
    return <>🤷‍♂️ Not found auction!</>
  }

  return <div style={{display: 'flex', justifyContent: 'center'}}>
    <div style={{height: '60vh'}}>
      <Card style={{width: 400, height: '80%', margin: 'auto'}}>
        <AuctionInfo auction={auction}/>
      </Card>
      <Card style={{width: 400, height: '20%', margin: 'auto'}}>
        {user&&<CommentForm onCommentCreate={updateComments} auctionId={auction.id.toString()}/>}
        {!user&&<>
            <p>😢</p>
            <i>If you want to comment please <Link to="/login">sign in</Link> or <Link to="/registration">sign
                up</Link> first.</i>
        </>
        }
      </Card>
    </div>

    <Card style={{width: 400, height: '60vh', overflow: 'scroll'}}>
      {auction?.comments.map((comment, idx)=>{
        XSSExploit(comment.message)
        return <div key={idx} style={{textAlign: 'start'}}>
          <span style={{fontSize: '0.75em'}}>{comment.owner}</span>
          <p dangerouslySetInnerHTML={{__html: comment.message||''}}/>
        </div>
      })}
    </Card>
  </div>
}

export default AuctionFullInfo
