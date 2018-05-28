import React from 'react';
import { MasterLayout } from 'layout';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Promise from 'bluebird';
import PropTypes from 'prop-types';
import Profile from 'modules/profile';
import { BOOK_TYPES } from 'constants/config';
import * as memberActions from 'actions/members';
import * as clubActions from 'actions/clubs';

class MyProfilePage extends React.Component {
  componentDidMount() {
    this.props.dispatch(clubActions.fetchClubs(this.props.params.id));
    this.props.dispatch(memberActions.fetchBooks(this.props.params.id, BOOK_TYPES.ALREADY_READ));
    this.props.dispatch(memberActions.fetchBooks(this.props.params.id, BOOK_TYPES.WANT_TO_READ));
  }

  render() {
    return (
      <MasterLayout>
        <Profile
          currentUser={this.props.currentUser}
          dispatch={this.props.dispatch}
          clubs={this.props.clubs}
          alreadyReadBooks={this.props.alreadyReadBooks}
          wantToReadBooks={this.props.wantToReadBooks}
        />
      </MasterLayout>
    );
  }
}

MyProfilePage.fetchData = function(options) {
  let data = {
    seo: {
      title: 'My profile',
      description: '',
    }
  };

  return Promise.resolve(data);
}

MyProfilePage.propTypes = {
  currentUser: PropTypes.object,
  clubs: PropTypes.object,
  alreadyReadBooks: PropTypes.object,
  wantToReadBooks: PropTypes.object
};

const bindStateToProps = state => {
  return {
    currentUser: state.auth ? state.auth.userInfo : null,
    clubs: state.clubReducers,
    alreadyReadBooks: state.memberAlreadyReadBooks,
    wantToReadBooks: state.memberWantToReadBooks
  }
}

const bindDispatchToProps = dispatch => ({
  dispatch
});

export default connect(bindStateToProps, bindDispatchToProps)(MyProfilePage);
