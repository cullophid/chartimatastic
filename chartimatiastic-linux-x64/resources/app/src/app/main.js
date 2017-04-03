//@flow weak
import injectTapEventPlugin from 'react-tap-event-plugin';
import React from 'react'
const h = React.createElement
import {render} from 'react-dom'
import App from './app'
injectTapEventPlugin();

render(h(App), document.getElementById('main'))
