import React from 'react';
import { MasterLayout } from 'layout';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Users } from 'api';
import SignupForm from 'modules/signup';
import Promise from 'bluebird';
import { Books } from 'api';

class SignupPage extends React.Component {
  render() {
    return (
      <MasterLayout>
        <div className="signup-container">
          <div className="left-container">
            <div className="signin-content">
              <div className="main-form-content signup-form-content">
                <SignupForm dispatch={this.props.dispatch} userActions={Users.actions} />
                <a href={`/signin`} className="txt-forgot-link">Already have a Bookclubz account?</a>
                <a href={`/signin`} className="btn btn-default-corner bg-transparent btn-create-new-club">SIGN IN</a>
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

SignupPage.fetchData = function(options) {
  let data = {
    seo: {
      title: 'Join the best website for organizing your book club.',
      description: 'Join the best website for organizing your book club.',
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

export default connect(bindStateToProps, bindDispatchToProps)(SignupPage);
