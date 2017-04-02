import {ipcRenderer as ipc} from 'electron'
import {path} from 'ramda'
import React from 'react'
import LineChart from './linechart'
import BarChart from './barchart'
import PieChart from './piechart'
import Table from './table'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import {Card, CardTitle, CardActions} from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Ace from 'react-ace'
import * as api from './api'
import 'brace/mode/mysql'
import 'brace/theme/tomorrow'

const Chart = ({type, data}) => {
  if(!data) return null
  switch (type) {
      case 'line':
        return <LineChart data={data}/>
      case 'area':
        return <LineChart area={true} data={data}/>
      case 'bar':
        return <BarChart data={data}/>
      case 'stackedbar':
        return <BarChart data={data} stacked={true}/>
      case 'pie':
        return <PieChart data={data}/>
      case 'table':
        return <Table data={data}/>
      default:
        return null
  }
}

export default class QueryPage extends React.Component {
  constructor() {
    super()
    const dbUrl = localStorage.getItem('dbUrl') || ''
    const query = localStorage.getItem('query') || ''
    const chartType = localStorage.getItem('chartType') || ''
    console.log(dbUrl, query)
    this.state = {
      dbUrl,
      error: null,
      data: null,
      chartType,
      query
    }
  }

  submitQuery() {
    localStorage.setItem('dbUrl', this.state.dbUrl)
    localStorage.setItem('query', this.state.query)
    localStorage.setItem('chartType', this.state.chartType)
    api.queryDb(this.state.dbUrl, this.state.query)
      .then(
        data => this.setState({data, error: null}),
        error => this.setState({error, data: null})
      )
  }

  render() {
    console.log(this.state)
    return (
      <MuiThemeProvider>
        <div style={{padding: 15}}>
          <Dialog
            title="Error"
            actions={[
              <FlatButton
                label="OK"
                fullWidth
                primary
                onTouchTap={() => this.setState({error: null})}
                />
              ]
            }
            modal={false}
            open={this.state.error}
            onRequestClose={() => this.setState({error: null})}
            >
            <p>{path(['state', 'error', 'code'], this)}</p>
          </Dialog>
          <Card style={{marginBottom: 15}}>
            <CardActions>
              <TextField
                floatingLabelText="Database"
                name="databaseurl"
                value={this.state.dbUrl}
                onChange={ e => this.setState({dbUrl: e.target.value})}
                fullWidth
                />
            </CardActions>
          </Card>
          <Card style={{marginBottom: 15}}>
            <CardTitle subtitle="MySQL Query"/>
            <CardActions>
            <Ace
              mode="mysql"
              theme="tomorrow"
              showGutter={false}
              onChange={query => this.setState({query})}
              value={this.state.query}
              maxLines={6}
              minLines={6}
              width='100%'
              wrapEnabled
              name="SQLEDITOR"
              editorProps={{$blockScrolling: true}}
            />
            </CardActions>
            <CardActions>
              <RaisedButton fullWidth primary type="submit" onClick={() => this.submitQuery()}>Go</RaisedButton>
            </CardActions>
          </Card>
          <SelectField
            style={{marginBottom: 15}}
            floatingLabelText="Cart Type"
            value = {this.state.chartType}
            onChange ={(e, i, chartType) => this.setState({chartType})}
          >
            <MenuItem value="bar" primaryText="Bar"/>
            <MenuItem value="stackedbar" primaryText="Stacked Bar"/>
            <MenuItem value="line" primaryText="Line"/>
            <MenuItem value="area" primaryText="Area"/>
            <MenuItem value="pie" primaryText="Pie"/>
            <MenuItem value="table" primaryText="Table"/>
          </SelectField>
          <Card>
            <CardActions>
              <Chart type={this.state.chartType} data={this.state.data}/>
            </CardActions>
          </Card>
        </div>
      </MuiThemeProvider>
    )

  }
}
