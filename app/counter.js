import {Link} from 'react-router';
var React = require('react');
var Qwait = require('./components/Qwaiting.js');
var Qserve = require('./components/Qserving.js');
var NextBtn = require('./components/NextBtn.js');
var ClearBtn = require('./components/ClearBtn.js');
var CutQform = require('./components/cutQform');
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
		var firebaseRef = Firebase.database().ref();
		var qserveRef = firebaseRef.child("Qserving");
		var queueRef = firebaseRef.child("Qlist");
		var user = Firebase.auth().currentUser;
		var userRef = firebaseRef.child('Users').child(user.uid);

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

		queueRef.on("child_added", function(snapshot){
			var Qentry = snapshot.val().queueNumber;
			var Centry = snapshot.val().servedCounter;
			if (Centry == -1) {
				items.push(Qentry);
			}
			this.setState({
				qwait: items
			});
		}.bind(this));

		queueRef.on("child_changed", function(snapshot){
			var Qentry = snapshot.val().queueNumber;
			var Centry = snapshot.val().servedCounter;
			if (Centry != -1 && items.indexOf(Qentry) != -1) {
				items.splice(items.indexOf(Qentry), 1);
			}
			this.setState({
				qwait: items
			});
		}.bind(this));

		queueRef.on("child_removed", function(snapshot){
			var Qentry = snapshot.val().queueNumber;
			var qwait = this.state.qwait;
			var index = qwait.indexOf(Qentry);
			qwait.splice(index, 1);
			this.setState({
				qwait: items
			});
		}.bind(this));
	},
	componentWillUnmount: function() {
		Firebase.database().ref("Qlist").off();
	},
	render() {
		return (
			<div>
			<ul role = "nav" style = {{"width": "100%", "position": "absolute", "margin-left": "-60px"}}>
			<li><Link to="/">Screen</Link></li>
			<li><Link to="/counter">Counter</Link></li>
			<li><Link to="/printer">Printer</Link></li>
			<li style = {{"float": "right"}}><Link to="/logout">Log Out</Link></li>
			<li style = {{"float": "right"}}><ClearBtn /></li>
			</ul>
			<div style = {{"margin-top": "20px"}}><Qserve/></div>
			<div style = {{"margin-top": "20px", "margin-left": "30px"}}><Qwait qwait = {this.state.qwait} /></div>
			<div style = {{"margin-top": "80px", "position": "absolute", "margin-left": "30px"}}><NextBtn /></div>
			<div style = {{"margin-top": "200px", "position": "absolute", "margin-left": "30px"}}><CutQform /></div>
			</div>
		)
	}
})
