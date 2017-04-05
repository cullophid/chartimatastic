//@flow
import React from 'react'
import {Card, CardActions, CardTitle} from 'material-ui/Card'
import FontIcon from 'material-ui/FontIcon'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {ipcRenderer as ipc} from 'electron'
import Ace from 'react-ace'
import 'brace/mode/mysql'
import 'brace/theme/tomorrow'

type Props = {
  submitQuery: Function
}

type State = {
  dbUrl: string,
  query: string,
}

export default class Editor extends React.Component {
  props: Props
  state: State
  appMenuItemClicked: Function
  constructor() {
    super()
    const dbUrl = localStorage.getItem('dbUrl') || ''
    const query = localStorage.getItem('query') || ''
    this.appMenuItemClicked = (e, item) => item.label === 'Run Query' && this.submitQuery()
    this.state = { query, dbUrl }
  }
  componentDidMount() {
    ipc.on('AppMenuItemClicked', this.appMenuItemClicked)
  }
  componentWillUnmount() {
    ipc.removeListener('AppMenuItemClicked', this.appMenuItemClicked)
  }


  submitQuery() {
    localStorage.setItem('dbUrl', this.state.dbUrl)
    localStorage.setItem('query', this.state.query)
    this.props.submitQuery(this.state.dbUrl, this.state.query)
  }

  render () {
    const {dbUrl, query} = this.state
    return (
      <div>
        <Card style={{marginBottom: 15, marginTop: 15}}>
          <CardActions>
            <TextField
              floatingLabelText="Database"
              name="databaseurl"
              value={dbUrl}
              onChange={ e => this.setState({dbUrl: e.target.value})}
              fullWidth
              />
          </CardActions>
        </Card>
        <Card style={{marginBottom: 15}}>
          <CardActions>
            <Ace
              mode="mysql"
              theme="tomorrow"
              showGutter={false}
              onChange={query => this.setState({query})}
              value={query}
              maxLines={6}
              minLines={6}
              width='100%'
              wrapEnabled
              name="SQLEDITOR"
              editorProps={{$blockScrolling: true}}
            />
          </CardActions>
        </Card>
        <RaisedButton fullWidth primary type="submit" onClick={() => this.submitQuery()}>Go</RaisedButton>
      </div>
    )
  }
}
