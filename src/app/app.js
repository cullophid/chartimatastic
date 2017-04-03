import {ipcRenderer as ipc} from 'electron'
import {path} from 'ramda'
import React from 'react'
import LineChart from './linechart'
import BarChart from './barchart'
import PieChart from './piechart'
import Table from './table'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper'
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation'
import FontIcon from 'material-ui/FontIcon'
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


const chartTypes = {
  line: {label: 'Line',  component: data => <LineChart data={data}/> },
  area: {label: 'Area',  component: data => <LineChart area data={data}/> },
  bar: {label: 'Bar',  component: data => <BarChart data={data}/> },
  stacked: {label: 'Stacked',  component: data => <BarChart stacked data={data}/> },
  pie: {label: 'Pie',  component: data => <PieChart data={data}/> },
  table: {label: 'Table',  component: data => <Table data={data}/> }
}

const Chart = ({type, data}) =>
  chartTypes[type] ? chartTypes[type].component(data) : null


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
        <div style={{padding: 15, paddingTop: 30}}>
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
            open={!!this.state.error}
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
          <Paper zDepth={1} style={{marginBottom: 15}}>
            <BottomNavigation selectedIndex={Object.keys(chartTypes).indexOf(this.state.chartType)}>
              <BottomNavigationItem
                label="Line"
                icon={<FontIcon className="material-icons">show_chart</FontIcon>}
                onTouchTap={() => this.setState({chartType: 'line'})}
              />
              <BottomNavigationItem
                label="Area"
                icon={<FontIcon className="material-icons">show_chart</FontIcon>}
                onTouchTap={() => this.setState({chartType: 'area'})}
              />
              <BottomNavigationItem
                label="Bar"
                icon={<FontIcon className="material-icons">insert_chart</FontIcon>}
                onTouchTap={() => this.setState({chartType: 'bar'})}
              />
              <BottomNavigationItem
                label="Stacked"
                icon={<FontIcon className="material-icons">insert_chart</FontIcon>}
                onTouchTap={() => this.setState({chartType: 'stacked'})}
              />
              <BottomNavigationItem
                label="Pie"
                icon={<FontIcon className="material-icons">pie_chart</FontIcon>}
                onTouchTap={() => this.setState({chartType: 'pie'})}
              />
              <BottomNavigationItem
                label="Table"
                icon={<FontIcon className="material-icons">grid_on</FontIcon>}
                onTouchTap={() => this.setState({chartType: 'table'})}
              />
           </BottomNavigation>
         </Paper>
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
