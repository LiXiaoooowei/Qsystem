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

class MenuFlat extends React.Component {
	render() {
    return (
			<ul role = "nav" style = {ul}>
			<li><Link to="/">Screen</Link></li>
			<li><Link to="/counter">Counter</Link></li>
			<li><Link to="/printer">Printer</Link></li>
			</ul>
		)
	}
}

module.exports = MenuFlat
