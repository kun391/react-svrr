import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, Button, Image } from 'react-bootstrap';
import logo from 'assets/images/Beaute-logo.png';

class Header extends React.Component {

  render() {
    return (
      <header className="header-container">
        <Grid fluid>
            <Row className="header-nav">
              <Navbar collapseOnSelect>
                <Navbar.Header>
                  <div className="row">
                  <Navbar.Brand>
                    <a href="#">BEAUTE</a>
                  </Navbar.Brand>
                  <Navbar.Toggle className="btn-toggle">
                      <div>
                      <span className="bar"></span>
                      <span className="bar"></span>
                      <span className="bar"></span>
                      </div>
                  </Navbar.Toggle>
                  </div>
                </Navbar.Header>
                <Navbar.Collapse>
                  <Nav>
                    <NavItem href="#">
                      About us
                    </NavItem>
                    <NavItem href="#">
                      Media
                    </NavItem>
                    <NavItem href="#">
                      Terms for Clients
                    </NavItem>
                    <NavItem href="#">
                      Privacy
                    </NavItem>
                    <NavItem href="#">
                      Contact Support
                    </NavItem>
                  </Nav>
                </Navbar.Collapse>
              </Navbar>
            </Row>
            <Row>
              <Col xs={12} className="header-banner">
                <Image src={require('assets/images/Header_Image.jpg')} alt="banner-image" responsive/>
                <div className="banner-content">
                  <p className="h1">Your beauty team,<br/>on your terms</p>
                  <p className="text">Book texture experts who come to you!</p>
                  <Button className="btn-main">BOOK NOW</Button>
                </div>
              </Col>
            </Row>
        </Grid>
      </header>
    );
  }
}
export default Header;
