import {Spinner, SpinnerSize} from '@blueprintjs/core'
import {useEffect, useState}  from 'react'
import backend                from '../services/Backend'

const WeatherWidget = ()=>{
  const [loading, setLoading] = useState(true)
  const [weather, setWeather] = useState<string>()

  useEffect(()=>{
    const fetchWeather = async ()=>{
      setWeather(await backend.getWeather())
      setLoading(false)
    }

    fetchWeather().catch(console.error)
  }, [])

  if(loading){
    return <Spinner size={SpinnerSize.SMALL}/>
  }

  return <>{weather}</>
}

export default WeatherWidget
