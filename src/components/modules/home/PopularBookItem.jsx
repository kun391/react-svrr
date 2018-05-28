import React from 'react';
import {ImageItem} from 'partials';
import PropTypes from 'prop-types';
import formatRoute from 'base/helpers/helpers.js';

class PopularBookItem extends React.Component {
  render() {
    return (
      <div className={`content ${this.props.className}`} onClick={this.props.onClick ? this.props.onClick : () => {}}>
        <a href={this.props.id ? `/books/${formatRoute(this.props.title, this.props.id)}` : `javascript:void(0);`}>
          <div className="wrap-image" style={{backgroundImage: `url(${this.props.image})`}}>
            <ImageItem className="image" image={this.props.image} description={this.props.title} />
          </div>
        </a>
        <div className="info">
          <h5 className="title"><a href={this.props.id ? `/books/${formatRoute(this.props.title, this.props.id)}` : `javascript:void(0);`} className="txt-link">{this.props.title}</a></h5>
          {this.props.author && this.props.author.name ? 
          <p className="author">By {this.props.author.name}</p>
          :
          null
          }
        </div>
      </div>
    );
  }
}

PopularBookItem.propTypes = {
  id: PropTypes.node,
  className: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.object
};

export default PopularBookItem;
