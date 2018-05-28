import React from 'react';
import { MasterLayout } from 'layout';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Promise from 'bluebird';
import Meeting from 'modules/club/meeting';
import PropTypes from 'prop-types';
import * as actions from 'actions/meetings';
import * as membershipActions from 'actions/memberships';

class MeetingPage extends React.Component {
  getData() {
    return Promise.all([
      this.props.dispatch(actions.fetchMeetings(this.props.params.id)),
      this.props.dispatch(membershipActions.fetchMemberships(this.props.params.id))
    ]).spread(() => {
      this.props.dispatch(membershipActions.checkMembershipsByUserId(this.props.memberships, this.props.currentUser.id));
    });
  }
  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <MasterLayout classOver="fix-overflow-x">
        <Meeting
          currentUser={this.props.currentUser}
          clubId={this.props.params.id}
          dispatch={this.props.dispatch}
          currentMeetings={this.props.currentMeetings}
          fetchedCurrent={this.props.fetchedCurrent}
          pastMeetings={this.props.pastMeetings}
          fetchedPast={this.props.fetchedPast}
          memberships={this.props.memberships}
          membershipByUserId={this.props.membershipByUserId}
          onGetData={this.getData.bind(this)}
        />
      </MasterLayout>
    );
  }
}

MeetingPage.fetchData = function(options) {
  let data = {
    seo: {
      title: 'My Meetings',
      description: '',
    }
  };

  return Promise.resolve(data);
}

MeetingPage.propTypes = {
  currentUser: PropTypes.object,
  currentMeetings: PropTypes.array,
  fetchedCurrent: PropTypes.bool,
  pastMeetings: PropTypes.array,
  fetchedPast: PropTypes.bool
};

const bindStateToProps = state => {
  return {
    currentUser: state.auth ? state.auth.userInfo : null,
    currentMeetings: state.currentMeetings.results || [],
    fetchedCurrent: state.pastMeetings.fetched,
    pastMeetings: state.pastMeetings.results || [],
    fetchedPast: state.pastMeetings.fetched,
    memberships: state.memberships.results || [],
    membershipByUserId: state.membershipByUserId
  }
}

const bindDispatchToProps = dispatch => ({
  dispatch
});

export default connect(bindStateToProps, bindDispatchToProps)(MeetingPage);
