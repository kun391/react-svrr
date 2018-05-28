import React from 'react';
import { FixedBanner } from 'partials';
import SortBy from './SortBy.jsx';
import BookList from './BookList.jsx';
import TopRatedBookList from './TopRatedBookList.jsx';
import PopularBookList from './PopularBookList.jsx';
import SignupFooter from 'modules/home/SignupFooter.jsx';
import * as CONFIG from 'constants/config';
import PropTypes from 'prop-types';

class FeaturedBooks extends React.Component {
  render() {
    return (
      <div className="featured-books-content">
        <div className="container-fluid">
          <div className="row">
            <FixedBanner image="bg-top-book.png" className="featured-books-banner" title="Books" description="" />
            <SortBy link={this.props.link} />
            {
              this.props.type === CONFIG.TOP
              ? <BookList books={this.props.books} />
              : null
            }
            {
              this.props.type === CONFIG.RATED
              ? <TopRatedBookList books={this.props.books} />
              : null
            }
            {
              this.props.type === CONFIG.POPULAR
              ? <PopularBookList books={this.props.books} />
              : null
            }
            <SignupFooter />
          </div>
        </div>
      </div>
    );
  }
}

FeaturedBooks.propTypes = {
  type: PropTypes.string,
  link: PropTypes.string,
  books: PropTypes.array
};

export default FeaturedBooks;
