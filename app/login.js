import {Link} from 'react-router';
var React = require('react');
var firebase = require('./components/FirebaseClient.js');
var LoginForm = require('./components/login_form');

export default React.createClass({
	render() {
		return (<div> 
			<ul role = "nav">
			<li><Link to="/">Screen</Link></li>
			<li><Link to="/counter">Counter</Link></li>
			<li><Link to="/printer">Printer</Link></li>
			</ul>
			<div style = {{"margin-left": "400px", "margin-top": "50px", "margin-right": "400px"}}><LoginForm /></div>
			</div>)
	}
})