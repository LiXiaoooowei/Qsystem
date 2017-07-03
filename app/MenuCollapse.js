import {Link} from 'react-router';
import {Navbar, Nav,NavDropdown, NavItem} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
var React = require('react');

class MenuFlat extends React.Component {
  render() {
    return (
      <Navbar inverse >
            <Nav>
              <NavDropdown title="Menu" id="basic-nav-dropdown">
              <LinkContainer to = "/">
                <NavItem>Screen</NavItem>
                </LinkContainer>
                <LinkContainer to = "/counter">
                <NavItem>Counter</NavItem>
                </LinkContainer>
                <LinkContainer to = "/printer">
                <NavItem>Printer</NavItem>
                </LinkContainer>
              </NavDropdown>
            </Nav>
        </Navbar>
    )
  }
}

module.exports = MenuFlat
