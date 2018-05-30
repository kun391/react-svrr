import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Image, Nav, NavItem } from 'react-bootstrap';

class Footer extends React.Component {

  render() {
    return (
      <footer className="footer-container">
        <Grid fluid>
          <Row className="footer-row">
            <Col xs={6} className="brand">
              <p className="text">About Swivel and MIZANI partnership</p>
              <div>
                <a href="#" className="brand-swivel">SWIVEL</a>
                <Image className="brand-mizani" src={require('assets/images/MIZANI-logo.png')} />
              </div>
            </Col>
            <Col xs={6} className="category">
              <ul className="category-list">
                <li><a href="#" className="link">About us</a></li>
                <li><a href="#" className="link">Media</a></li>
                <li><a href="#" className="link">Term for Clients</a></li>
                <li><a href="#" className="link">Privacy</a></li>
                <li><a href="#" className="link">Contact Support</a></li>
              </ul>
            </Col>
          </Row>
        </Grid>
      </footer>
    );
  }
}
export default Footer;
