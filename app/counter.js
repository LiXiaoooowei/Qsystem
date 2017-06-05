import {Link} from 'react-router';
var React = require('react');
var Qwait = require('./components/Qwaiting.js');
var Qserve = require('./components/Qserving.js');
var NextBtn = require('./components/NextBtn.js');
var Firebase = require('./components/FirebaseClient.js');

export default React.createClass({
	getInitialState: function() {
		return {
			qwait: new Array(),
			qserve: 0,
			isloggedIn: true
		};
	},
	componentWillMount: function() {
		var items = this.state.qwait;
		var qserveRef = Firebase.database().ref().child("Qserving");
		var queueRef = Firebase.database().ref().child("Qlist");
		Firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				this.setState({
					isLoggedIn: true
				});
			} else {
				this.setState({
					isLoggedIn: false
				});
			}
		}.bind(this));
		qserveRef.on("value", function(snapshot) {
			var Qentry = snapshot.val();
			items.shift();
			this.setState({
				qwait: items,
				qserve: Qentry
			});
		}.bind(this));

		queueRef.on("child_added", function(snapshot){
			var Qentry = snapshot.val().queueNumber;
			var Qserve = this.state.qserve;
			if (Qentry > Qserve){
				items.push(Qentry);
			};
			this.setState({
				qwait: items,
				qserve: Qserve
			});
		}.bind(this));
	},
	componentWillUnmount: function() {
		Firebase.database().ref("Qlist").off();
	},
	render() {
		return (
			<div> 
			<ul role = "nav">
			<li><Link to="/">Screen</Link></li>
			<li><Link to="/counter">Counter</Link></li>
			<li><Link to="/printer">Printer</Link></li>
			<li style = {{"float": "right"}}><Link to="/logout">Log Out</Link></li>
			</ul>
			<div style = {{"margin-right":"50px", "margin-left": "10px"}}><Qserve/></div>
			<div style = {{"margin-right": "50px"}}><Qwait qwait = {this.state.qwait} /></div>
			<div style = {{"margin-top": "50px", "margin-right": "150px"}}><NextBtn /></div>
			</div>
			)
	}
})


