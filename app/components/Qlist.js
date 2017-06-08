var React = require('react');
var ReactDOM = require('react-dom');

var headerStyle_large = {
	"border": "1px solid black",
	"border-collapse": "collapse",
	"width": "100%",
	"text-align": "center",
	"padding": "1rem",
	"float": "right",
	"min-height": "500px"
};
var entryStyle = {
	"border": "1px solid black",
	"border-collapse": "collapse",
	"padding": "2rem 4rem 0rem 4rem",
	"font-size": "5rem"
};

var Qlist = React.createClass({

	render: function() {
		var length = this.props.queue.length;
    var counterInfo = new Array();
		var i;
		for(i=1;i<=4;i++) {
			if(length-i>=0) {
				counterInfo.unshift("counter 0"+this.props.counter[length-i]);
			}
		}
		return(
			<table style={headerStyle_large}>
			<tr>
			<td style = {entryStyle}>{this.props.queue[length-1]}
			<br /> <h6>{counterInfo[0]}</h6></td>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.queue[length-2]}
			<br /> <h6>{counterInfo[1]}</h6></td>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.queue[length-3]}
			<br /> <h6>{counterInfo[2]}</h6></td>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.props.queue[length-4]}
			<br /> <h6>{counterInfo[3]}</h6></td>
			</tr>
			</table>
			);
		}
	});

module.exports = Qlist
