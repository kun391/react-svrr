import React from 'react';
import { MasterLayout } from 'layout';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Promise from 'bluebird';
import EmailSetting from 'modules/profile/setting/EmailSetting.jsx';
import { Users } from 'api';
import PropTypes from 'prop-types';

class EmailSettingPage extends React.Component {
  render() {
    return (
      <MasterLayout classOver="fix-overflow-x">
        <EmailSetting currentUser={this.props.currentUser} isAuth={this.props.isAuth} dispatch={this.props.dispatch} userActions={Users.actions} />
      </MasterLayout>
    );
  }
}

EmailSettingPage.fetchData = function(options) {
  const { store } = options;
  let data = {
    seo: {
      title: 'Email Settings',
      description: ''
    }
  };
  return Promise.resolve(data);
}

EmailSettingPage.propTypes = {
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

export default connect(bindStateToProps, bindDispatchToProps)(EmailSettingPage);
