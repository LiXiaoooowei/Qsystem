var React = require('react');
var ReactDOM = require('react-dom');

var headerStyle = {
	"border": "1px solid black",
	"border-collapse": "collapse",
	"width": "250px",
	"text-align": "center",
	"padding": 15,
	"float": "right"
};
var entryStyle = {
	"border": "1px solid black",
	"border-collapse": "collapse",
	"padding": 15,
	"font-size": 40
};

var thStyle = {
	"border": "1px solid black",
	"border-collapse": "collapse",
	"padding": 15,
	"background-color": "#ddd",
	"color": "black",
	"font-size": 20
}

var Qwait = React.createClass({

	render: function() {
		return(
			<div>
			<table style={headerStyle}>
			<tr>
			<th style = {thStyle}>Queueing</th>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.qwait[0]}</td>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.qwait[1]}</td>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.qwait[2]}</td>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.qwait[3]}</td>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.qwait[4]}</td>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.qwait[5]}</td>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.qwait[6]}</td>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.qwait[7]}</td>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.qwait[8]}</td>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.qwait[9]}</td>
			</tr>
			</table>
			</div>
			);
		}
	});

module.exports = Qwait