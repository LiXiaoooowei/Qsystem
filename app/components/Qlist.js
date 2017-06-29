import renderIf from './renderif'
var React = require('react');
var Firebase = require('./FirebaseClient.js');


var headerStyle_large = {
	"border": "1px solid black",
	"border-collapse": "collapse",
	"width": "100%",
	"padding": "1rem",
	"float": "right",
	"min-height": "700px"
};
var entryStyle = {
	"border": "1px solid black",
	"border-collapse": "collapse",
	"padding": "0rem 2rem 0rem 2rem",
};

var Q_normal = {
    "color": "#E1B873",
    "textAlign": "center",
    "font-size": "7rem"
}
var Q_blinking = {
    "color": "red",
    "textAlign": "center",
    "font-size": "7rem"
}

var Qlist = React.createClass({
    getInitialState: function() {
        return {
            blinking: false,
            displayName: new Array(),
            width: null,
            height: null
        }
    },
    componentWillMount: function() {
        var firebaseRef = Firebase.database().ref();
        var user2Ref = firebaseRef.child('Users').child("Wo0HpwlrfyXPeU242P4onM9kF8X2");
        var user1Ref = firebaseRef.child('Users').child("fSnr6zLUouVvFTdJMe7lDXT5G8y1");
        var qlistRef = firebaseRef.child('Qlist');

        qlistRef.on("child_changed", function (snapshot) {
            this.toggleBgForFixedPeriod();
        }.bind(this));

        user1Ref.once("value", function(snapshot){
            var name = snapshot.val().displayName;
            var arr = this.state.displayName;
            arr.splice(0,0,name);
            this.setState({
                displayName: arr
            })
        }.bind(this))
        user2Ref.once("value", function(snapshot){
            var name = snapshot.val().displayName;
            var arr = this.state.displayName;
            arr.splice(1,0,name);
            this.setState({
                displayName: arr
            })
        }.bind(this))

    },
    toggleBgForFixedPeriod: function() {
        this.toggleBgColor();
        setTimeout(()=>{this.setState({blinking: false});
            clearInterval(this.state.intervalID)}, 15000);
    },
    toggleBgColor: function() {
        var interval = setInterval(() => {var blink=!this.state.blinking;
            this.setState({
                intervalID: interval,
                blinking: blink
            })},1000);
    },
    componentWillUnmount: function() {
        clearInterval(this.state.intervalID);
            window.removeEventListener("resize", this.updateDimensions);
    },
    updateDimensions: function() {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        });
    },
    componengDidMount: function() {
        window.addEventListener("resize", this.updateDimensions);
    },
	render: function() {
		var length = this.props.queue.length;
        var counterInfo = new Array();
		var i;
		for(i=1;i<=4;i++) {
			if(length-i>=0) {
				counterInfo.push(this.state.displayName[this.props.counter[length-i]-1]);
			}
		}
		return(
			<table style={headerStyle_large}>
			<tr>
			<td style = {entryStyle}>
                {renderIf(length>=1)(
                    <h3 style = {{"color": "white", textAlign: 'left'}}>Queue No.</h3>
                )}
                <br />
                <h1 style = {this.state.blinking? Q_blinking: Q_normal}>{this.props.queue[length-1]}</h1>
			<br /> <h3 style = {{"color": "white",textAlign: 'right'}}>{counterInfo[0]}</h3></td>
			</tr>
			<tr>
			<td style = {entryStyle}>
                {renderIf(length>=2)(
                    <h3 style = {{"color": "white", textAlign: 'left'}}>Queue No.</h3>
                )}
                <br />
                <h1 style = {Q_normal}> {this.props.queue[length-2]}</h1>
			<br /> <h3 style = {{"color": "white", textAlign: 'right'}}>{counterInfo[1]}</h3></td>
			</tr>
			<tr>
			<td style = {entryStyle}>
                {renderIf(length>=3)(
                    <h3 style = {{"color": "white", textAlign: 'left'}}>Queue No.</h3>
                )}
                <br />
                <h1 style = {Q_normal}>{this.props.queue[length-3]}</h1>
			<br /> <h3 style = {{"color": "white",textAlign: 'right'}}>{counterInfo[2]}</h3>
            </td>
			</tr>
			<tr>
			<td style = {entryStyle}>
                {renderIf(length>=4)(
                    <h3 style = {{"color": "white", textAlign: 'left'}}>Queue No.</h3>
                )}
                <br />
                <h1 style = {Q_normal}>{this.props.queue[length-4]}</h1>
			<br /> <h3 style = {{"color": "white",textAlign: 'right'}}>{counterInfo[3]}</h3></td>
			</tr>
			</table>
			);
		}
	});

module.exports = Qlist
