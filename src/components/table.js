import React from 'react'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import {props} from 'ramda'

export default ({data}) =>
  <Table>
    <TableHeader>
      <TableRow>
        {data.fields.map((col, i) => <TableHeaderColumn key={i}>{col}</TableHeaderColumn>)}
      </TableRow>
    </TableHeader>
    <TableBody>
     {data.data.map((columns, i) =>
      <TableRow key={i}>
        {props(data.fields, columns).map((col, i) => <TableRowColumn key={i}>{col}</TableRowColumn>)}
      </TableRow>
     )}
    </TableBody>
  </Table>
