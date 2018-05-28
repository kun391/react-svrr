import React from 'react';
import PropTypes from 'prop-types';

class ImageItem extends React.Component {
  render() {
    const imageUrl = this.props.type === 'local' ? require(`assets/images/${this.props.image}`) : this.props.image;

    return (
      <img className={this.props.className} src={imageUrl} alt={this.props.description}  itemProp={this.props.itemprop} />
    );
  }
}

ImageItem.propTypes = {
  className: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string,
  type: PropTypes.string,
  itemprop: PropTypes.string
};

export default ImageItem;
