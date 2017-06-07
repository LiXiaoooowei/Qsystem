var React = require('react');
var ReactDOM = require('react-dom');
var Firebase = require('./FirebaseClient');

var input_text = {
  "padding": "0.75rem 1.6rem",
  "box-sizing": "border-box",
  "border": "0.125rem solid gray",
  "border-radius": "0.25rem",
  "font-size": "1rem",
  "width": "100%"
};
var input_submit = {
  "background-color": "lightgray",
  "border": "none",
  "color": "black",
  "padding": "1rem 2rem",
  "text-decoration": "none",
  "cursor": "pointer",
  "font-size": "1.25rem",
  "border-radius": "0.5rem",
  "width": "100%"
};
var input_submit_hover = {
  "background-color": "#555555",
  "border": "none",
  "color": "white",
  "padding": "1rem 2rem",
  "text-decoration": "none",
  "cursor": "pointer",
  "font-size": "1.25rem",
  "border-radius": "0.5rem",
  "width": "100%"
};

var input_label = {
  "font-size": "1.5rem",
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
