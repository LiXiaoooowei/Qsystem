import {Link, browserHistory} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
var React = require('react');
var firebase = require('./components/FirebaseClient.js');
var LoginForm = require('./components/login_form');
var Counter = require('./counter');
var MenuFlat = require('./MenuFlat');
var MenuCollapse = require('./MenuCollapse');

var WINDOW_WIDTH_MOBILE = 480;
var WINDOW_WIDTH_TABLET_PORTRAIT = 768;
var WINDOW_WIDTH_TABLET_LANDSCAPE = 1024;
var WINDOW_WIDTH_LAPTOP = 1600;

var login_large = {
	"width": "50%",
	"margin-left": "25%",
	"margin-top": "10%"
};
var login_medium = {
	"width": "70%",
	"margin-left": "15%",
	"margin-top": "10%"
};
var login_small = {
	"width": "90%",
	"margin-left": "5%",
	"margin-top": "10%"
};
class login extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false,
			height: null,
			width: null
		};
		this.changeLoginStatus = this.changeLoginStatus.bind(this);
		this.updateDimensions = this.updateDimensions.bind(this);
	}
	componentWillMount() {
		this.updateDimensions();
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
	updateDimensions() {
		this.setState({
			width: window.innerWidth,
			height: window.innerHeight
		});
	}
	componentDidMount() {
		window.addEventListener("resize", this.updateDimensions);
	}
	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions);
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
		if (this.state.width > WINDOW_WIDTH_MOBILE) {
			return (<div>
				<MenuFlat />
				<div style = {this.state.width > WINDOW_WIDTH_TABLET_PORTRAIT? login_large: (this.state.width > WINDOW_WIDTH_MOBILE? login_medium: login_small)}><LoginForm onChange = {this.changeLoginStatus}/></div>
				</div>)
			} else {
				return (<div>
					<MenuCollapse />
					<div style = {this.state.width > WINDOW_WIDTH_TABLET_PORTRAIT? login_large: (this.state.width > WINDOW_WIDTH_MOBILE? login_medium: login_small)}><LoginForm onChange = {this.changeLoginStatus}/></div>
					</div>)
				}
			}
		}

		export default login
