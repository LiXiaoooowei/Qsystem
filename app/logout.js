import {Link, browserHistory} from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';
var React = require('react');
var firebase = require('./components/FirebaseClient.js');
var login = require('./login');


class logout extends React.Component {
	constructor(props) {
		super(props);
		this.logOut = this.logOut.bind(this);
	}
	logOut() {
		firebase.auth().signOut().then(function() {
			alert("signed out success");
		},function(error) {
            alert("signout error");
		});
	}
	render() {
		this.logOut();
		browserHistory.push('/login');
		return null;
	}
}

export default logout