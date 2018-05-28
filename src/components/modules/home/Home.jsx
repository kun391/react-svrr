import React from 'react';
import SignupFooter from './SignupFooter.jsx';
import PropTypes from 'prop-types';

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="home-container">
        <div className="container-fluid">
          <div className="row">
            Banner
          </div>
          <div className="row">
            <div className="block-container how-it-work">
              <div className="center">
                <h4 className="block-title">HOW IT WORKS</h4>
                <ul className="list">
                  <li className="col-sm-4">
                    image 1
                  </li>
                  <li className="col-sm-4">
                    image 2
                  </li>
                  <li className="col-sm-4">
                    image 3
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="block-container popular-book">
              <div className="center">
                <h4 className="block-title">MOST POPULAR BOOKS ON BOOKCLUBZ</h4>
                <div className="slider-container">
                  <div className="slider-content">
                    List
                  </div>
                </div>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
          <div className="row">
            <div className="block-container block-features">
              <div className="center">
                <h4 className="block-title">BOOKCLUBZ FEATURES</h4>
                <ul className="list">
                  <li className="col-sm-4">
                    Image 1
                  </li>
                  <li className="col-sm-4">
                    Image 2
                  </li>
                  <li className="col-sm-4">
                    Image 3
                  </li>
                </ul>
                <ul className="list">
                  <li className="col-sm-2">
                  </li>
                  <li className="col-sm-4">
                    Image 4
                  </li>
                  <li className="col-sm-4">
                    Image 5
                  </li>
                  <li className="col-sm-2">
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            FEATURES
          </div>
          {
            <div className="row">
              <SignupFooter isAuth={this.props.isAuth} />
            </div>
          }
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  isAuth: PropTypes.bool
};

export default Home;
