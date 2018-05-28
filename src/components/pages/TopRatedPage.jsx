import React from 'react';
import { MasterLayout } from 'layout';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FeaturedBooks from 'modules/featured-books';
import Promise from 'bluebird';
import { Books } from 'api';
import CONFIG from 'constants/config';
import PropTypes from 'prop-types';

class TopRatedPage extends React.Component {
  render() {
    return (
      <MasterLayout classHeader="bg-transparent">
        <div className="featured-books-container">
          <FeaturedBooks type={CONFIG.RATED} link={this.props.location.pathname} books={this.props.books} />
        </div>
      </MasterLayout>
    );
  }
}

TopRatedPage.fetchData = function(options) {
  const { store, params } = options;
  return store.dispatch(Books.actions.topRatedBooks({num_books: '10'})).then(() => {
    let data = {
      seo: {
        title: 'The top rated 10 book club books on Bookclubz ',
        description: 'See the 10 most popular book club reads  on Bookclubz, the website for organizing your book club events.',
      }
    };
    return Promise.resolve(data);
  });
}

TopRatedPage.propTypes = {
  books: PropTypes.array
};

const bindStateToProps = state => {
  return {
    books: state.topRatedBooks.data.data.results
  }
}

export default connect(bindStateToProps)(TopRatedPage);
