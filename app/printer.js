import {Link} from 'react-router';
var React = require('react');
var AddBtn = require('./components/AddBtn');
var Qlist = require('./components/Qlist.js');
var Qlabel = require('./components/QueueLabel.js');
var MenuFlat = require('./MenuFlat');

export default React.createClass({
	getInitialState: function() {
		return {
			queue: new Array(),
			counter: new Array()
		};
	},
	render() {
		return (<div>
			<MenuFlat />
			<div style = {{"margin-left": "35%", "margin-top": "20%", "width": "30%", "text-align": "center"}}><Qlabel /></div>
			<div style = {{"margin-left": "40%", "margin-top": "5%", "width": "20%"}}><AddBtn/></div>
			</div>)
		}
	})
