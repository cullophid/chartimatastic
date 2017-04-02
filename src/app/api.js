import {ipcRenderer as ipc} from 'electron'
import {v4 as uuid} from 'uuid'
import {curry} from 'ramda'

const rpc = curry((func,  data) =>
  new Promise((resolve, reject) => {
    const token = uuid()
    ipc.send(func, {token, data})
    ipc.once(token, (e, res) => {
      if (res.error) {
        console.error(res.error)
        reject(res.error)
      }
      resolve(res.data)
    })
  })
)


export const queryDb = curry((url, query) => rpc('queryDb', {url, query}))
