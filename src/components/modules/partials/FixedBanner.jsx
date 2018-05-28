import React from 'react';
import { ImageItem } from 'partials';
import PropTypes from 'prop-types';

class FixedBanner extends React.Component {
  render() {
    return (
      <div className={`banner-container fixed-banner ${this.props.className}`}>
        <div className="slider-item">
          <ImageItem image={this.props.image} className="image" description={this.props.description} type="local" />
        </div>
        <div className="intro">
          <h4 className="banner-title">{this.props.title}</h4>
          <p className="banner-description">{this.props.description}</p>
        </div>
      </div>
    );
  }
}

FixedBanner.propTypes = {
  className:  PropTypes.string,
  image:  PropTypes.string,
  title:  PropTypes.string,
  description:  PropTypes.string
};

export default FixedBanner;