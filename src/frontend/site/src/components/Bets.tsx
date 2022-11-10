import {Callout, Spinner}    from '@blueprintjs/core'
import {useEffect, useState} from 'react'
import backend               from '../services/Backend'

const Bets = ()=>{
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    const fetchBets = async ()=>{
      await backend.getBets()
      setLoading(false)
    }

    fetchBets().catch(console.error)
  }, [])

  return <div style={{margin: '2rem'}}>
    {loading&&<Spinner/>}
    {!loading&&<Callout intent="danger" title="😥 Holy cows, how?">
        We were unable to obtain information on your bets.
        <br/>Maybe try later?
    </Callout>}
  </div>
}

export default Bets
