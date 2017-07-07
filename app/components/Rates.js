import imgP from '../images/icn_philippine.png';
import imgI from '../images/icn_indonesia.png';
var React = require('react');
var Firebase = require('./FirebaseClient.js');

var SCREEN_HEIGHT = 768
var DAY_IN_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
var MONTH_IN_YEAR = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September'
    , 'October', 'November', 'December']

var rate = {
    'width': '100%',
    'display': 'block'
};

var Rates = React.createClass({
    getInitialState: function () {
        return {
            width: null,
            height: null,
            day: DAY_IN_WEEK[(new Date()).getDay()],
            dd: (new Date()).getDate(),
            mm: MONTH_IN_YEAR[(new Date()).getMonth()],
            yyyy: (new Date()).getFullYear(),
            hh: (new Date()).getHours(),
            min: (new Date()).getMinutes(),
            indonesia: 0,
            philippine: 0
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
        indonesiaRates.on('child_changed', function(snapshot){
            this.setState({
                indonesia: snapshot.val()
            })
        }.bind(this))
        philippineRates.on('child_changed', function(snapshot){
            this.setState({
                philippine: snapshot.val()
            })
        }.bind(this))
        indonesiaRates.on('child_added', function(snapshot){
            this.setState({
                indonesia: snapshot.val()
            })
        }.bind(this))
        philippineRates.on('child_added', function(snapshot){
            this.setState({
                philippine: snapshot.val()
            })
        }.bind(this))
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
        var hh = this.state.hh;
        var min = this.state.min;
        var dd = this.state.dd;
        if (hh > 12) {
            hh = hh - 12;
            min += 'PM'
        } else {
            min += 'AM'
        }
        if (dd < 10) {
            dd = '0' + dd
        }
        return (
            <div style = {rate}>
                <span style = {{display: 'block', width: '100%'}}>
                    <div style = {{width: '40%', display: 'inline-block'}}>  <h3 style={{color: '#E1B873', textAlign: 'right', marginLeft: '10%'}}>Rates last updated: </h3></div>
                    <div style = {{width: '60%', display: 'inline-block'}}><h3 style={{color: 'white', textAlign: 'left', marginLeft: '5%'}}>
                        {this.state.day + ", " + dd + " " + this.state.mm + " " + this.state.yyyy + "   " + hh + ":" + min}
                    </h3></div>
                </span>
                <span style = {{display: 'block'}}>
                    <img src={imgI} alt=""
                         style={{width: "10%", marginRight: '0%', marginLeft: '5%'}}></img>
                    <div style={{width: '25%', display: 'inline-block', marginTop: '5%'}}><h3
                        style={{color: 'white', textAlign: 'center', fontSize: '4vw'}}>{this.state.indonesia} IDR</h3></div>
                    <img src={imgP} alt="" style={{display: 'inline-block', width: "10%", marginLeft: '5%'}}></img>
                    <div style={{width: '25%',display: 'inline-block', marginRight: '15%'}}><h3
                        style={{color: 'white', textAlign: 'center',fontSize: '4vw'}}>{this.state.philippine} PHP</h3></div>
                </span>
            </div>
        );
    }
});

module.exports = Rates
