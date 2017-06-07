var React = require('react');
var ReactDOM = require('react-dom');
var Firebase = require('./FirebaseClient');

var input_text = {
  "width": "300px",
  "padding": "12px 20px",
  "margin": "8px 0",
  "box-sizing": "border-box",
  "border": "2px solid gray",
  "border-radius": "4px"
};
var input_submit = {
  "width": "300px",
  "background-color": "lightgray",
  "border": "none",
  "color": "black",
  "padding": "16px 32px",
  "text-decoration": "none",
  "margin": "4px 2px",
  "cursor": "pointer",
  "font-size": "20px",
  "border-radius": "8px"
};
var input_submit_hover = {
  "width": "300px",
  "background-color": "#555555",
  "border": "none",
  "color": "white",
  "padding": "16px 32px",
  "text-decoration": "none",
  "margin": "4px 2px",
  "cursor": "pointer",
  "font-size": "20px",
  "border-radius": "8px"
};

var input_label = {
  "letter-spacing": "3px",
  "font-size": "20px",
  "font-family": "Sans-serif"
};

class form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
      number: ''
    };
    this.handleNumberChange = this.handleNumberChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleHover = this.toggleHover.bind(this);
  }
  handleNumberChange(event) {
    this.setState({
      number: event.target.value
    });
  }
  toggleHover() {
    this.setState({
      hover: !this.state.hover
    });
  }
  handleSubmit(event) {
    var number_ = parseInt(this.state.number);
    var firebaseRef = Firebase.database().ref();
    var customerRef = firebaseRef.child('Qlist');
    var qserveRef = firebaseRef.child('Qserving');
    var qtotalRef = firebaseRef.child('Qtotal');
    var user = Firebase.auth().currentUser;
    var userRef = firebaseRef.child('Users').child(user.uid);
    var counter = null;
    userRef.once("value", function(snapshot){
      counter = snapshot.val().counter;
    });
    qtotalRef.once("value", function(snapshot){
      var qtotal = snapshot.val();
      customerRef.child(number_).update({
        "servedCounter": counter
      });
      userRef.update({
        "serving": number_
      });
    });
    event.preventDefault();
  }
  render() {
    var style = this.state.hover? input_submit_hover: input_submit;
    return(
      <form onSubmit = {this.handleSubmit}>
      <label style = {input_label}>Serve now: </label> <br />
      <input type = "text" name = "number" value = {this.state.number} placeholder = "Please enter a customer number..." onChange = {this.handleNumberChange} style = {input_text}/>
      <br />
      <input type = "submit" value = "Add" style = {style} onMouseEnter = {this.toggleHover} onMouseLeave = {this.toggleHover}/>
      </form>
    );
  }
};

module.exports = form
