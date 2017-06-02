var React = require('react');
var Firebase = require('./FirebaseClient.js');
var buttonStyle = {
	"color": "black",
	"background-color": "#e7e7e7",
	"font-size": "40px",
	"padding": "30px 60px",
	"border-radius": "20px",
	"border": "2px solid #555555"
};

var buttonStyle_hover = {
	"background-color": "#555555",
	"color": "white",
	"font-size": "40px",
	"padding": "30px 60px",
	"border-radius": "20px",
	"border": "2px solid #555555",
	"cursor": "pointer"
};

var addBtn = React.createClass({
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
	addHandler: function() {
		var firebaseRef = Firebase.database().ref();
		var userRef = firebaseRef.child('Qlist');
		var qtotalRef = firebaseRef.child('Qtotal');
		qtotalRef.once("value",function(snapshot){
			var currTotal = snapshot.val()+1;
			firebaseRef.update({
				"Qtotal":currTotal
			});
			userRef.child(currTotal).set({
				"queueNumber": currTotal,
				"servedCounter": -1
			});
		});
	},
	render: function() {
		var style = this.state.hover? buttonStyle_hover: buttonStyle ;  

		return (
			<div>
			<button onClick = {this.addHandler} style = {style} onMouseEnter = {this.toggleHover} onMouseLeave = {this.toggleHover}>Queue</button>
			</div>
			);
	}
});

module.exports = addBtn;
