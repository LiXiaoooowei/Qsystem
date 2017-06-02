import {Link} from 'react-router';
var React = require('react');
var AddBtn = require('./components/AddBtn');
var Qlist = require('./components/Qlist.js');
var Qlabel = require('./components/QueueLabel.js');

export default React.createClass({
	getInitialState: function() {
		return {
			queue: new Array(),
			counter: new Array()
		};
	},
	render() {
		return (<div> 
			<ul role = "nav">
			<li><Link to="/">Screen</Link></li>
			<li><Link to="/counter">Counter</Link></li>
			<li><Link to="/printer">Printer</Link></li>
			<li style = {{"float": "right"}}><Link to="/login">Log In</Link></li>
			</ul>
			<div style = {{"margin-left": "500px", "margin-top": "100px"}}><Qlabel /></div>
			<div style = {{"margin-left": "470px", "margin-top": "50px","margin-right": "470px", "display": "inline-block"}}><AddBtn/></div>
			</div>)
	}
})

