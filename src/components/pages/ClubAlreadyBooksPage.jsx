import React from 'react';
import { MasterLayout } from 'layout';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Promise from 'bluebird';
import AlreadyBooks from 'modules/club/already-books';
import PropTypes from 'prop-types';
import * as actions from 'actions/clubs';
import { alphabetizeBookNodes } from 'base/helpers/alphabet.js';


class ClubAlreadyBooksPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(actions.fetchAlreadyBooks(this.props.params.id));
  }

  render() {
    const books = this.props.books.sort(alphabetizeBookNodes);

    return (
      <MasterLayout classOver="fix-overflow-x">
        <AlreadyBooks
          clubId={this.props.params.id}
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

ClubAlreadyBooksPage.fetchData = function(options) {
  let data = {
    seo: {
      title: 'Books We have read',
      description: ''
    }
  };

  return Promise.resolve(data);
}

ClubAlreadyBooksPage.propTypes = {
  currentUser: PropTypes.object,
  fetched: PropTypes.bool,
  count: PropTypes.number,
  books: PropTypes.array
};

const bindStateToProps = state => {
  return {
    currentUser: state.auth ? state.auth.userInfo : null,
    fetched: state.clubAlreadyReadBooks.fetched,
    count: state.clubAlreadyReadBooks.count || 0,
    books: state.clubAlreadyReadBooks.results || []
  }
}

const bindDispatchToProps = dispatch => ({
  dispatch
});

export default connect(bindStateToProps, bindDispatchToProps)(ClubAlreadyBooksPage);
