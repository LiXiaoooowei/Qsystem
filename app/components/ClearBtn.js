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

		firebaseRef.update({
			"Qserving": 0,
			"Qtotal": 0,
			"baseNumber": 0
		});

		qlistRef.remove();
        alert("All entries cleared!");
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
