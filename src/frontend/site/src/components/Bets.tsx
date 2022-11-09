import {H5, Spinner}         from '@blueprintjs/core'
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
    <H5>My bets</H5>
    {loading&&<Spinner/>}
    {!loading&&'😥 We were unable to obtain information on your bets./n Maybe try later?'}
  </div>
}

export default Bets
