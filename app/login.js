import {Link, browserHistory} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
var React = require('react');
var firebase = require('./components/FirebaseClient.js');
var LoginForm = require('./components/login_form');
var Counter = require('./counter');
var MenuFlat = require('./MenuFlat');

class login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false
		};
		this.changeLoginStatus = this.changeLoginStatus.bind(this);
	}
	componentWillMount() {
		firebase.auth().onAuthStateChanged(function(user) {
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
	}
	changeLoginStatus(newValue) {
		this.setState({
			isLoggedIn: newValue
		});
		var contextTypes = { router: React.PropTypes.object };
		if (this.state.isLoggedIn) {
			const location = this.props.location
			browserHistory.push('/counter');
		} else {
			browserHistory.push('/');
		}
	}
	render() {
		return (<div>
			<MenuFlat />
			<div style = {{"margin-left": "400px", "margin-top": "50px", "margin-right": "400px"}}><LoginForm onChange = {this.changeLoginStatus}/></div>
			</div>)

		}
	}

	export default login
