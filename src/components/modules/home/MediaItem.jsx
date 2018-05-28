import React from 'react';
import {ImageItem} from 'partials';
import PropTypes from 'prop-types';

class MediaItem extends React.Component {
  render() {
    return (
      <div className="content">
        <ImageItem className="image" image={this.props.image} description={this.props.description} type="local" />
        <p className="description">{this.props.description}</p>
      </div>
    );
  }
}

MediaItem.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string
};

export default MediaItem;