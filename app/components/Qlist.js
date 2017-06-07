var React = require('react');
var ReactDOM = require('react-dom');

var headerStyle_large = {
	"border": "1px solid black",
	"border-collapse": "collapse",
	"width": "100%",
	"text-align": "center",
	"padding": "1rem",
	"float": "right"
};
var entryStyle = {
	"border": "1px solid black",
	"border-collapse": "collapse",
	"padding": "1rem",
	"font-size": "1.5rem"
};

var thStyle = {
	"border": "1px solid black",
	"border-collapse": "collapse",
	"padding": "1rem",
	"background-color": "#ddd",
	"color": "black",
	"font-size": "1.5rem"
}

var Qlist = React.createClass({

	render: function() {
		var length = this.props.queue.length;

		return(
			<table style={headerStyle_large}>
			<tr>
			<th style = {thStyle}>Queue Number</th>
			<th style = {thStyle}>Served by Counter</th>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.queue[length-1]}</td>
			<td style = {entryStyle}>{this.props.counter[length-1]}</td>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.queue[length-2]}</td>
			<td style = {entryStyle}>{this.props.counter[length-2]}</td>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.queue[length-3]}</td>
			<td style = {entryStyle}>{this.props.counter[length-3]}</td>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.queue[length-4]}</td>
			<td style = {entryStyle}>{this.props.counter[length-4]}</td>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.queue[length-5]}</td>
			<td style = {entryStyle}>{this.props.counter[length-5]}</td>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.queue[length-6]}</td>
			<td style = {entryStyle}>{this.props.counter[length-6]}</td>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.queue[length-7]}</td>
			<td style = {entryStyle}>{this.props.counter[length-7]}</td>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.queue[length-8]}</td>
			<td style = {entryStyle}>{this.props.counter[length-8]}</td>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.queue[length-9]}</td>
			<td style = {entryStyle}>{this.props.counter[length-9]}</td>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.queue[length-10]}</td>
			<td style = {entryStyle}>{this.props.counter[length-10]}</td>
			</tr>
			</table>
			);
		}
	});

module.exports = Qlist
