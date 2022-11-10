import Comment from './Comment'

type Auction = {
  id: number
  status: 'ACTIVE' | 'CLOSE'
  owner: string
  title: string
  end: string
  cost: number
  lot: {
    name: string
  }
  comments: Comment[]
}

export default Auction
