import imgP from '../images/icn_philippine.png';
import imgI from '../images/icn_indonesia.png';
var React = require('react');
var Firebase = require('./FirebaseClient.js');

var SCREEN_HEIGHT = 768

var rate = {
    'width': '100%',
    'display': 'block'
};

var Rates = React.createClass({
    getInitialState: function () {
        return {
            width: null,
            height: null,
            indonesia: 0,
            philippine: 0,
            lastUpdated: null
        }
    },
    componentWillMount: function () {
        var interval = setInterval(() => {
            this.setState({
                hh: (new Date()).getHours(),
                min: (new Date()).getMinutes(),
            })
        }, 1000);
        var indonesiaRates = Firebase.database().ref().child('Ex_Indonesia');
        var philippineRates = Firebase.database().ref().child('Ex_Philippine');

        philippineRates.on('value', function(snapshot){
            if(snapshot.hasChild('time')) {
                this.setState({
                    philippine: snapshot.val().value,
                    datetimeP: snapshot.val().datetimestring,
                    lastUpdated:snapshot.val().time
                });
            } else {
                this.setState({
                    philippine: snapshot.val().value
                })
            }
        }.bind(this));
        indonesiaRates.on('value', function(snapshot){
            if(snapshot.hasChild('time')) {
                this.setState({
                    indonesia: snapshot.val().value,
                    datetimeI: snapshot.val().datetimestring,
                    lastUpdated:snapshot.val().time
                });
            } else {
                this.setState({
                    indonesia: snapshot.val().value
                })
            }
        }.bind(this));
    },
    componentWillUnmount: function () {
        clearInterval(this.state.intervalID);
        window.removeEventListener("resize", this.updateDimensions);
    },
    updateDimensions: function () {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        });
    }.bind(this),
    componengDidMount: function () {
        this.updateDimensions()
        window.addEventListener("resize", this.updateDimensions);
    },
    render: function () {

        return (
            <div style = {rate}>
                <span style = {{display: 'block', width: '100%'}}>
                    <div style = {{width: '40%', display: 'inline-block'}}>  <h3 style={{color: '#E1B873', textAlign: 'right', marginLeft: '10%'}}>Rates last updated: </h3></div>
                    <div style = {{width: '60%', display: 'inline-block'}}><h3 style={{color: 'white', textAlign: 'left', marginLeft: '5%'}}>
                        {this.state.lastUpdated}
                    </h3></div>
                </span>
                <span style = {{display: 'block'}}>
                    <img src={imgI} alt=""
                         style={{width: "10%", marginRight: '0%', marginLeft: '5%'}}></img>
                    <div style={{width: '30%', display: 'inline-block', marginTop: '5%'}}><h3
                        style={{color: 'white', textAlign: 'center', fontSize: '3vw'}}>{this.state.indonesia} IDR</h3></div>
                    <img src={imgP} alt="" style={{display: 'inline-block', width: "10%", marginLeft: '0%'}}></img>
                    <div style={{width: '30%',display: 'inline-block', marginRight: '15%'}}><h3
                        style={{color: 'white', textAlign: 'center',fontSize: '3vw'}}>{this.state.philippine} PHP</h3></div>
                </span>
            </div>
        );
    }
});

module.exports = Rates
