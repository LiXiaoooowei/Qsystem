import {Link} from 'react-router';
var React = require('react');

var ul = {
	"list-style-type": "none",
	"margin": "0",
	"padding": "0",
	"overflow": "hidden",
	"width": "100%",
	"background-color": "#333"
};

var li_normal = {
	"float": "left",
	"display": "block",
	"text-align": "center",
	"padding": "0.875rem 1rem"
};

var li_hover = {
	"background-color": "#111",
	"padding": "0.875rem 1rem",
	"display": "block",
	"float": "left"
};

var link = {
	"color": "white",
	"text-decoration": "none"
};
class MenuFlat extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hover_screen: false,
			hover_counter: false,
			hover_printer: false
		};
	    this.toggleHoverScreen = this.toggleHoverScreen.bind(this);
			this.toggleHoverCounter = this.toggleHoverCounter.bind(this);
			this.toggleHoverPrinter = this.toggleHoverPrinter.bind(this);
	}
	toggleHoverScreen() {
		this.setState({
			hover_screen: !this.state.hover_screen
		});
	}
	toggleHoverCounter() {
		this.setState({
			hover_counter: !this.state.hover_counter
		});
	}
	toggleHoverPrinter() {
		this.setState({
			hover_printer: !this.state.hover_printer
		});
	}
	render() {
    return (
			<ul role = "nav" style = {ul}>
			<li style = {this.state.hover_screen? li_hover: li_normal} onMouseEnter = {this.toggleHoverScreen} onMouseLeave = {this.toggleHoverScreen}><Link to="/" style = {link}>Screen</Link></li>
			<li style = {this.state.hover_counter? li_hover: li_normal} onMouseEnter = {this.toggleHoverCounter} onMouseLeave = {this.toggleHoverCounter}><Link to="/counter" style = {link}>Counter</Link></li>
			<li style = {this.state.hover_printer? li_hover: li_normal} onMouseEnter = {this.toggleHoverPrinter} onMouseLeave = {this.toggleHoverPrinter}><Link to="/printer" style = {link}>Printer</Link></li>
			</ul>
		)
	}
}

module.exports = MenuFlat
