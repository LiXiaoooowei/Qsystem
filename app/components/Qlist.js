var React = require('react');
var Firebase = require('./FirebaseClient.js');

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
var entryStyle_blink = {
    "border": "1px solid black",
    "border-collapse": "collapse",
    "padding": "2rem 4rem 0rem 4rem",
    "font-size": "5rem",
    "background-color": "red"
};

var Qlist = React.createClass({
    getInitialState: function() {
        return {
            blinking: false
        }
    },
    componentWillMount: function() {
        var firebaseRef = Firebase.database().ref();
        var qlistRef = firebaseRef.child('Qlist');
        qlistRef.on("child_changed", function (snapshot) {
            this.toggleBgForFixedPeriod();
        }.bind(this));
    },
    toggleBgForFixedPeriod: function() {
        this.toggleBgColor();
        setTimeout(()=>{this.setState({blinking: false});
            clearInterval(this.state.intervalID)}, 10000);
    },
    toggleBgColor: function() {
        var interval = setInterval(() => {var blink=!this.state.blinking;
            this.setState({
                intervalID: interval,
                blinking: blink
            })},1000);
    },
    componentWillUnmount: function() {
        clearInterval(this.state.intervalID);
    },
	render: function() {
		var length = this.props.queue.length;
        var counterInfo = new Array();
		var i;
		for(i=1;i<=4;i++) {
			if(length-i>=0) {
				counterInfo.push("counter 0"+this.props.counter[length-i]);
			}
		}
		return(
			<table style={headerStyle_large}>
			<tr>
			<td style = {this.state.blinking?entryStyle_blink: entryStyle}>{this.props.queue[length-1]}
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
