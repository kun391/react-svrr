import React from 'react';
import { MasterLayout } from 'layout';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Promise from 'bluebird';
import MemberSetting from 'modules/club/setting';
import PropTypes from 'prop-types';
import * as clubActions from 'actions/clubs';
import * as clubSettingActions from 'actions/club-settings';
import * as membershipActions from 'actions/memberships';

class MemberSettingPage extends React.Component {
  componentDidMount() {
    Promise.all([
      this.props.dispatch(clubActions.fetchMembersIfNeeded(this.props.params.id)),
      this.props.dispatch(membershipActions.fetchMembershipsIfNeeded(this.props.params.id))
    ]).then(() => {
      this.props.dispatch(clubSettingActions.mergeMembershipByUserId(this.props.memberships, this.props.members))
      this.props.dispatch(clubSettingActions.checkClubAdmin(this.props.mergedMembers, this.props.currentUser.id));
    });
  }

  render() {
    return (
      <MasterLayout classOver="fix-overflow-x">
        <MemberSetting
          currentUser={this.props.currentUser}
          clubId={this.props.params.id}
          dispatch={this.props.dispatch}
          members={this.props.members}
          fetchedMembers={this.props.fetchedMembers}
          memberships={this.props.memberships}
          fetchedMeetings={this.props.fetchedMeetings}
          mergedMembers={this.props.mergedMembers}
          fetchedMergedMembers={this.props.fetchedMergedMembers}
          isClubAdmin={this.props.isClubAdmin}
        />
      </MasterLayout>
    );
  }
}

MemberSettingPage.fetchData = function(options) {
  let data = {
    seo: {
      title: 'Member settings',
      description: '',
    }
  };

  return Promise.resolve(data);
}

MemberSettingPage.propTypes = {
  currentUser: PropTypes.object,
  members: PropTypes.array,
  fetchedMembers: PropTypes.bool,
  memberships: PropTypes.array,
  fetchedMeetings: PropTypes.bool,
  mergedMembers: PropTypes.array,
  fetchedMergedMembers: PropTypes.bool,
  isClubAdmin: PropTypes.bool
};

const bindStateToProps = state => {
  return {
    currentUser: state.auth ? state.auth.userInfo : null,
    members: state.members.results || [],
    fetchedMembers: state.members.fetched,
    memberships: state.memberships.results || [],
    fetchedMeetings: state.memberships.fetched,
    mergedMembers: state.mergedMembers.results || [],
    fetchedMergedMembers: state.mergedMembers.merged,
    isClubAdmin: state.clubAdmin.isClubAdmin
  }
}

const bindDispatchToProps = dispatch => ({
  dispatch
});

export default connect(bindStateToProps, bindDispatchToProps)(MemberSettingPage);
