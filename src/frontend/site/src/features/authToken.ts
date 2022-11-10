import {atom} from 'recoil'

const authToken = atom({
  key: 'authToken',
  default: localStorage.getItem('token')||''
})

export default authToken
