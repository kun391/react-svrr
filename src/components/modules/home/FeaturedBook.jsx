import React from 'react';
import { API_URL } from 'constants/config';
import { ImageItem } from 'partials';
import PropTypes from 'prop-types';
import formatRoute from 'base/helpers/helpers.js';

class FeaturedBook extends React.Component {
  render() {
    return (
      <div className="block-container block-featured-book">
        <div className="bg-home-featured-book">
          <div className="bg-image" style={{backgroundImage: `url(${this.props.book.image_url})`}} />
        </div>
        <div className="center">
          <div className="col-sm-4">
            <h4 className="block-title hidden-xs">BOOK OF THE MONTH</h4>
            <div className="info">
              <h3 className="book-title"><a href={`/books/${formatRoute(this.props.book.title, this.props.book.id)}`} className="txt-link">{this.props.book.title}</a></h3>
              <p className="author">by {this.props.book.author.name}</p>
            </div>
          </div>
          <div className="col-sm-4">
            <a href={`/books/${formatRoute(this.props.book.title, this.props.book.id)}`}>
              <div className="book-image">
                <ImageItem image={this.props.book.image_url} className="image" description={this.props.book.title}/>
              </div>
            </a>
          </div>
          <div className="col-sm-4">
            <div className="description-content">
              <h4 className="block-title">Beginning in 1910 during the time of Japanese colonialization and ending many decades later in 1989, Pachinko is the epic saga of a Korean family told over four generations.</h4>
              <div className="info">
                <p className="description">{this.props.book.bookclubz_description}</p>
              </div>
              <a href={API_URL + "/files/pdf/Pachinko_Reading_Group_Guide.pdf"} className="btn btn-default-corner bg-transparent btn-discussion">Discussion guide</a>
            </div>
          </div>
        </div>
        <div className="clearfix"></div>
      </div>
    );
  }
}

FeaturedBook.propTypes = {
  book: PropTypes.object,
  className: PropTypes.string,
  image: PropTypes.string,
  description: PropTypes.string
};

export default FeaturedBook;
