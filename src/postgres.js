import pg from 'pg'
import {parse} from 'pg-connection-string'
import {pluck} from 'ramda'

export default url => {
  const pool = new pg.Pool(parse(url))
  return query =>
    pool.query(query)
      .then(({rows: data, fields}) => ({data, fields: pluck('name', fields)}))
}
