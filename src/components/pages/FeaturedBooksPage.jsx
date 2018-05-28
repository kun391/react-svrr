import React from 'react';
import { MasterLayout } from 'layout';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FeaturedBooks from 'modules/featured-books';
import Promise from 'bluebird';
import { Books } from 'api';
import * as CONFIG from 'constants/config';
import PropTypes from 'prop-types';

class FeaturedBooksPage extends React.Component {
  render() {
    return (
      <MasterLayout classHeader="bg-transparent">
        <div className="featured-books-container">
          <FeaturedBooks type={CONFIG.TOP} link={this.props.location.pathname} books={this.props.books} />
        </div>
      </MasterLayout>
    );
  }
}

FeaturedBooksPage.fetchData = function(options) {
  const {store} = options;
  return store.dispatch(Books.actions.popularBooksAllTime({num_books: '10'})).then(() => {
    let data = {
      seo: {
        title: 'The most popular 10 book club books on Bookclubz',
        description: 'See the 10 most popular book club reads on Bookclubz, the website for organizing your book club events.',
      }
    };
    return Promise.resolve(data);
  });
}

FeaturedBooksPage.propTypes = {
  books: PropTypes.array
};

const bindStateToProps = state => {
  return {
    books: state.popularBooksAllTime.data.data.results
  }
}

export default connect(bindStateToProps)(FeaturedBooksPage);
