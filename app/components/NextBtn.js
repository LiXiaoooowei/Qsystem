var React = require('react');
var Firebase = require('./FirebaseClient.js');
var buttonStyle = {
	"color": "black",
	"background-color": "#e7e7e7",
	"font-size": "30px",
	"padding": "20px 40px",
	"border-radius": "10px",
	"border": "2px solid #555555"
};

var buttonStyle_hover = {
	"background-color": "#555555",
	"color": "white",
	"font-size": "30px",
	"padding": "20px 40px",
	"border-radius": "10px",
	"border": "2px solid #555555",
	"cursor": "pointer"
};
var nextBtn = React.createClass({
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
	nextHandler: function() {
		var firebaseRef = Firebase.database().ref();
		var userRef = firebaseRef.child('Qlist');
		var qserveRef = firebaseRef.child('Qserving');
		var qtotalRef = firebaseRef.child('Qtotal');
		qtotalRef.once("value", function(snapshot){
			var qtotal = snapshot.val();
			qserveRef.once("value",function(snapshot){
				var currServing = snapshot.val();
				if (currServing < qtotal) {
					currServing = currServing + 1;	
					firebaseRef.update({
						"Qserving":currServing
					});
					userRef.child(currServing).update({
						"servedCounter": 1
					});
				}
			});
		});
	},
	render: function() {
		var style = this.state.hover? buttonStyle_hover: buttonStyle ;  
		return (
			<div>
			<button onClick = {this.nextHandler} style = {style} onMouseEnter = {this.toggleHover} onMouseLeave = {this.toggleHover}>Next Customer</button>
			</div>
			);
	}
});

module.exports = nextBtn;