var React = require('react');
var PplLeftLabel = require('./PplWaitLabel');

var headerStyle = {
	"border": "1px solid black",
	"border-collapse": "collapse",
	"width": "100%",
	"text-align": "center",
	"padding": "1rem"
};
var entryStyle = {
	"border": "1px solid lightgray",
	"border-collapse": "collapse",
	"padding": "1rem",
	"font-size": "1.5rem",
	"color": "#E1B873"
};

var thStyle = {
	"border": "1px solid lightgray",
	"border-collapse": "collapse",
	"padding": "1rem",
	"background-color": "#ddd",
	"color": "black",
	"font-size": "1.5rem",
	"text-align": "center"
}

var Qwait = React.createClass({

	render: function() {
		return(
			<div>
			<table style={headerStyle}>
			<tr>
			<th style = {thStyle}>Queueing</th>
			</tr>
                <tr style = {entryStyle}>
					<PplLeftLabel />
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
