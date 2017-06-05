import {Router, Route, browserHistory} from 'react-router'
import App from './app/App'
import Counter from './app/counter'
import Printer from './app/printer'
import Login from './app/login'
import Firebase from './app/components/FirebaseClient'

var React = require('react');
var ReactDOM = require('react-dom');

var Home = React.createClass({
	getInitialState: function() {
		return {
			isLoggedIn: false
		};
	},
	componentWillMount: function() {
		Firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				this.setState({
					isLoggedIn: true
				});
			} else {
				this.setState({
					isLoggedIn: false
				});
			}
		}.bind(this));
	},
	shouldComponentUpdate: function() {
		return this.state.isLoggedIn;
	},
	requireAuth: function(nextState,replace) {
		if (!this.state.isLoggedIn) {
			replace({pathname: '/login',
				state: {
					nextPathname: nextState.location.pathname
				}
		});
		}
	},
	render: function() {
		return (
			<Router history = {browserHistory}>
			<Route path = "/" component = {App} />
			<Route path = "/counter" component = {Counter} onEnter = {this.requireAuth}/>
			<Route path = "/login" component = {Login} />
			<Route path = "/printer" component = {Printer} />
			</Router>
			)
		}
	});

	ReactDOM.render(<Home />, document.getElementById('app'));

