import React from 'react';
import { MasterLayout } from 'layout';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Promise from 'bluebird';
import Poll from 'modules/club/poll';
import PropTypes from 'prop-types';
import * as actions from 'actions/polls';

class PollPage extends React.Component {
  componentDidMount () {
    this.props.dispatch(actions.fetchPolls(this.props.params.id))
  }

  render() {
    return (
      <MasterLayout classOver="fix-overflow-x">
        <Poll
          currentUser={this.props.currentUser}
          clubId={this.props.params.id}
          dispatch={this.props.dispatch}
          currentPolls={Object.values(this.props.currentPolls)}
          fetchedCurrent={this.props.fetchedCurrent}
          votingOn={this.props.votingOn}
        />
      </MasterLayout>
    );
  }
}

PollPage.fetchData = function(options) {
  let data = {
    seo: {
      title: 'My Polls',
      description: '',
    }
  };

  return Promise.resolve(data);
}

PollPage.propTypes = {
  currentUser: PropTypes.object,
  currentPolls: PropTypes.object,
  fetchedCurrent: PropTypes.bool,
  votingOn: PropTypes.number
};

const bindStateToProps = state => {
  return {
    currentUser: state.auth ? state.auth.userInfo : null,
    currentPolls: state.currentPolls.results,
    fetchedCurrent: state.currentPolls.fetched,
    votingOn: state.currentPolls.votingOn
  }
}

const bindDispatchToProps = dispatch => ({
  dispatch
});

export default connect(bindStateToProps, bindDispatchToProps)(PollPage);
