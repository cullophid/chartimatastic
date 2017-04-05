//@flow weak
import mysql from 'mysql'
import {pluck} from 'ramda'

export default url => {
  const conn = mysql.createPool(url)
  return query =>
    new Promise((resolve, reject) =>
      conn.query(query, (err, data, fields) => {
        err ? reject(err) : resolve({data, fields: pluck('name', fields)})
      })
    )
}
