import React from 'react';
import { MasterLayout } from 'layout';
import Promise from 'bluebird';

class ConfirmPasswordSuccessPage extends React.Component {
  render() {
    return (
      <MasterLayout>
        <div className="forgot-container forgot-success-container">
          <div className="left-container">
            <div className="signin-content">
              <div className="main-form-content signin-form-content">
                <h2 className="title-form">Password reset complete</h2>
                <p className="description-form pb30">Your password has been set. You may go ahead and log in now.</p>
                <a href={`/signin`} className="btn btn-default-corner bg-transparent">SIGN IN</a>
              </div>
            </div>
          </div>
        </div>
      </MasterLayout>
    );
  }
}

ConfirmPasswordSuccessPage.fetchData = function(options) {
  let data = {
    seo: {
      title: 'Password reset complete',
      description: '',
    }
  };
  return Promise.resolve(data);
}

export default ConfirmPasswordSuccessPage;
