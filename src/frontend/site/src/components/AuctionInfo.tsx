import {Icon}       from '@blueprintjs/core'
import {Link}       from 'react-router-dom'
import ReverseTimer from './ReverseTimer'
import Auction      from '../domain/Auction'

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

const AuctionInfo = ({auction}: { auction: Auction })=>{
  return <>
    <Link to={'/auction/'+auction.id}><h3>{auction.status==='ACTIVE'
      ? <Icon icon="take-action" intent="primary"/>
      : <Icon icon="endorsed" intent="none"/>} {auction.title}</h3></Link>
    <header>Redemption price {formatter.format(auction.cost)}</header>
    {auction.lot.name}
    <footer>{auction.owner}</footer>
    {auction.status==='ACTIVE'&&<ReverseTimer endDate={new Date(auction.end)}/>}
  </>
}

export default AuctionInfo
