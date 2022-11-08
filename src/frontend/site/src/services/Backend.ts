import User         from '../domain/User'
import Lot          from '../domain/Lot'
import {AppToaster} from '../features/Toaster'
import Auction      from '../domain/Auction'

const HOST = 'http://193.108.114.36:8080'
// const HOST = 'http://0.0.0.0:8080'

const showUnhandledError = (error: string)=>{
  AppToaster.show({
    message: 'Oh no! Everything is broken 🤦🏻‍♂️. We\'ll definitely fix this, I guess.',
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
  async getAuction(auctionId: string): Promise<Auction> {
    return await fetch(`${HOST}/auctions/${auctionId}`, {
      method: 'get'
    }).then(response=>response.json())
      .then(data=>data)
      .catch((error)=>{
        showUnhandledError(error)
        return []
      })
  },
  async createAuction(auction: any): Promise<number | undefined> {
    return await fetch(`${HOST}/auctions`, {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(auction)
    }).then(response=>response.json())
      .then(data=>{
        AppToaster.show({message: '🥂 Auction created!', intent: 'success', timeout: 1500})
        return data.id
      })
      .catch((error)=>{
        showUnhandledError(error)
        return null
      })
  },
  async sendComment(auctionId: string, message: string): Promise<void> {
    return await fetch(`${HOST}/auctions/${auctionId}/comment`, {
      method: 'post',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({message: message})
    }).then(()=>{
      AppToaster.show({message: '🍸 Comment created!', intent: 'success', timeout: 1500})
    })
      .catch((error)=>{
        showUnhandledError(error)
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
  },

  async getWeather(): Promise<string> {
    return await fetch(`${HOST}/temperature`, {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        service: `${HOST}/weather`
      })
    }).then(response=>response.json())
      .then(data=>data.temperature)
      .catch((error)=>{
        showUnhandledError(error)
        return null
      })
  }
}

export default backend
/*
nano /var/lib/pgsql/11/data/postgresql.conf
listen_addresses = '*'                  # what IP address(es) to listen on;
                                        # comma-separated list of addresses;
                                        # defaults to 'localhost'; use '*' for all
                                        # (change requires restart)
port = 5432                             # (change requires restart)
#max_connections = 100                  # (change requires restart)
*/

/**
 nano /var/lib/pgsql/11/data/pg_hba.conf

 # TYPE  DATABASE        USER            ADDRESS                 METHOD

 # "local" is for Unix domain socket connections only
 local   all             all                                     peer
 # IPv4 local connections:
 host    all             all             0.0.0.0/0               trust
 # IPv6 local connections:
 host    all             all             ::1/128                 md5
 # Allow replication connections from localhost, by a user with the
 # replication privilege.
 local   replication     all                                     peer
 host    replication     all             127.0.0.1/32            ident
 host    replication     all             ::1/128                 ident

 */
