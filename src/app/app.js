import {ipcRenderer as ipc} from 'electron'
import React from 'react'
import LineChart from './linechart'
import BarChart from './barchart'
import PieChart from './piechart'
import Table from './table'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardTitle, CardActions} from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import Ace from 'react-ace'
import 'brace/mode/mysql'
import 'brace/theme/tomorrow'

const Chart = ({type, data}) => {
  if(!data) return null
  switch (type) {
      case 'line':
        return <LineChart data={data}/>
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

export default class App extends React.Component {

  constructor() {
    super()
    this.state = {
      msg: '',
      tab: 'linechart',
      data: null,
      chartType: 'line',
      query: "SELECT camera, WEEK(time) as week, count(*) as count from alpr where year(time) = '2016' group by camera, week"
    }
  }

  componentDidMount() {
    ipc.on('chartData', (e, data) => {
      console.log(data)
      this.setState({data})
    })
  }

  submitQuery(query) {
    ipc.send('getChartData', query)
  }

  render() {
    console.log(this.state)
    return (
      <MuiThemeProvider>
        <div style={{padding: 15}}>
          <Card style={{marginBottom: 15}}>
            <CardTitle title="Chartimatiastic" subtitle="Query settings"/>
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
              wrapEnabled={true}
              name="SQLEDITOR"
              editorProps={{$blockScrolling: true}}
            />
            </CardActions>
            <CardActions>
              <SelectField
                floatingLabelText="Cart Type"
                value = {this.state.chartType}
                onChange ={(e, i, chartType) => this.setState({chartType})}
              >
                <MenuItem value="bar" primaryText="Bar"/>
                <MenuItem value="stackedbar" primaryText="Stacked Bar"/>
                <MenuItem value="line" primaryText="Line"/>
                <MenuItem value="pie" primaryText="Pie"/>
                <MenuItem value="table" primaryText="Table"/>
              </SelectField>
            </CardActions>
            <CardActions>
              <RaisedButton fullWidth={true} primary={true} type="submit" onClick={() => this.submitQuery(this.state.query)}>Go</RaisedButton>
            </CardActions>
          </Card>
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
