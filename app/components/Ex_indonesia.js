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
    "color": "black",
    "padding": "1rem 2rem",
    "text-decoration": "none",
    "cursor": "pointer",
    "font-size": "1.5rem",
    "border-radius": "0.5rem",
    "width": "100%",
    "border": "2px solid #555555"
};
var input_submit_hover = {
    "background-color": "#555555",
    "color": "white",
    "padding": "1rem 2rem",
    "text-decoration": "none",
    "cursor": "pointer",
    "font-size": "1.5rem",
    "border-radius": "0.5rem",
    "width": "100%",
    "border": "2px solid #555555"
};

var input_label = {
    "font-size": "1.5rem",
    "font-family": "Sans-serif",
    "color": "#E1B873"
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
        event.preventDefault();
        var number_ = parseFloat(this.state.number);
        if (isNaN(this.state.number)){
            alert("Please enter a valid number");
            return
        }
        if ((/^\+?(\s*)$/.test(this.state.number))) {
            alert("Empty input field is not allowed");
        }
        var firebaseRef = Firebase.database().ref();
            var indonesiaRef = firebaseRef.child('Ex_Indonesia');
           indonesiaRef.update({
               "value": number_
           })
        alert("Indonesia Exchange Rate updated to "+number_+" successfully!");
    }
    render() {
        var style = this.state.hover? input_submit_hover: input_submit;
        return(
            <form onSubmit = {this.handleSubmit}>
                <label style = {input_label}>Indonesia Exchange Rate:  </label> <br />
                <input type = "text" name = "number" value = {this.state.number} placeholder = "Please enter Indonesia exchange rate..." onChange = {this.handleNumberChange} style = {input_text}/>
                <br /><br/>
                <input type = "submit" value = "Add" style = {style} onMouseEnter = {this.toggleHover} onMouseLeave = {this.toggleHover}/>
            </form>
        );
    }
};

module.exports = form
