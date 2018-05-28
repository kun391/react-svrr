import React from 'react';
import {ImageItem} from 'partials';

class FeaturedBooksBanner extends React.Component {
  render() {
    return (
      <div className="banner-container featured-book-banner">
        <div className="slider-item">
          <ImageItem image="bg-featured-book.png" className="image" description="" type="local" />
        </div>
        <div className="intro">
          <h4 className="intro-title">Top Books</h4>
        </div>
      </div>
    );
  }
}

export default FeaturedBooksBanner;
