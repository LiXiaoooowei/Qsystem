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
			<ul role = "nav" style = {{"width": "100%", "position": "absolute", "margin-left": "-60px"}}>
			<li><Link to="/">Screen</Link></li>
			<li><Link to="/counter">Counter</Link></li>
			<li><Link to="/printer">Printer</Link></li>
			</ul>
			<div style = {{"margin-left": "500px", "margin-top": "100px"}}><Qlabel /></div>
			<div style = {{"margin-left": "470px", "margin-top": "50px", "display": "inline-block"}}><AddBtn/></div>
			</div>)
	}
})
