var React = require('react');
var Firebase = require('./FirebaseClient.js');

var QueueLabel = React.createClass({
	getInitialState: function() {
		return{
			Qnum: 0
		}
	},
	componentWillMount: function() {
		var firebaseRef = Firebase.database().ref();
		var qtotalRef = firebaseRef.child('Qtotal');
		qtotalRef.on('value', function(snapshot){
			var qtotal = snapshot.val();
			this.setState({
				Qnum: qtotal
			});
		}.bind(this));
	},
	componentWillUnmount: function() {
		Firebase.database().ref("Qtotal").off();
		clearInterval(this.state.intervalID);
	},
	componentDidMount: function() {
		var interval = setInterval(
			() => this.setState({
               Qnum: 0
			}), 5000
			);
		this.setState({
			intervalID: interval
		});
	},
	render: function() {
		if (this.state.Qnum == 0) {
			return <h1 style = {{color: '#E1B873'}}> WELCOME TO SLIDE </h1>
		} else {
        return <h1 style = {{color: '#E1B873'}}> Your Queue Number is {this.state.Qnum}</h1>;
        }
	}
});

module.exports = QueueLabel;