//@flow weak
import React from 'react'
import {any, keys} from 'ramda'


export default (f) =>
  React.createClass({
    shouldComponentUpdate(newProps) {
      return keys(newProps).length !== keys(this.props).length ||
        any(k => newProps[k] !== this.props[k], keys(newProps))
    },
    render() {
      return f(this.props)
    }
  })
