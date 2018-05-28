import React from 'react';
import { MasterLayout } from 'layout';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as memberActions from 'actions/members';
import Promise from 'bluebird';
import WantToReadBooks from 'modules/profile/want-to-read-books';
import PropTypes from 'prop-types';
import { BOOK_TYPES } from 'constants/config';
import { alphabetizeBookNodes } from 'base/helpers/alphabet.js';

class MemberWantToReadBooksPage extends React.Component {
  render() {
    const books = this.props.books.sort(alphabetizeBookNodes);
    
    return (
      <MasterLayout classOver="fix-overflow-x">
        <WantToReadBooks
          currentUser={this.props.currentUser}
          dispatch={this.props.dispatch}
          fetched={this.props.fetched}
          count={this.props.count}
          books={books}
        />
      </MasterLayout>
    );
  }
}

MemberWantToReadBooksPage.fetchData = function(options) {
  const { store, params, at } = options;

  return Promise.all([
    store.dispatch(memberActions.fetchBooks(params.id, BOOK_TYPES.WANT_TO_READ, at))
  ]).spread(() => {
    let data = {
      seo: {
        title: 'Books I want to read',
        description: '',
      }
    };

    return Promise.resolve(data);
  });
}

MemberWantToReadBooksPage.propTypes = {
  currentUser: PropTypes.object,
  fetched: PropTypes.bool,
  count: PropTypes.number,
  books: PropTypes.array
};

const bindStateToProps = state => {
  return {
    currentUser: state.auth ? state.auth.userInfo : null,
    fetched: state.memberWantToReadBooks.fetched,
    count: state.memberWantToReadBooks.count || 0,
    books: state.memberWantToReadBooks.results || []
  }
}

const bindDispatchToProps = dispatch => ({
  dispatch
});

export default connect(bindStateToProps, bindDispatchToProps)(MemberWantToReadBooksPage);
