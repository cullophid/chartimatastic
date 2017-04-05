//@flow weak

import React from 'react'
import {PieChart, Cell, XAxis, YAxis, Pie, ResponsiveContainer, Tooltip, Legend} from 'recharts'
import {head, pluck, keys, omit, nth, compose, groupBy, prop, uniq, indexBy, values, map, merge} from 'ramda'
import lazy from '../lazy'

const COLORS = [
  '#4A148C',
  '#AD1457',
  '#0277BD',
  '#7CB342',
  '#FF8F00',
  '#E91E63',
  '#00838F',
  '#009688',
  '#F57C00',
  '#F4511E',
  '#FFEB3B'
]

const color = i => COLORS[i % COLORS.length]


export default lazy((props) => {
  if (!props.data) return <h1>Run SQL query...</h1>
  const {fields, data} = props.data
  const [nameKey, valueKey] = fields
  return (
    <ResponsiveContainer height={500} width="100%">
      <PieChart margin={{right: 40, top: 40, bottom: 40}}>
        <Legend
          height={1}
          iconType="round"
        />
        <Tooltip/>
        <Pie
          data={data}
          label={true}
          nameKey={nameKey}
          valueKey={valueKey}
          innerRadius={120}
          paddingAngle={1}
          >
          { data.map((e, i) => <Cell key={i} fill={color(i)}/>)}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )

})
