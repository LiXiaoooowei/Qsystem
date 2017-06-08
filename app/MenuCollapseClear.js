import {Link} from 'react-router';
import {Navbar, Nav,NavDropdown, MenuItem, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
var React = require('react');
var ClearBtn = require('./components/ClearBtn.js');

class MenuFlat extends React.Component {
  render() {
    return (
      <Navbar inverse >
           <Nav>
              <NavDropdown title="Menu">
              <LinkContainer to = "/">
                <MenuItem pullRight>Screen</MenuItem>
                </LinkContainer>
                <LinkContainer to = "/counter">
                <MenuItem pullRight>Counter</MenuItem>
                </LinkContainer>
                <LinkContainer to = "/printer">
                <MenuItem pullRight>Printer</MenuItem>
                </LinkContainer>
                <NavItem><ClearBtn bs_style = {true} /></NavItem>
                <LinkContainer to = "/logout">
                <NavItem>Log Out</NavItem>
                </LinkContainer>
              </NavDropdown>
            </Nav>
        </Navbar>
    )
  }
}

module.exports = MenuFlat
