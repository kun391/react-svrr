import React from 'react';
import { MasterLayout } from 'layout';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Promise from 'bluebird';
import BookInspiration from 'modules/club/inspiration';
import PropTypes from 'prop-types';
import * as actions from 'actions/inspirations'
import { alphabetizeBookNodes } from 'base/helpers/alphabet.js';

class BookInspirationPage extends React.Component {
  componentDidMount() {
    this.props.dispatch(actions.fetchBookInspirations(this.props.params.id));
  }

  render() {
    const books = this.props.books.sort(alphabetizeBookNodes);

    return (
      <MasterLayout>
        <BookInspiration
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

BookInspirationPage.fetchData = function(options) {
  let data = {
    seo: {
      title: 'Book Inspiration',
      description: '',
    }
  };

  return Promise.resolve(data);
}

BookInspirationPage.propTypes = {
  currentUser: PropTypes.object,
  fetched: PropTypes.bool,
  count: PropTypes.number,
  books: PropTypes.array
};

const bindStateToProps = state => {
  return {
    currentUser: state.auth ? state.auth.userInfo : null,
    fetched: state.bookInspirations.fetched,
    count: state.bookInspirations.count || 0,
    books: state.bookInspirations.results || [],
  }
}

const bindDispatchToProps = dispatch => ({
  dispatch
});

export default connect(bindStateToProps, bindDispatchToProps)(BookInspirationPage);
