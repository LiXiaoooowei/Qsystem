var React = require('react');
var ReactDOM = require('react-dom');
var Firebase = require('./FirebaseClient');

var input_text = {
	"width": "400px",
	"padding": "12px 20px",
	"margin": "8px 0",
	"box-sizing": "border-box",
	"border": "2px solid gray",
	"border-radius": "4px"
};
var input_submit = {
	"width": "400px",
	"background-color": "lightgray",
	"border": "none",
	"color": "black",
	"padding": "16px 32px",
	"text-decoration": "none",
	"margin": "4px 2px",
	"cursor": "pointer",
	"font-size": "30px",
	"border-radius": "8px"
};
var input_submit_hover = {
	"width": "400px",
	"background-color": "#555555",
	"border": "none",
	"color": "white",
	"padding": "16px 32px",
	"text-decoration": "none",
	"margin": "4px 2px",
	"cursor": "pointer",
	"font-size": "30px",
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
			email: '',
			password: ''
		};
		this.handleEmailChange = this.handleEmailChange.bind(this);
		this.handlePasswordChange = this.handlePasswordChange.bind(this);
	    this.handleSubmit = this.handleSubmit.bind(this);
	    this.toggleHover = this.toggleHover.bind(this);
	}
    handlePasswordChange(event) {
        this.setState({
        	password: event.target.value
        });
    }
    handleEmailChange(event) { 
    	this.setState({
    		email: event.target.value
    	});
    }
	toggleHover() {
		this.setState({
			hover: !this.state.hover
		});
	}
	handleSubmit(event) {
        var email_ = this.state.email;
        var password_ = this.state.password;
        Firebase.auth().signInWithEmailAndPassword(email_,password_).then((user)=>{
        	this.props.onChange(true);
        }).catch(function(error){
        	console.log(error.message);
        });
        event.preventDefault();
	}
	render() {
		var style = this.state.hover? input_submit_hover: input_submit; 
		return(
			<form onSubmit = {this.handleSubmit}>
			<label style = {input_label}>Email Address: </label> <br />
			<input type = "text" name = "email" value = {this.state.email} placeholder = "Please enter your email..." onChange = {this.handleEmailChange} style = {input_text}/>
			<br />
			<label style = {input_label}>Password: </label> <br />
			<input type = "text" name = "password" value = {this.state.password} placeholder = " Please enter your password..." onChange = {this.handlePasswordChange} style = {input_text}/>
			<br /><br />
			<input type = "submit" value = "Log In" style = {style} onMouseEnter = {this.toggleHover} onMouseLeave = {this.toggleHover}/>
			</form>
			);
	}
};

module.exports = form