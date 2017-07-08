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

var DAY_IN_WEEK = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
var MONTH_IN_YEAR = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September'
    , 'October', 'November', 'December']

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
        let day = DAY_IN_WEEK[(new Date()).getDay()];
        let dd = (new Date()).getDate();
        let mm = MONTH_IN_YEAR[(new Date()).getMonth()];
        let yyyy = (new Date()).getFullYear();
        let hh = (new Date()).getHours();
        let min = (new Date()).getMinutes();
        if (min<10) {
            min = '0'+min;
        }
        if (hh > 12) {
            hh = hh - 12;
            min += 'PM'
        } else {
            min += 'AM'
        }
        if (dd < 10) {
            dd = '0' + dd
        }
        var number_ = parseFloat(this.state.number);
        if (isNaN(this.state.number)){
            alert("Please enter a valid number");
            return
        }
        if ((/^\+?(\s*)$/.test(this.state.number))) {
            alert("Empty input field is not allowed");
        }
        var firebaseRef = Firebase.database().ref();
        var philippineRef = firebaseRef.child('Ex_Philippine');
        philippineRef.update({
            "value": number_,
            'time': day + ", " + dd + " " + mm + " " + yyyy + "   " + hh + ":" + min,
        });
        var indonesiaRef = firebaseRef.child('Ex_Indonesia');
        indonesiaRef.update({
            'time': day + ", " + dd + " " + mm + " " + yyyy + "   " + hh + ":" + min,
        });
        alert("Philippine Exchange Rate updated to "+number_+" successfully!");
    }
    render() {
        var style = this.state.hover? input_submit_hover: input_submit;
        return(
            <form onSubmit = {this.handleSubmit}>
                <label style = {input_label}>Philippine Exchange Rate:  </label> <br />
                <input type = "text" name = "number" value = {this.state.number} placeholder = "Please enter Philippine exchange rate..." onChange = {this.handleNumberChange} style = {input_text}/>
                <br /><br/>
                <input type = "submit" value = "Add" style = {style} onMouseEnter = {this.toggleHover} onMouseLeave = {this.toggleHover}/>
            </form>
        );
    }
};

module.exports = form
