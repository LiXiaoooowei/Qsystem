import {Router, Route, hashHistory} from 'react-router'
import App from './app/App'
import Counter from './app/counter'
import Printer from './app/printer'
var React = require('react');
var ReactDOM = require('react-dom');


ReactDOM.render((
	<Router history = {hashHistory}>
	<Route path = "/" component = {App} />
	<Route path = "/counter" component = {Counter} />
	<Route path = "/printer" component = {Printer} />
	</Router>
	), document.getElementById('app'));