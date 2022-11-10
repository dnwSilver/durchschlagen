import {useState, useEffect} from 'react'

function getStorageValue(key: string, defaultValue: string):any {
  // getting stored value
  const saved = localStorage.getItem(key)
  return saved ? saved : defaultValue
}

export const useLocalStorage = (key: string, defaultValue: string)=>{
  const [value, setValue] = useState(()=>{
    return getStorageValue(key, defaultValue)
  })

  useEffect(()=>{
    localStorage.setItem(key, value)
  }, [key, value])

  return [value, setValue]
}
