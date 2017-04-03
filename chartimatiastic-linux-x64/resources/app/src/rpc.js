//@flow weak
import {ipcMain as ipc} from 'electron'

export default (name, f) =>
  ipc.on(name, (e, {token, data}) =>
    f(data)
      .then(
        data => e.sender.send(token, {data}),
        error => e.sender.send(token, {error})
      )
  )
