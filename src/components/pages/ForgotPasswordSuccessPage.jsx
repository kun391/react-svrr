import React from 'react';
import { MasterLayout } from 'layout';
import Promise from 'bluebird';

class ForgotPasswordSuccessPage extends React.Component {
  render() {
    return (
      <MasterLayout>
        <div className="forgot-container forgot-success-container">
          <div className="left-container">
            <div className="signin-content">
              <div className="main-form-content signin-form-content">
                <h2 className="title-form">Password reset sent</h2>
                <p className="description-form pb30">We've emailed you instructions for setting your password, if an account exists with the email you entered. You should receive them shortly.</p>
                <p className="description-form">If you don't receive an email, please make sure you've entered the address you registered with, and check your spam folder.</p>
              </div>
            </div>
          </div>
        </div>
      </MasterLayout>
    );
  }
}

ForgotPasswordSuccessPage.fetchData = function(options) {
  let data = {
    seo: {
      title: 'Password reset sent',
      description: '',
    }
  };
  return Promise.resolve(data);
}

export default ForgotPasswordSuccessPage;
