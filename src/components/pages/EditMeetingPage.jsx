import React from 'react';
import { MasterLayout } from 'layout';
import { connect } from 'react-redux';
import EditMeeting from 'modules/club/meeting/EditMeeting.jsx';
import Promise from 'bluebird';
import PropTypes from 'prop-types';

class EditMeetingPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <MasterLayout>
        <EditMeeting clubId={this.props.params.id} currentUserId={this.props.currentUserId} meetingId={this.props.params.mid} />
      </MasterLayout>
    );
  }
}

EditMeetingPage.fetchData = function(options) {
  let data = {
    seo: {
      title: 'Edit meeting',
      description: '',
    }
  };
  return Promise.resolve(data);
}

EditMeetingPage.propTypes = {
  currentUserId: PropTypes.number
};

const bindStateToProps = state => {
  return {
    currentUserId: state.auth ? state.auth.userInfo.id : null
  };
};

export default connect(bindStateToProps)(EditMeetingPage);
