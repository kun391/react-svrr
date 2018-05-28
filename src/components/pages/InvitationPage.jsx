import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MasterLayout } from 'layout';
import { Users } from 'api';
import Invitation from 'modules/invitation';
import Promise from 'bluebird';
import PropTypes from 'prop-types';
import * as clubActions from 'actions/clubs';

class InvitationPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    this.props.dispatch(clubActions.fetchClubName(this.props.params.id, this.props.params.code));
    // notifications.error = 'You have reached an invalid join url. Please try again.';
  }

  render() {
    return (
      <MasterLayout>
        <div className="invitation-container">
        <div className="container-fluid">
          <div className="row">
            <div className="block-container">
              <div className="center">
                <div className="invitation-content">
                  <Invitation
                    currentUserId={this.props.currentUserId}
                    clubId={this.props.params.id}
                    code={this.props.params.code}
                    dispatch={this.props.dispatch}
                    userActions={Users.actions}
                    clubName={this.props.clubName}
                  />
                </div>
              </div>
              <div className="clearfix" />
            </div>
          </div>
        </div>
      </div>
      </MasterLayout>
    );
  }
}

InvitationPage.fetchData = function(options) {
  let data = {
    seo: {
      title: 'You\'ve been invited to join a club on Bookclubz',
      description: '',
    }
  };
  return Promise.resolve(data);
}

InvitationPage.propTypes = {
  currentUserId: PropTypes.node
};

const bindStateToProps = state => {
  return {
    currentUserId: state.auth ? state.auth.userInfo.id : null,
    clubName: state.clubName.name || ''
  };
};

const bindDispatchToProps = dispatch => ({
  dispatch
})

export default connect(bindStateToProps, bindDispatchToProps)(InvitationPage);
