import React from 'react';
import { MasterLayout } from 'layout';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Users } from 'api';
import ForgotPasswordForm from 'modules/forgot-password';
import Promise from 'bluebird';

class ForgotPasswordPage extends React.Component {
  render() {
    return (
      <MasterLayout>
        <div className="forgot-container">
          <div className="left-container">
            <div className="signin-content">
              <a href={`/signin`} className="back-link pull-left"><span className="ficon ficon-back"></span>Back</a>
              <div className="main-form-content signin-form-content">
                <ForgotPasswordForm dispatch={this.props.dispatch} userActions={Users.actions} />
              </div>
            </div>
          </div>
          <div className="right-container">
          </div>
        </div>
      </MasterLayout>
    );
  }
}

ForgotPasswordPage.fetchData = function(options) {
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

export default connect(bindStateToProps, bindDispatchToProps)(ForgotPasswordPage);
