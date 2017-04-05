//@flow
import React from 'react'

type FlexDirection = 'row' | 'column'

type LayoutProps = {
  children?: React.Children,
  flexDirection?: ?FlexDirection,
  style?:Object
}
 const layoutStyle = props =>
  Object.assign(
    {},
    {
      display: 'flex',
      flexDirection: props.flextDirection || 'column'
    },
    props.style || {}
  )

export const Layout = (props:LayoutProps) =>
  <div
    style={layoutStyle(props)}
  >
    {props.children}
  </div>

type ViewProps = {
  children?: React.Children,
  grow?: number,
  shrink?: number,
  style?: Object
}

const viewStyle = props => Object.assign(
  {},
  {
    flexGrow: props.grow || 0,
    flexShrink: props.grow || 0
  },
  props.style || {}
)

export const View = (props: ViewProps) =>
  <div
    style={viewStyle(props)}
  >
    {props.children}
  </div>

export const ScrollableView = (props: ViewProps) =>
  <div
    style={Object.assign({}, viewStyle(props), {overflowY:'auto'})}
  >
    {props.children}
  </div>
