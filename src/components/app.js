//@flow
import electron from 'electron'
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
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import * as api from '../api'
import Editor from './editor'
import AppBar from 'material-ui/AppBar'
import {View, ScrollableView, Layout} from './layout'


const chartTypes = {
  line: {label: 'Line',  component: data => <LineChart data={data}/> },
  bar: {label: 'Bar',  component: data => <BarChart data={data}/> },
  stacked: {label: 'Stacked',  component: data => <BarChart stacked data={data}/> },
  pie: {label: 'Pie',  component: data => <PieChart data={data}/> },
  table: {label: 'Table',  component: data => <Table data={data}/> }
}

const Chart = ({type, data}) =>
  chartTypes[type] ? chartTypes[type].component(data) : null

export default class QueryPage extends React.Component {
  state: {
    error: ?any,
    data: ?any[],
    chartType: string,
    showEditor: bool
  }

  constructor() {
    super()
    const chartType = localStorage.getItem('chartType') || 'line'
    this.state = {
      showEditor: false,
      error: null,
      data: null,
      chartType
    }
  }

  maximize() {
    electron.remote.BrowserWindow.getFocusedWindow().maximize();
  }

  submitQuery(dbUrl:string, query:string) {
    localStorage.setItem('chartType', this.state.chartType)
    api.queryDb(dbUrl, query)
      .then(
        data => this.setState({data, error: null, showEditor: false}),
        error => this.setState({error, data: null, showEditor: false})
      )
  }

  render() {
    console.log(this.state)
    return (
      <MuiThemeProvider>
        <Layout style={{height:'100vh', width: '100vw'}}>
          <View style={{zIndex:1}}>
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
              <p>{path(['state', 'error'], this)}</p>
            </Dialog>
            <AppBar
              style={{WebkitAppRegion: 'drag'}}
              iconClassNameLeft="none"
              iconElementRight={<FlatButton label="Query Editor" />}
              onRightIconButtonTouchTap={() => this.setState({showEditor: true})}
            />
            <Dialog
              title="Query Editor"
              open={this.state.showEditor}
              onRequestClose={() => this.setState({showEditor: false})}
              contentStyle={{
                maxWidth: '90%',
                width: '90%',
              }}
            >
              <Editor submitQuery={(url, query) => this.submitQuery(url, query)}/>
            </Dialog>

            <Paper zDepth={1}>
              <BottomNavigation selectedIndex={Object.keys(chartTypes).indexOf(this.state.chartType)}>
                <BottomNavigationItem
                  label="Line"
                  icon={<FontIcon className="material-icons">show_chart</FontIcon>}
                  onTouchTap={() => this.setState({chartType: 'line'})}
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
          </View>
          <ScrollableView grow={1} shrink={1} style={{padding: 15}}>
            { this.state.data ?
              <Paper>
                  <Chart type={this.state.chartType} data={this.state.data}/>
              </Paper>
              : null
            }
          </ScrollableView>
        </Layout>
      </MuiThemeProvider>
    )
  }
}
