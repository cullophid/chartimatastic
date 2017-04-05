//@flow weak

import React from 'react'
import {BarChart, XAxis, YAxis, Bar, ResponsiveContainer, Tooltip} from 'recharts'
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

const prepDataPoint = (x, y, key) => data =>
  merge(
    compose(map(prop(y)), indexBy(prop(key)))(data),
    {[x]: data[0][x]}
  )

const prepData = (x, y, key) =>
  compose(values, map(prepDataPoint(x, y, key)), groupBy(prop(x)))

const renderBar = isStacked => (s, i) =>
  isStacked ? <Bar key={i} stackId="a" type="monotone" dataKey={s} stroke={color(i)} fill={color(i)} /> :
  <Bar key={i} type="monotone" dataKey={s} stroke={color(i)} fill={color(i)} />


export default lazy((props) => {
  if (!props.data) return <h1>Run SQL query...</h1>
  const {fields, data} = props.data
  const x = nth(-2, fields)
  const y = nth(-1, fields)
  const chartData = fields.length === 3 ?  prepData(x, y, head(fields))(data) : data

  const series = fields.length === 3 ? uniq(pluck(fields[0], data)) : [y]
  console.log(x, y, series)
  console.log(chartData)

  return (
    <ResponsiveContainer height={500} width="100%">
      <BarChart data={chartData} margin={{right: 40, top: 40, bottom: 40}}>
        <Tooltip/>
        <XAxis label={fields[0]} tickLine={false} dataKey={x} stroke="#aaa"/>
        <YAxis label={fields[1]} tickLine={false} stroke="#aaa"/>
        {series.map(renderBar(props.stacked)) }
      </BarChart>
    </ResponsiveContainer>
  )

})
