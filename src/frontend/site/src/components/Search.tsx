import {ChangeEvent, KeyboardEvent, useEffect, useState} from 'react'
import {useNavigate, useSearchParams}                    from 'react-router-dom'

const Search = ()=>{

  const [searchParams, setSearchParams] = useState<string>()
  const [needRedirect, setNeedRedirect] = useState(false)
  const [tempText, setTempText] = useState<string>()
  const navigate = useNavigate()

  const handleSearchTextChange = (e: ChangeEvent<HTMLInputElement>)=>{
    setTempText(e.target.value)
  }

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>)=>{
    if(e.key==='Enter'||e.keyCode===13){
      setSearchParams(tempText)
      setNeedRedirect(true)
    }
  }

  useEffect(()=>{
    if(needRedirect){
      navigate(searchParams ? `/?search=${searchParams}` : '/')
      setNeedRedirect(false)
    }
  }, [navigate, needRedirect, searchParams])

  return <div style={{flexGrow: 1}} className="bp4-input-group">
    <span className="bp4-icon bp4-icon-search"></span>
    <input value={tempText}
           onChange={handleSearchTextChange}
           className="bp4-input"
           type="search"
           onKeyUp={handleKeyUp}
           placeholder="Search input"
           dir="auto"/>
  </div>
}

export default Search
