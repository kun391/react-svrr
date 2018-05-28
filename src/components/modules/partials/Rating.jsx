import React from 'react';
import PropTypes from 'prop-types';

class Rating extends React.Component {
  render() {
    return (
      <p className="rating"><span className={`ficon ${this.props.icon}`}></span> Average rating: {parseFloat(Number(this.props.rate).toFixed(1))}/10</p>
    );
  }
}

Rating.propTypes = {
  icon: PropTypes.string,
  rate: PropTypes.node
};

export default Rating;
