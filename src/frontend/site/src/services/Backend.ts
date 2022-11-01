import User         from '../domain/User'
import Lot          from '../domain/Lot'
import {AppToaster} from '../features/Toaster'

export type Auction = {
  status: 'ACTIVE' | 'CLOSE'
  owner: string
  title: string
  end: string
  cost: number
  lot: {
    name: string
  }
}
const HOST = 'http://0.0.0.0:8080'

const showUnhandledError = (error: string)=>{
  AppToaster.show({
    message: 'Oh no! Everything is broken. We\'ll definitely fix this, I guess.',
    intent: 'danger',
    timeout: 5000
  })
  console.error(error)
}

const backend = {
  async auth(login: string, password: string): Promise<string | undefined> {
    return await fetch(`${HOST}/signin`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({login, password})
    })
      .then(response=>response.json())
      .then(data=>{
        if(data.token){
          AppToaster.show({message: 'Verification passed successfully!', intent: 'success', timeout: 1500})
          return data.token
        } else{
          AppToaster.show({message: 'Incorrect login or password.', intent: 'warning', timeout: 1500})
          return undefined
        }
      })
      .catch((error)=>{
        showUnhandledError(error)
        return undefined
      })
  },
  async getAuctions(): Promise<Auction[]> {
    return await fetch(`${HOST}/auctions`, {
      method: 'get'
    }).then(response=>response.json())
      .then(data=>data)
      .catch((error)=>{
        showUnhandledError(error)
        return []
      })
  },
  async getLots(): Promise<Lot[]> {
    return await fetch(`${HOST}/lots`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(response=>response.json())
      .then(data=>data)
      .catch((error)=>{
        showUnhandledError(error)
        return []
      })
  },
  async getMe(): Promise<User | null> {
    return await fetch(`${HOST}/signin`, {
      method: 'get',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(response=>response.json())
      .then(data=>data)
      .catch((error)=>{
        showUnhandledError(error)
        return null
      })
  }

}

export default backend
