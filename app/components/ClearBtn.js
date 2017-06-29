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
		var videoRef = firebaseRef.child('VideoURL');
		firebaseRef.update({
			"Qserving": 0,
			"Qtotal": 0,
			"baseNumber": 0
		});
		user1Ref.update({
			"serving": 0,
			"displayName": "HELP DESK",
            "counter": 1
		});
		user2Ref.update({
			"serving": 0,
			"displayName": "COUNTER 01",
            "counter": 2
		});
		videoRef.child(1).update({
            "url": "Gj8ec0yehrc"
        })
        videoRef.child(2).update({
            "url": "C2CXCTsfOUE"
        })
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
