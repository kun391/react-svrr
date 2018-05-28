import React from 'react';
import { MasterLayout } from 'layout';
import { connect } from 'react-redux';
import EditPoll from 'modules/club/poll/EditPoll.jsx';
import Promise from 'bluebird';
import PropTypes from 'prop-types';
import * as actions from 'actions/polls';

class EditPollPage extends React.Component {
  editPoll (pollData) {
    this.props.dispatch(actions.editPoll(this.props.poll.id, pollData))
  }

  deletePoll (pollData) {
    this.props.dispatch(actions.deletePoll(pollData))
  }
  
  componentDidMount () {
    this.props.dispatch(actions.fetchPolls(this.props.params.id))
  }

  render () {
    return (
      <MasterLayout>
        <EditPoll
          editPoll={this.editPoll.bind(this)}
          deletePoll={this.deletePoll.bind(this)}
          updatingPoll={this.props.updatingPoll}
          updatingPollError={this.props.updatingPollError}
          clubId={this.props.params.id}
          currentUserId={this.props.currentUserId}
          poll={this.props.poll} />
      </MasterLayout>
    );
  }
}

EditPollPage.fetchData = function(options) {
  let data = {
    seo: {
      title: 'Edit a poll',
      description: '',
    }
  };
  return Promise.resolve(data);
}

EditPollPage.propTypes = {
  currentUserId: PropTypes.number,
  updatingPoll: PropTypes.bool,
  updatingPollError: PropTypes.string
};

const bindStateToProps = (state, ownProps) => {
  return {
    currentUserId: state.auth ? state.auth.userInfo.id : null,
    updatingPoll: state.currentPolls ? state.currentPolls.updatingPoll : false,
    updatingPollError: state.currentPolls ? state.currentPolls.updatingPollError : '',
    poll: state.currentPolls && state.currentPolls.results
      ? state.currentPolls.results[ownProps.params.pid]
      : {}
  };
};

const bindDispatchToProps = dispatch => ({
  dispatch
});

export default connect(bindStateToProps, bindDispatchToProps)(EditPollPage);
