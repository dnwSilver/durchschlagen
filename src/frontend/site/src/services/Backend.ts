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
const HOST = 'http://10.200.19.20:8080'

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
    await fetch(`${HOST}/signin`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({login, password})
    }).then(response=>{
      if(response.ok){
        AppToaster.show({message: 'Verification passed successfully!', intent: 'success', timeout: 1500})
        // @ts-ignore
        return response.json().token
      } else{
        AppToaster.show({message: 'Incorrect login or password.', intent: 'warning', timeout: 1500})
        return undefined
      }
    })
      .catch((error)=>{
        showUnhandledError(error)
        return undefined
      })

    return undefined
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
  }
}

export default backend
