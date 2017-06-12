import {Link} from 'react-router';

var React = require('react');
var ReactDOM = require('react-dom');
var Qlist = require('./components/Qlist.js');
var Firebase = require('./components/FirebaseClient.js');
var MenuFlat = require('./MenuFlat');
var MenuCollapse = require('./MenuCollapse');

var WINDOW_WIDTH_MOBILE = 480;
var WINDOW_WIDTH_TABLET_PORTRAIT = 768;
var WINDOW_WIDTH_TABLET_LANDSCAPE = 1024;
var WINDOW_WIDTH_LAPTOP = 1600;

var queue_large = {
	"width": "30%",
	"float": "left",
	"margin-right": "0%",
	"margin-top": "0%"
};

var queue_medium = {
	"width": "80%",
	"float": "left",
	"margin-left": "10%",
	"margin-top": "10%"
};

var App = React.createClass( {
	getInitialState: function() {
		return {
			queue: new Array(),
			counter: new Array(),
			height: null,
			width: null
		};
	},
	componentWillMount: function() {
		this.updateDimensions();
		var items = this.state.queue;
		var counters = this.state.counter;
		var firebaseRef = Firebase.database().ref();
		var qlistRef = firebaseRef.child('Qlist');
		var user1Ref = firebaseRef.child('Users').child("Wo0HpwlrfyXPeU242P4onM9kF8X2");
		var user2Ref = firebaseRef.child('Users').child("fSnr6zLUouVvFTdJMe7lDXT5G8y1");

		qlistRef.on("child_added", function(snapshot){
			var Qentry = snapshot.val().queueNumber;
			var Centry = snapshot.val().servedCounter.split("/");
			if (Centry[Centry.length-1] != -1 ){
				items.push(Qentry);
				counters.push(Centry[Centry.length-1]);
			}
			this.setState({
				"queue": items,
				"counter": counters
			});
		}.bind(this));
		qlistRef.on("child_changed", function(snapshot){
			var Qentry = snapshot.val().queueNumber;
			var Centry = snapshot.val().servedCounter.split("/");

				items.push(Qentry);
				counters.push(Centry[Centry.length-1]);

			this.setState({
				"queue": items,
				"counter": counters
			});
		}.bind(this));
		qlistRef.on("child_removed", function(snapshot){
			var Qentry = snapshot.val().queueNumber;
			var Centry = snapshot.val().servedCounter;
			if (items.indexOf(Qentry) != -1) {
				items.splice(items.indexOf(Qentry), 1);
				counters.splice(counters.indexOf(Centry), 1);
			}
			this.setState({
				"queue": items,
				"counter": counters
			});
		}.bind(this));
	},
	updateDimensions: function() {
		this.setState({
			width: window.innerWidth,
			height: window.innerHeight
		});
	},
	componentDidMount: function() {
		window.addEventListener("resize", this.updateDimensions);
	},
	componentWillUnmount: function() {
		Firebase.database().ref("Qlist").off();
		window.removeEventListener("resize", this.updateDimensions);
	},
	render: function() {
		if(this.state.width>WINDOW_WIDTH_MOBILE){
			return (<div>
				<MenuFlat />
				<div>
				<iframe src = "https://www.youtube.com/embed/Gj8ec0yehrc?playlist=Gj8ec0yehrc&loop=1" />
				</div>
				<div style = {this.state.width > WINDOW_WIDTH_TABLET_PORTRAIT ? queue_large : queue_medium}>
				<Qlist queue = {this.state.queue} counter = {this.state.counter}/>
				</div>
				</div>
			);
		} else {
			return (<div>
	     <MenuCollapse />
				<div>
				<iframe src = "https://www.youtube.com/embed/Gj8ec0yehrc?playlist=Gj8ec0yehrc&loop=1" />
				</div>
				<div style = {this.state.width > WINDOW_WIDTH_TABLET_PORTRAIT ? queue_large : queue_medium}>
				<Qlist queue = {this.state.queue} counter = {this.state.counter}/>
				</div>
				</div>
			);
		}
	}
});

module.exports = App
