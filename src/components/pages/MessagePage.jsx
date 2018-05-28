import React from 'react';
import { MasterLayout } from 'layout';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Promise from 'bluebird';
import Message from 'modules/club/message';
import PropTypes from 'prop-types';
import * as actions from 'actions/messages';

class MessagePage extends React.Component {
  getData() {
    return Promise.all([
      this.props.dispatch(actions.fetchMessages(this.props.params.id))
    ]);
  }
  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <MasterLayout classOver="fix-overflow-x">
        <Message
          currentUser={this.props.currentUser}
          clubId={this.props.params.id}
          dispatch={this.props.dispatch}
          messages={this.props.messages}
          fetched={this.props.fetched}
        />
      </MasterLayout>
    );
  }
}

MessagePage.fetchData = function(options) {
  let data = {
    seo: {
      title: 'Messages',
      description: '',
    }
  };

  return Promise.resolve(data);
}

MessagePage.propTypes = {
  currentUser: PropTypes.object,
  messages: PropTypes.array,
  fetched: PropTypes.bool
};

const bindStateToProps = state => {
  return {
    currentUser: state.auth ? state.auth.userInfo : null,
    messages: state.messages.results || [],
    fetched: state.messages.fetched
  }
}

const bindDispatchToProps = dispatch => ({
  dispatch
});

export default connect(bindStateToProps, bindDispatchToProps)(MessagePage);
