//@flow weak
import rpc from './rpc-renderer'
import {curry} from 'ramda'

export const queryDb = curry((url, query) => rpc('queryDb', {url, query}))
