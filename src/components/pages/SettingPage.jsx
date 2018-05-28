import React from 'react';
import { MasterLayout } from 'layout';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Promise from 'bluebird';
import Setting from 'modules/profile/setting';
import { Users } from 'api';
import PropTypes from 'prop-types';

class SettingPage extends React.Component {
  render() {
    return (
      <MasterLayout classOver="fix-overflow-x">
        <Setting currentUser={this.props.currentUser} isAuth={this.props.isAuth} dispatch={this.props.dispatch} userActions={Users.actions} />
      </MasterLayout>
    );
  }
}

SettingPage.fetchData = function(options) {
  const { store } = options;
  let data = {
    seo: {
      title: 'Settings',
      description: ''
    }
  };
  return Promise.resolve(data);
}

SettingPage.propTypes = {
  isAuth: PropTypes.bool,
  currentUser: PropTypes.object
};

const bindStateToProps = state => {
  return {
    isAuth: state.auth ? state.auth.isAuth : false,
    currentUser: state.auth ? state.auth.userInfo : null
  }
}

const bindDispatchToProps = dispatch => ({
  dispatch
});

export default connect(bindStateToProps, bindDispatchToProps)(SettingPage);
