import {FC, useEffect, useState} from 'react'

type IProps = {
  endDate: Date
}

const ReverseTimer: FC<IProps> = (props)=>{
  const [leftTime, setSetLeftTime] = useState(new Date(props.endDate.getTime()-new Date().getTime()))

  useEffect(()=>{
    const interval = setInterval(()=>setSetLeftTime(new Date(props.endDate.getTime()-new Date().getTime())), 1000)

    return ()=>{
      clearInterval(interval)
    }
  }, [props.endDate])

  return (
    <p>
      Finish time:&nbsp;
      {Math.floor(leftTime.getTime()/(1000*60*60*24))} days&nbsp;
      {leftTime.toLocaleString('ru-RU', {hour: 'numeric', minute: 'numeric', second: 'numeric'})}
    </p>
  )
}

export default ReverseTimer
