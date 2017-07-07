import renderIf from './renderif'
var React = require('react');
var Firebase = require('./FirebaseClient.js');

var SCREEN_HEIGHT = 768;

var headerStyle_large = {
    "border": "1px solid black",
    "border-collapse": "collapse",
    "width": "100%",
    "padding": "1rem",
    "float": "right",
    "height": SCREEN_HEIGHT
};
var entryStyle = {
    "border": "1px solid black",
    "border-collapse": "collapse",
    "padding": "0rem 2rem 0rem 2rem",
};

var Q_normal = {
    "color": "#E1B873",
    "textAlign": "center",
    "font-size": "6.5rem"
}
var Q_blinking = {
    "color": "red",
    "textAlign": "center",
    "font-size": "6.5rem"
}

var Qlist = React.createClass({
    getInitialState: function() {
        return {
            blinking: false,
            displayName: []
        }
    },
    componentWillMount: function() {
        SCREEN_HEIGHT = this.props.height;
        var firebaseRef = Firebase.database().ref();
        var qlistRef = firebaseRef.child('Qlist');
        var qtotalRef=firebaseRef.child('Qtotal');
        var qserveRef=firebaseRef.child('Qserving');
        var served=null, total=null;
        qlistRef.on("child_changed", function (snapshot) {
            this.toggleBgForFixedPeriod();
        }.bind(this));
        qserveRef.once('value', function(snapshot){
            served=snapshot.val();
        }.bind(this))
        qtotalRef.once("value", function(snapshot){
            total=snapshot.val();
            this.setState({
                customer_left: total-served
            })
        }.bind(this))
        qtotalRef.on("value", function(snapshot){
            total=snapshot.val();
            this.setState({
                customer_left: total-served
            })
        }.bind(this))
        qserveRef.on("value", function(snapshot){
            served=snapshot.val();
            this.setState({
                customer_left: total-served
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
    },
    render: function() {
        var length = this.props.queue.length;
        let pos_inQ = length;
        if (length > 3) {
            pos_inQ = 3;
        }
        headerStyle_large["height"]=this.props.height;
        return(
            <table style={headerStyle_large}>
                <tr>
                    <td style = {entryStyle}>
                        {renderIf(length>=1)(
                            <div>
                            <h3 style = {{"color": "white", textAlign: 'left'}}>Now Serving:</h3>

                        <h1 style = {this.state.blinking? Q_blinking: Q_normal}>{this.props.queue[length-1]}</h1>
                        <h3 style = {{"color": "white",textAlign: 'right'}}>{this.props.counter[length-1]}</h3>
                            </div> )}
                        {renderIf(pos_inQ==0)(
                            <div>
                                <h3 style = {{"color": "white", textAlign: 'left'}}>No. Customers in Queue:</h3>
                                <h1 style = {this.state.blinking? Q_blinking: Q_normal}>{this.state.customer_left}</h1>
                            </div> )}
                            </td>

                </tr>
                <tr>
                    <td style = {entryStyle}>
                        {renderIf(length>=2)(
                            <div>
                            <h3 style = {{"color": "white", textAlign: 'left'}}>Now Serving:</h3>

                        <h1 style = {Q_normal}> {this.props.queue[length-2]}</h1>
                        <h3 style = {{"color": "white", textAlign: 'right'}}>{this.props.counter[length-2]}</h3>
                            </div> )}
                        {renderIf(pos_inQ==1)(
                            <div>
                                <h3 style = {{"color": "white", textAlign: 'left'}}>No. Customers in Queue:</h3>
                                <h1 style = {this.state.blinking? Q_blinking: Q_normal}>{this.state.customer_left}</h1>
                            </div> )}
                            </td>
                </tr>
                <tr>
                    <td style = {entryStyle}>
                        {renderIf(length>=3)(
                            <div>
                            <h3 style = {{"color": "white", textAlign: 'left'}}>Now Serving:</h3>
                        <h1 style = {Q_normal}>{this.props.queue[length-3]}</h1>
                        <h3 style = {{"color": "white",textAlign: 'right'}}>{this.props.counter[length-3]}</h3>
                            </div> )}
                        {renderIf(pos_inQ==2)(
                            <div>
                                <h3 style = {{"color": "white", textAlign: 'left'}}>No. Customers in Queue:</h3>
                                <h1 style = {this.state.blinking? Q_blinking: Q_normal}>{this.state.customer_left}</h1>
                            </div> )}
                            </td>
                </tr>
                <tr>
                    <td style = {entryStyle}>
                        {renderIf(length>=4)(
                            <div>
                            <h3 style = {{"color": "white", textAlign: 'left'}}>Now Serving:</h3>
                        <h1 style = {Q_normal}>{this.props.queue[length-4]}</h1>
                        <h3 style = {{"color": "white",textAlign: 'right'}}>{this.props.counter[length-4]}</h3>
                    </div> )}
                        {renderIf(pos_inQ==3)(
                            <div>
                                <h3 style = {{"color": "white", textAlign: 'left'}}>No. Customers in Queue:</h3>
                                <h1 style = {this.state.blinking? Q_blinking: Q_normal}>{this.state.customer_left}</h1>
                            </div> )}
                    </td>
                </tr>
            </table>
        );
    }
});

module.exports = Qlist;
