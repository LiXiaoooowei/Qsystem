var React = require('react');
var Firebase = require('./FirebaseClient.js');

var style_normal = {
	"color": "white",
	"text-decoration": "none",
	"background-color": "transparent",
	"border": "none",
	"margin": "0",
	"padding": "0"
};

var style_bs = {
	"text-decoration": "none",
	"background-color": "transparent",
	"border": "none",
	"margin": "0",
	"padding": "0"
};

var clearBtn = React.createClass({
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
		var style = this.props.bs_style? style_bs: style_normal;
		return (
			<div>
			<button style = {style} onClick = {this.handleClick}>Clear</button>
			</div>
			);
	}
});

module.exports = clearBtn;
