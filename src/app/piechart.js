//@flow weak

import React from 'react'
import {PieChart, Cell, XAxis, YAxis, Pie, ResponsiveContainer, Tooltip} from 'recharts'
import {head, pluck, keys, omit, nth, compose, groupBy, prop, uniq, indexBy, values, map, merge} from 'ramda'

const colors = [
  '#4A148C',
  '#AD1457',
  '#0277BD',
  '#7CB342',
  '#FF8F00'
]

export default (props) => {
  if (!props.data) return <h1>Run SQL query...</h1>
  const {fields, data} = props.data
  const [nameKey, valueKey] = fields
  return (
    <ResponsiveContainer height={500} width="100%">
      <PieChart margin={{right: 40, top: 40, bottom: 40}}>
        <Tooltip/>
        <Pie
          data={data}
          legend={true}
          nameKey={nameKey}
          fill={colors[1]}
          valueKey={valueKey}
          innerRadius={100}
          paddingAngle={1}
          />
      </PieChart>
    </ResponsiveContainer>
  )

}
