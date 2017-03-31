//@flow weak
import mysql from 'mysql'
import {pluck} from 'ramda'

const conn = mysql.createConnection('mysql://sentia:tigerwaterclockboulder@alpr.cluster-cizexdu9ykby.eu-west-1.rds.amazonaws.com:3306/realdania')

export default query =>
  new Promise((resolve, reject) =>
    conn.query(query, (err, data, fields) => {
      err ? reject(err) : resolve({data, fields: pluck('name', fields)})
    })
  )
