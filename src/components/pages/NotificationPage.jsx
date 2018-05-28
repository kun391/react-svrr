import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { MasterLayout } from 'layout';
import Notification from 'modules/notification';
import Promise from 'bluebird';
import PropTypes from 'prop-types';

class NotificationPage extends React.Component {
  constructor(props, context) {
    super(props, context);
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
                  <Notification
                    currentUserId={this.props.currentUserId}
                    memberId={this.props.params.memberId || this.props.location.query.member}
                    clubId={this.props.params.clubId}
                    meetingId={this.props.params.meetingId}
                    bookId={this.props.params.bookId}
                    path={this.props.params.path}
                    type={this.props.params.type}
                    value={this.props.location.query.response}
                    rating={this.props.params.rating}
                    emailHash={this.props.location.query.email_hash}
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

NotificationPage.fetchData = function(options) {
  let data = {
    seo: {
      title: 'Bookclubz',
      description: '',
    }
  };
  return Promise.resolve(data);
}

NotificationPage.propTypes = {
  currentUserId: PropTypes.node
};

const bindStateToProps = state => {
  return {
    currentUserId: state.auth ? state.auth.userInfo.id : null
  };
};

const bindDispatchToProps = dispatch => ({
  dispatch
})

export default connect(bindStateToProps, bindDispatchToProps)(NotificationPage);
