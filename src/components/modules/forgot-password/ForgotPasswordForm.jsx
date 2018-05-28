import React from 'react';
import cookie from 'react-cookie';
import { emailPattern } from 'constants/regexPattern';
import { TextField, FormMessage } from 'partials/forms';
import PropTypes from 'prop-types';

class ForgotPasswordForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: '',
      notifications: {}
    }
  }

  onChange(e) {
    if (!!this.state.notifications[e.target.name]) {
      let notifications = Object.assign({}, this.state.notifications);
      delete notifications[e.target.name];
      delete notifications['error'];
      this.setState({
        [e.target.name]: e.target.value,
        notifications
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  }

  validate() {
    let notifications = {};
    let email = this.state.email;
    let password = this.state.password;

    if (!email) {
      notifications.email = 'Email is required';
    } else if (!emailPattern.test(email)) {
      notifications.email = 'Email is invalid';
    }

    if (Object.getOwnPropertyNames(notifications).length !== 0 && notifications.constructor === Object) {
      this.setState({ notifications });
      return false;
    }

    return true;
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.validate()) {
      this.props.dispatch(this.props.userActions.forgotPassword(null, this.state)).then(response => {
        if (response && response.status === 204) {
          window.location = '/forgot-password/success';
        }
      }).catch(error => {
        let notifications = {};
        notifications.error = 'Cannot reset your password. Please try again.';
        this.setState({ notifications });
      });
    }
  }

  render() {
    return (
      <form role="form" className="main-form" onSubmit={this.onSubmit.bind(this)} noValidate>
        <h2 className="title-form">Password Reset</h2>
        <p className="description-form pb30">Forgotten your password? Enter your email address below, and we'll email instructions for setting a new one.</p>
        <FormMessage type="error" error={this.state.notifications.error} />
        <TextField type="email" name="email" value={this.state.email} error={this.state.notifications.email} placeholder="Your Email" onChange={this.onChange.bind(this)} />
        <div className="form-group button-group">
          <button type="submit" className="btn btn-default-corner btn-signin btn-reset-password">Reset my password</button>
        </div>
      </form>
    );
  }
}

ForgotPasswordForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userActions: PropTypes.object.isRequired
};

export default ForgotPasswordForm;
