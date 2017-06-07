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
			</ul>
			<div style = {{"margin-left": "35%", "margin-top": "20%", "width": "30%", "text-align": "center"}}><Qlabel /></div>
			<div style = {{"margin-left": "40%", "margin-top": "5%", "width": "20%"}}><AddBtn/></div>
			</div>)
	}
})
