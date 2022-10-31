import {FC, useEffect, useState} from 'react'

type IProps = {
  endDate: Date
}

const ReverseTimer: FC<IProps> = (props)=>{
  const leftTime = new Date(props.endDate.getTime()-new Date().getTime())
  const [value, setValue] = useState(leftTime)

  useEffect(()=>{
    const interval = setInterval(()=>setValue(new Date(props.endDate.getTime()-new Date().getTime())), 1000)

    return ()=>{
      clearInterval(interval)
    }
  }, [props.endDate])

  return (
    <div>
      <p>Current time: </p>
      <>{value.getFullYear() - 1970} {value.getMonth()} {value.toLocaleTimeString()}</>
    </div>
  )
}

export default ReverseTimer
