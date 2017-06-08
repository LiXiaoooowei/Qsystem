import {Link} from 'react-router';
var React = require('react');
var AddBtn = require('./components/AddBtn');
var Qlist = require('./components/Qlist.js');
var Qlabel = require('./components/QueueLabel.js');
var MenuFlat = require('./MenuFlat');
var MenuCollapse = require('./MenuCollapse');

var WINDOW_WIDTH_MOBILE = 480;
var WINDOW_WIDTH_TABLET_PORTRAIT = 768;
var WINDOW_WIDTH_TABLET_LANDSCAPE = 1024;
var WINDOW_WIDTH_LAPTOP = 1600;

export default React.createClass({
	getInitialState: function() {
		return {
			queue: new Array(),
			counter: new Array(),
			height: null,
			width: null
		};
	},
	componentWillMount: function() {
		this.updateDimensions();
	},
	updateDimensions: function() {
		this.setState({
			width: window.innerWidth,
			height: window.innerHeight
		});
	},
	componentDidMount: function() {
		window.addEventListener("resize", this.updateDimensions);
	},
	componentWillUnmount: function() {
		window.removeEventListener("resize", this.updateDimensions);
	},
	render() {
		if (this.state.width > WINDOW_WIDTH_MOBILE){
			return (
				<div>
				<MenuFlat />
				<div style = {{"margin-left": "25%", "margin-top": "20%", "width": "50%", "text-align": "center"}}><Qlabel /></div>
				<div style = {{"margin-left": "40%", "margin-top": "5%", "width": "20%"}}><AddBtn/></div>
				</div>)
			} else {
				return (
				<div>
				<MenuCollapse />
				<div style = {{"margin-left": "25%", "margin-top": "20%", "width": "50%", "text-align": "center"}}><Qlabel /></div>
				<div style = {{"margin-left": "25%", "margin-top": "5%", "width": "50%"}}><AddBtn/></div>
				</div>)
			}
		}
	})
