//@flow weak
import {ipcRenderer as ipc} from 'electron'
import React from 'react'
import LineChart from './line-chart'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardMedia, CardActions} from 'material-ui/Card'

export default class App extends React.Component {
  state: {msg: '', data:null, query: ''}
  constructor() {
    super()
    this.state = {
      msg: '',
      data: null,
      query: `SELECT camera, WEEK(time) as week, count(*) as count from alpr where year(time) = '2016' group by camera, week`}
  }
  componentDidMount() {
    ipc.on('chartData', (e, data) => {
      console.log(data)
      this.setState({data})
    })
  }

  queryChange (query) {
    this.setState({query})
  }

  submitQuery(e) {
    e.preventDefault()
    ipc.send('getChartData', this.state.query)
  }

  render() {
    return (
      <MuiThemeProvider>
        <div style={{padding: 15}}>
          <Card style={{marginBottom: 15}}>
            <form onSubmit={e => this.submitQuery(e)}>
              <CardActions>
                <TextField
                  hintText="SQL Query"
                  fullWidth={true}
                  multiLine={true}
                  rows={5}
                  value={this.state.query}
                  onChange={e => this.queryChange(e.target.value)}
                  />
              </CardActions>
              <CardActions>
                <RaisedButton primary={true} type="submit">Go</RaisedButton>
              </CardActions>
            </form>
          </Card>
          <Card>
            <CardMedia>
              <LineChart data={this.state.data}/>
            </CardMedia>
          </Card>
        </div>
      </MuiThemeProvider>
    )

  }
}
