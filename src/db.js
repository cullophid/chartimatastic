import pg from './postgres'
import mysql from './mysql'

let connections = {}

export const createConnection = url => {
  const conn = url.indexOf('postgres') === 0 ? pg(url) : mysql(url)
  connections[url] = conn
  return conn
}

export default (url, query) => {
  const conn = connections[url] || createConnection(url)
  return conn(query)

}
