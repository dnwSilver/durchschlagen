import {Button, MenuItem}                     from '@blueprintjs/core'
import {ItemPredicate, ItemRenderer, Select2} from '@blueprintjs/select'
import {FC, useEffect, useState}              from 'react'
import backend                                from '../../services/Backend'
import Lot                                    from '../../domain/Lot'

const filterFilm: ItemPredicate<Lot> = (query, lot, _index, exactMatch)=>{
  const normalizedTitle = lot.name?.toLowerCase()
  const normalizedQuery = query.toLowerCase()

  if(exactMatch){
    return normalizedTitle===normalizedQuery
  } else{
    return `${lot.id}. ${normalizedTitle}`.indexOf(normalizedQuery)>=0
  }
}

const renderFilm: ItemRenderer<Lot> = (lot, {handleClick, handleFocus, modifiers})=>{
  if(!modifiers.matchesPredicate){
    return null
  }
  return (
    <MenuItem
      active={modifiers.active}
      disabled={modifiers.disabled}
      key={lot.id}
      label={lot?.name?.toString()}
      onClick={handleClick}
      onFocus={handleFocus}
      roleStructure="listoption"
      text={`${lot.id}. ${lot.name}`}
    />
  )
}

type Props =
  {
    onLotChange: (lot: Lot | undefined)=>void
  }

const LotSelect: FC<Props> = ({onLotChange})=>{

  const [selectedLot, setSelectedLot] = useState<Lot | undefined>()
  useEffect(()=>{
    onLotChange(selectedLot)
  }, [onLotChange, selectedLot])

  const [lots, setLots] = useState<Lot[]>([])

  useEffect(()=>{
    const fetchLots = async ()=>{
      setLots(await backend.getLots())
    }

    fetchLots().catch(console.error)

  }, [])

  return (
    <Select2<Lot>
      items={lots}
      itemPredicate={filterFilm}
      itemRenderer={renderFilm}
      noResults={<MenuItem disabled={true} text="No results." roleStructure="listoption"/>}
      onItemSelect={setSelectedLot}
      popoverProps={{matchTargetWidth: true}}
    >
      <Button fill text={selectedLot?.name} rightIcon="double-caret-vertical" placeholder="Select a lot"/>
    </Select2>
  )
}
export default LotSelect
