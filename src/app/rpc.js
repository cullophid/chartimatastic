import {ipcRenderer as ipc} from 'electron'
import {curry} from 'ramda'
import {v4 as uuid} from 'uuid'


export default curry((name, data) =>
  new Promise((resolve, reject) => {
    const token = uuid()
    ipc.send(name, {token, data})
    ipc.once(token, (e, res) =>
      res.error ? reject(res.error) : resolve(res.data)
    )
  })
)
