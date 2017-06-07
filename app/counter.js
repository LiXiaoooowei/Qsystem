import {Link} from 'react-router';
var React = require('react');
var Qwait = require('./components/Qwaiting.js');
var Qserve = require('./components/Qserving.js');
var NextBtn = require('./components/NextBtn.js');
var ClearBtn = require('./components/ClearBtn.js');
var CutQform = require('./components/cutQform');
var Firebase = require('./components/FirebaseClient.js');

var qServe_large = {
	"float": "left",
	"width": "30%",
	"margin-top": "5%",
	"margin-left": "5%"
};

var qWait_large = {
	"float": "left",
	"width": "25%",
	"margin-top": "5%",
	"margin-left": "2.5%"
};

var qNextBtn_large = {
	"float": "left",
	"width": "30%",
	"margin-top": "5%",
	"margin-left": "2.5%"
};

var qCutBtn_large = {
	"float": "left",
	"width": "30%",
	"margin-top": "5%",
	"margin-left": "2.5%"
};

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
			<div style = {{"width": "100%"}}>
			<ul role = "nav">
			<li><Link to="/">Screen</Link></li>
			<li><Link to="/counter">Counter</Link></li>
			<li><Link to="/printer">Printer</Link></li>
			<li style = {{"float": "right"}}><Link to="/logout">Log Out</Link></li>
			<li style = {{"float": "right"}}><ClearBtn /></li>
			</ul>
			<div style = {qServe_large}><Qserve/></div>
			<div style = {qWait_large}><Qwait qwait = {this.state.qwait} /></div>
			<div style = {qNextBtn_large}><NextBtn /></div>
			<div style = {qCutBtn_large}><CutQform /></div>
			</div>
		)
	}
})
