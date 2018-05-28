import React from 'react';
import { MasterLayout } from 'layout';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Users } from 'api';
import SigninForm from 'modules/signin';
import Promise from 'bluebird';

class SigninPage extends React.Component {
  render() {
    return (
      <MasterLayout>
        <div className="signin-container">
          <div className="left-container">
            <div className="signin-content">
              <div className="main-form-content signin-form-content">
                <SigninForm dispatch={this.props.dispatch} userActions={Users.actions} redirectLink={this.props.location.query.redirect} />
                <a href={`/forgot-password`} className="txt-forgot-link">Forgot password?</a>
                <a href={`/signup`} className="btn btn-default-corner bg-transparent btn-create-new-club">CREATE NEW CLUB</a>
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

SigninPage.fetchData = function(options) {
  let data = {
    seo: {
      title: 'Login to your Bookclubz account here.',
      description: 'Login to your Bookclubz account here, where you\'ll find your past book club meetings, RSVPs to your bookclub meetings, and other details about your club like ratings and meeting locations.',
    }
  };
  return Promise.resolve(data);
}

const bindStateToProps = state => {
  return {};
};

const bindDispatchToProps = dispatch => ({
  dispatch
});

export default connect(bindStateToProps, bindDispatchToProps)(SigninPage);
