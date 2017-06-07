var React = require('react');
var ReactDOM = require('react-dom');
var Firebase = require('./FirebaseClient.js');

var headerStyle = {
	"border": "1px solid black",
	"width": "100%",
	"border-collapse": "collapse",
	"text-align": "center",
	"padding": "1rem"
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

var Qserve = React.createClass({
	getInitialState: function() {
		return {
			counter: null,
			serving: null
		};
	},

	componentWillMount: function() {
		var firebaseRef = Firebase.database().ref().child('Qserving');
		var user = Firebase.auth().currentUser;
		var counterRef = Firebase.database().ref().child('Users').child(user.uid);
		var counterNum = null;
		var counterServing = null;
		counterRef.on("value", function(snapshot){
			counterNum = snapshot.val().counter;
			counterServing = snapshot.val().serving;
			this.setState({
				counter: counterNum,
				serving: counterServing
			});
		}.bind(this));
	},
	componentWillUnmount: function() {
		Firebase.database().ref("Qserving").off();
	},
	render: function() {
		return(
			<table style={headerStyle}>
			<tr>
			<th style = {thStyle}>Counter</th>
			<th style = {thStyle}>Now Serving</th>
			</tr>
			<tr>
			<td style = {entryStyle}>{this.state.counter}</td>
			<td style = {entryStyle}>{this.state.serving}</td>
			</tr>
			</table>
		);
	}
});

module.exports = Qserve
