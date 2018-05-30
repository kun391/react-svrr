import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { Image } from 'react-bootstrap';

class Home extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <Grid fluid className="home-container">
        <Row className="how-section">
          <p className="h1 text-center">How it works?</p>
          <Col xs={12} className="step">
            <Row>
              <Col xs={4} className="text-center">
                <Image className="icon" src={require('assets/images/Stlye-Icon.png')}/>
                <p className="text">Choose your style</p>
              </Col>
              <Col xs={4} className="text-center">
                <Image className="icon" src={require('assets/images/Time-place-icon.png')}/>
                <p className="text">Tell us the time and place</p>
              </Col>
              <Col xs={4} className="text-center">
                <Image className="icon" src={require('assets/images/calendar.png')}/>
                <p className="text">Sit back and get slayed</p>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="hair-style-section">
          <Col xs={12} sm={6} className="style" style={{background: `url(${require('assets/images/blowout-hairstyles.jpg')}) center`}}>
            <a href="#">
            <p className="name">Blowouts</p>
            </a>
          </Col>
          <Col xs={12} sm={6} className="style" style={{background: `url(${require('assets/images/curl-therapy-hairstyles.jpg')}) center`}}>
            <a href="#">
            <p className="name">Curl Therapy</p>
            </a>
          </Col>
          <Col xs={12} sm={6} className="style" style={{background: `url(${require('assets/images/braids-hairstyles.jpg')}) center`}}>
            <a href="#">
            <p className="name">Braids / Twists</p>
            </a>
          </Col>
          <Col xs={12} sm={6} className="style" style={{background: `url(${require('assets/images/Extensions-hairstyles.jpg')}) center`}}>
            <a href="#">
            <p className="name">Extensions</p>
            </a>
          </Col>
          <Col xs={12} className="style" style={{background: `url(${require('assets/images/bridal-hairstyles.jpg')}) center`}}>
            <a href="#">
            <p className="name">Bridal</p>
            </a>
          </Col>
        </Row>
        <Row className="Shop-Mizani">
          <Col xs={6} className="text">
            <p className="brand-name">
              Shop <br/>
              <span className="Rights">MIZANI</span> <br/>
              Products
            </p>
            <p>The Professional authority for all hair textures.</p>
          </Col>
          <Col xs={6} className="img">
            <Image src={require('assets/images/MizaniProducts.jpg')} responsive/>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default Home;
