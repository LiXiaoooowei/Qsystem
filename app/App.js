import {Link} from 'react-router';
var React = require('react');
var ReactDOM = require('react-dom');
var Qlist = require('./components/Qlist.js');
var Firebase = require('./components/FirebaseClient.js');

var App = React.createClass( {
	getInitialState: function() {
		return {
			queue: new Array(),
			counter: new Array()
		};
	},
	componentWillMount: function() {
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
	componentWillUnmount: function() {
		Firebase.database().ref("Qlist").off();
	},
	render: function() {
		return (<div>
			<ul role = "nav" style = {{"width": "100%", "position": "absolute", "margin-left": "-60px"}}>
			<li><Link to="/">Screen</Link></li>
			<li><Link to="/counter">Counter</Link></li>
			<li><Link to="/printer">Printer</Link></li>
			</ul>
			<div style = {{"margin-top": "30px"}}>
			<iframe src = "https://www.youtube.com/embed/Gj8ec0yehrc?playlist=Gj8ec0yehrc&loop=1">
			</iframe>
			</div>
			<div style = {{"margin-top": "30px"}}>
			<Qlist queue = {this.state.queue} counter = {this.state.counter}/>
			</div>
			</div>
		);

	}
});

module.exports = App
