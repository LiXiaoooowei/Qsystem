var React = require('react');
var Firebase = require('./FirebaseClient.js');

var style_normal = {
	"display": "block",
	"background-color": "#333",
	"color": "white",
	"border": "none",
	"padding": "14px 16px",
	"text-align": "center",
	"text-decoration": "none",
	"font-size":"16px",
	"font-family": "serif"
};
var style_hover = {
	"display": "block",
	"background-color": "#111",
	"color": "white",
	"border": "none",
	"padding": "14px 16px",
	"text-align": "center",
	"text-decoration": "none",
	"font-size":"16px",
	"cursor": "pointer",
	"font-family": "serif"
};
var clearBtn = React.createClass({
	getInitialState: function() {
		return {
			hover: false
		}
	},
	toggleHover: function() {
		this.setState({
			hover: !this.state.hover
		})
	},
	handleClick: function() {
		var firebaseRef = Firebase.database().ref();
		var qlistRef = firebaseRef.child('Qlist');
		var user1Ref = firebaseRef.child('Users').child("Wo0HpwlrfyXPeU242P4onM9kF8X2");
		var user2Ref = firebaseRef.child('Users').child("fSnr6zLUouVvFTdJMe7lDXT5G8y1");
		firebaseRef.update({
			"Qserving": 0,
			"Qtotal": 0
		});
		user1Ref.update({
			"serving": 0
		});
		user2Ref.update({
			"serving": 0
		});
		qlistRef.once("child_removed", function(snapshot) {
			alert("All entries cleared!");
		}.bind(this));
		qlistRef.remove();
		
	},
	render: function() {
		var style = this.state.hover? style_hover: style_normal;  
		return (
			<div>
			<button style = {style} onClick = {this.handleClick} onMouseEnter = {this.toggleHover} onMouseLeave = {this.toggleHover}>Clear</button>
			</div>
			);
	}
});

module.exports = clearBtn;