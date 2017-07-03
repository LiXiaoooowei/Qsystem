import img from '../images/icn_ppl.png';
var React = require('react');
var Firebase = require('./FirebaseClient');


class PplWaitLabel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           customer_left: null
        };

    }
    componentWillMount() {
        var firebaseRef=Firebase.database().ref();
        var qtotalRef=firebaseRef.child('Qtotal');
        var qserveRef=firebaseRef.child('Qserving');
        var served=null, total=null;
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
    }


    render() {
        return(
            <div style = {{padding: '1rem'}}>
                <img src={img} style = {{display: 'inline-block', width: "10%", marginRight: '10%'}} />
                <h4 style = {{textAlign: "center", display: 'inline'}}>{this.state.customer_left} in queue</h4>
            </div>
        );
    }
};

module.exports = PplWaitLabel
