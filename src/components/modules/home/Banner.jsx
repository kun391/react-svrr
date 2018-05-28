import React from 'react';
import Slider from 'react-slick';
import {ImageItem} from 'partials';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

class Banner extends React.Component {
  render() {
    let settings = {
      autoplay: true,
      autoplaySpeed: 5000,
      arrows: false,
      fade: true,
      dots: true,
      draggable: false,
      speed: 1000,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: false,
      touchMove: false,
      swipe: false
    };

    return (
      <div className="banner-container banner-container-fix">
        <Slider {...settings}>
          <div className="slider-item">
            <ImageItem image="img-banner-4.png" className="slider-image" description="" type="local" />
          </div>
          {/*<div className="slider-item">
            <ImageItem image="img-banner-2.png" className="slider-image" description="" type="local" />
          </div>
          <div className="slider-item">
            <ImageItem image="img-banner-3.png" className="slider-image" description="" type="local" />
          </div>*/}
        </Slider>
        <div className="intro">
          <h4 className="intro-title">THE BEST WEBSITE FOR ORGANIZING YOUR BOOK CLUB</h4>
          {
            this.props.isAuth
            ? <a href="/create-club" className="btn btn-default-corner bg-transparent btn-create-club">Create a club</a>
            : <a href="/signup" className="btn btn-default-corner bg-transparent btn-create-club">Create a club</a>
          }
        </div>
      </div>
    );
  }
}

Banner.propTypes = {
  isAuth: PropTypes.bool
};

const bindStateToProps = function(state) {
  return {
    isAuth: state.auth ? state.auth.isAuth : null
  }
}

export default connect(bindStateToProps)(Banner);
