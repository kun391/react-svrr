import React from 'react';
import { MasterLayout } from 'layout';
import { connect } from 'react-redux';
import CreateMeeting from 'modules/club/meeting/CreateMeeting.jsx';
import Promise from 'bluebird';
import PropTypes from 'prop-types';

class CreateMeetingPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <MasterLayout>
        <CreateMeeting clubId={this.props.params.id} currentUserId={this.props.currentUserId} />
      </MasterLayout>
    );
  }
}

CreateMeetingPage.fetchData = function(options) {
  let data = {
    seo: {
      title: 'Create new meeting',
      description: '',
    }
  };
  return Promise.resolve(data);
}

CreateMeetingPage.propTypes = {
  currentUserId: PropTypes.object
};

const bindStateToProps = state => {
  return {
    currentUserId: state.auth ? state.auth.userInfo.id : null
  };
};

export default connect(bindStateToProps)(CreateMeetingPage);
