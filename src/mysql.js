//@flow weak
import mysql from 'mysql'
import {pluck} from 'ramda'

let connections = {}

export const createConnection = url => {
  const conn = mysql.createConnection(url)
  connections[url] = conn
  return conn
}

export default (url, query) => {
  console.log('cached?', !!connections[url])
  const conn = connections[url] || createConnection(url)
  return new Promise((resolve, reject) =>
    conn.query(query, (err, data, fields) => {
      err ? reject(err) : resolve({data, fields: pluck('name', fields)})
    })
  )
}
