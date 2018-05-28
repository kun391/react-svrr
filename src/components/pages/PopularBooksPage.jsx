import React from 'react';
import { MasterLayout } from 'layout';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import FeaturedBooks from 'modules/featured-books';
import Promise from 'bluebird';
import { Books } from 'api';
import * as CONFIG from 'constants/config';
import PropTypes from 'prop-types';
import moment from 'moment';

class PopularBooksPage extends React.Component {
  render() {
    return (
      <MasterLayout classHeader="bg-transparent">
        <div className="featured-books-container">
          <FeaturedBooks type={CONFIG.POPULAR} link={this.props.location.pathname} books={this.props.books} />
        </div>
      </MasterLayout>
    );
  }
}

PopularBooksPage.fetchData = function(options) {
  const { store, params } = options;
  return store.dispatch(Books.actions.mostPopularBooks({month: params.month, year: params.year, num_books: '5'})).then(() => {
    let data = {
      seo: {
        title: 'The most popular 5 book club books on Bookclubz for ' + moment(params.month + ' 1,' + params.year).format('MMMM') + ' ' + params.year,
        description: 'See the 5 most popular book club reads for ' + moment(params.month + ' 1,' + params.year).format('MMMM') + ' ' + params.year + ' on Bookclubz, the website for organizing your book club events.',
      }
    };
    return Promise.resolve(data);
  });
}

PopularBooksPage.propTypes = {
  books: PropTypes.array
};

const bindStateToProps = state => {
  return {
    books: state.mostPopularBooks.data.data.results
  }
}

export default connect(bindStateToProps)(PopularBooksPage);
