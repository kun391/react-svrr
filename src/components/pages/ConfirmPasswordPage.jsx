import React from 'react';
import { MasterLayout } from 'layout';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Users } from 'api';
import ConfirmPasswordForm from 'modules/forgot-password/ConfirmPasswordForm.jsx';
import Promise from 'bluebird';

class ConfirmPasswordPage extends React.Component {
  render() {
    return (
      <MasterLayout>
        <div className="forgot-container forgot-success-container confirm-password-container">
          <div className="left-container">
            <div className="signin-content">
              <div className="main-form-content signin-form-content">
                <ConfirmPasswordForm dispatch={this.props.dispatch} userActions={Users.actions} uid={this.props.params.uid} token={this.props.params.token} />
              </div>
            </div>
          </div>
        </div>
      </MasterLayout>
    );
  }
}

ConfirmPasswordPage.fetchData = function(options) {
  let data = {
    seo: {
      title: 'Password reset.',
      description: '',
    }
  };
  return Promise.resolve(data);
}

const bindStateToProps = state => {
  return {};
}

const bindDispatchToProps = dispatch => ({
  dispatch
})

export default connect(bindStateToProps, bindDispatchToProps)(ConfirmPasswordPage);
