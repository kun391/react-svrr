import React from 'react';
import { ImageItem, Rating } from 'partials';
import PropTypes from 'prop-types';
import formatRoute from 'base/helpers/helpers.js';

class BookItem extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <li className="item">
        <div className="column" style={{'width': '10.5%'}}>
          <span className="order-number">{this.props.index + 1}.</span>
        </div>
        <div className="column" style={{'width': '17%'}}>
          <a href={`/books/${formatRoute(this.props.data.title, this.props.data.id)}`}>
            <div className="wrap-image">
                <ImageItem image={this.props.data.image_url} className="image" description={this.props.data.title} />
            </div>
          </a>
        </div>
        <div className="column">
          <div className="content">
            <h3 className="title"><a href={`/books/${formatRoute(this.props.data.title, this.props.data.id)}`} className="txt-link">{this.props.data.title}</a></h3>
            <p className="author">{`by ${this.props.data.author.name}`}</p>
            <span className="ficon-amazon"></span>
            <Rating rate={this.props.data.get_average_rating} icon="ficon-star-2" />
          </div>
        </div>
      </li>
    );
  }
}

BookItem.propTypes = {
  index: PropTypes.number,
  data: PropTypes.object
};

export default BookItem;
