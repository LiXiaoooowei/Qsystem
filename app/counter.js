import {Link} from 'react-router';
var React = require('react');
var Qwait = require('./components/Qwaiting.js');
var Qserve = require('./components/Qserving.js');
var NextBtn = require('./components/NextBtn.js');
var ClearBtn = require('./components/ClearBtn.js');
var CutQform = require('./components/cutQform');
var MenuFlatClear = require('./MenuFlatClear');
var MenuCollapseClear = require('./MenuCollapseClear');
var Firebase = require('./components/FirebaseClient.js');
var Indonesia = require('./components/Ex_indonesia');
var Philippine = require('./components/Ex_philippine');

var WINDOW_WIDTH_MOBILE = 480;
var WINDOW_WIDTH_TABLET_PORTRAIT = 768;
var WINDOW_WIDTH_TABLET_LANDSCAPE = 1024;
var WINDOW_WIDTH_LAPTOP = 1600;

var qServe_large = {
	"float": "left",
	"width": "30%",
	"margin-top": "5%",
	"margin-left": "5%"
};

var qServe_medium = {
	"float": "left",
	"width": "50%",
	"margin-top": "5%",
	"margin-left": "5%"
};
var qServe_small = {
	"float": "left",
	"width": "80%",
	"margin-top": "5%",
	"margin-left": "10%"
};

var qWait_large = {
	"float": "left",
	"width": "25%",
	"margin-top": "5%",
	"margin-left": "2.5%"
};

var qWait_medium = {
	"float": "left",
	"width": "30%",
	"margin-top": "5%",
	"margin-left": "2.5%"
};

var qWait_small = {
	"float": "left",
	"width": "60%",
	"margin-top": "5%",
	"margin-left": "20%"
};

var qNextBtn_large = {
	"float": "left",
	"width": "30%",
	"margin-top": "5%",
	"margin-left": "2.5%"
};
var qNextBtn_medium = {
	"float": "left",
	"width": "80%",
	"margin-top": "5%",
	"margin-left": "10%"
};

var qCutBtn_large = {
	"float": "left",
	"width": "30%",
	"margin-top": "5%",
	"margin-left": "2.5%"
};
var qCutBtn_medium = {
	"float": "left",
	"width": "80%",
	"margin-top": "5%",
	"margin-left": "10%"
};

export default React.createClass({
	getInitialState: function() {
		return {
			qwait: new Array(),
			qserve: 0,
			isloggedIn: true,
			width: null,
			height: null
		};
	},
	componentWillMount: function() {
		this.updateDimensions();
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
			if (Centry == "/-1") {
				items.push(Qentry);
			}
			this.setState({
				qwait: items
			});
		}.bind(this));

		queueRef.on("child_changed", function(snapshot){
			var Qentry = snapshot.val().queueNumber;
			var Centry = snapshot.val().servedCounter;
			if (Centry != "/-1" && items.indexOf(Qentry) != -1) {
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
	render() {
		if (this.state.width > WINDOW_WIDTH_MOBILE) {
			return (
				<div>
				<MenuFlatClear />
				<div style = {this.state.width > WINDOW_WIDTH_TABLET_PORTRAIT? qServe_large: (this.state.width > WINDOW_WIDTH_MOBILE? qServe_medium: qServe_small)}><Qserve/></div>
				<div style = {this.state.width > WINDOW_WIDTH_TABLET_PORTRAIT? qWait_large: (this.state.width > WINDOW_WIDTH_MOBILE? qWait_medium: qWait_small)}><Qwait qwait = {this.state.qwait} /></div>
				<div style = {this.state.width > WINDOW_WIDTH_TABLET_PORTRAIT? qNextBtn_large: qNextBtn_medium}><NextBtn /></div>
				<div style = {this.state.width > WINDOW_WIDTH_TABLET_PORTRAIT? qCutBtn_large: qCutBtn_medium}><CutQform /></div>
                    <div style = {this.state.width > WINDOW_WIDTH_TABLET_PORTRAIT? qCutBtn_large: qCutBtn_medium}><Indonesia/></div>
                    <div style = {this.state.width > WINDOW_WIDTH_TABLET_PORTRAIT? qCutBtn_large: qCutBtn_medium}><Philippine/></div>
				</div>
			);
		} else {
			return (
				<div>
				<MenuCollapseClear />
				<div style = {this.state.width > WINDOW_WIDTH_TABLET_PORTRAIT? qServe_large: (this.state.width > WINDOW_WIDTH_MOBILE? qServe_medium: qServe_small)}><Qserve/></div>
				<div style = {this.state.width > WINDOW_WIDTH_TABLET_PORTRAIT? qWait_large: (this.state.width > WINDOW_WIDTH_MOBILE? qWait_medium: qWait_small)}><Qwait qwait = {this.state.qwait} /></div>
				<div style = {this.state.width > WINDOW_WIDTH_TABLET_PORTRAIT? qNextBtn_large: qNextBtn_medium}><NextBtn /></div>
				<div style = {this.state.width > WINDOW_WIDTH_TABLET_PORTRAIT? qCutBtn_large: qCutBtn_medium}><CutQform /></div>
                    <div style = {this.state.width > WINDOW_WIDTH_TABLET_PORTRAIT? qCutBtn_large: qCutBtn_medium}><Indonesia/></div>
                    <div style = {this.state.width > WINDOW_WIDTH_TABLET_PORTRAIT? qCutBtn_large: qCutBtn_medium}><Philippine/></div>
				</div>
			);
		}
	}
})
