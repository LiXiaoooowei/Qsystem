var React = require('react');
var ReactDOM = require('react-dom');

var headerStyle = {
	"border": "1px solid black",
	"border-collapse": "collapse",
	"width": "400px",
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

var Qlist = React.createClass({

	render: function() {
		return(
			<table style={headerStyle}>
			<tr>
			<th style = {thStyle}>Queue Number</th>
			<th style = {thStyle}>Served by Counter</th>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.queue[0]}</td>
			<td style = {entryStyle}>{this.props.counter[0]}</td>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.queue[1]}</td>
			<td style = {entryStyle}>{this.props.counter[1]}</td>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.queue[2]}</td>
			<td style = {entryStyle}>{this.props.counter[2]}</td>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.queue[3]}</td>
			<td style = {entryStyle}>{this.props.counter[3]}</td>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.queue[4]}</td>
			<td style = {entryStyle}>{this.props.counter[4]}</td>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.queue[5]}</td>
			<td style = {entryStyle}>{this.props.counter[5]}</td>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.queue[6]}</td>
			<td style = {entryStyle}>{this.props.counter[6]}</td>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.queue[7]}</td>
			<td style = {entryStyle}>{this.props.counter[7]}</td>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.queue[8]}</td>
			<td style = {entryStyle}>{this.props.counter[8]}</td>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.queue[9]}</td>
			<td style = {entryStyle}>{this.props.counter[9]}</td>
			</tr>
			</table>
			);
		}
	});

module.exports = Qlist