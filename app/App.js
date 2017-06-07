import {Link} from 'react-router';

var React = require('react');
var ReactDOM = require('react-dom');
var Qlist = require('./components/Qlist.js');
var Firebase = require('./components/FirebaseClient.js');

var WINDOW_WIDTH_MOBILE = 480;
var WINDOW_WIDTH_TABLET_PORTRAIT = 768;
var WINDOW_WIDTH_TABLET_LANDSCAPE = 1024;
var WINDOW_WIDTH_LAPTOP = 1600;

var queue_large = {
	"width": "30%",
	"float": "left",
	"margin-right": "2.5%",
	"margin-top": "10%"
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

		qlistRef.on("child_added", function(snapshot){
			var Qentry = snapshot.val().queueNumber;
			var Centry = snapshot.val().servedCounter;
			if (Centry != -1 ){
				items.push(Qentry);
				counters.push(Centry);
			}
			this.setState({
				"queue": items,
				"counter": counters
			});
		}.bind(this));
		qlistRef.on("child_changed", function(snapshot){
			var Qentry = snapshot.val().queueNumber;
			var Centry = snapshot.val().servedCounter;
			if (Centry != -1 && items.indexOf(Qentry) == -1){
				items.push(Qentry);
				counters.push(Centry);
			}
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
		return (<div>
			<ul role = "nav" >
			<li><Link to="/">Screen</Link></li>
			<li><Link to="/counter">Counter</Link></li>
			<li><Link to="/printer">Printer</Link></li>
			</ul>
			<div>
			<iframe src = "https://www.youtube.com/embed/Gj8ec0yehrc?playlist=Gj8ec0yehrc&loop=1" />
			</div>
			<div style = {this.state.width > WINDOW_WIDTH_TABLET_PORTRAIT ? queue_large : queue_medium}>
			<Qlist queue = {this.state.queue} counter = {this.state.counter}/>
			</div>
			</div>
		);

	}
});

module.exports = App
