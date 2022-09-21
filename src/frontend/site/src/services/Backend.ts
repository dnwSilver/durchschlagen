import {AppToaster} from '../features/Toaster'

const backend = {
  async auth(login: string, password: string): Promise<string | undefined> {
    await fetch('http://0.0.0.0:8080/signin', {
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
        AppToaster.show({
          message: 'Oh no! Everything is broken. We\'ll definitely fix this, I guess.',
          intent: 'danger',
          timeout: 5000
        })

        return undefined
      })

    return undefined
  }
}

export default backend
