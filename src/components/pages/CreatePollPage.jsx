import React from 'react';
import { MasterLayout } from 'layout';
import { connect } from 'react-redux';
import CreatePoll from 'modules/club/poll/CreatePoll.jsx';
import Promise from 'bluebird';
import PropTypes from 'prop-types';
import * as actions from 'actions/polls';

class CreatePollPage extends React.Component {
  createPoll (pollData) {
    this.props.dispatch(actions.createPoll(pollData))
  }

  render () {
    return (
      <MasterLayout>
        <CreatePoll
          createPoll={this.createPoll.bind(this)}
          clubId={this.props.params.id}
          creatingPoll={this.props.creatingPoll}
          currentUserId={this.props.currentUserId} />
      </MasterLayout>
    )
  }
}

CreatePollPage.fetchData = function (options) {
  let data = {
    seo: {
      title: 'Create a new poll for your club',
      description: ''
    }
  }
  return Promise.resolve(data)
}

CreatePollPage.propTypes = {
  currentUserId: PropTypes.number,
  creatingPoll: PropTypes.bool
};

const bindStateToProps = state => {
  return {
    currentUserId: state.auth ? state.auth.userInfo.id : null,
    creatingPoll: state.currentPolls ? state.currentPolls.creatingPoll : false
  };
};

const bindDispatchToProps = dispatch => ({
  dispatch
});

export default connect(bindStateToProps, bindDispatchToProps)(CreatePollPage);
