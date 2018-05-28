import React from 'react';
import cookie from 'react-cookie';
import { emailPattern } from 'constants/regexPattern';
import { TextField, FormMessage } from 'partials/forms';
import PropTypes from 'prop-types';

class ConfirmPasswordForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      newPassword: '',
      confirmPassword: '',
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
    let newPassword = this.state.newPassword;
    let confirmPassword = this.state.confirmPassword;

    if (!newPassword) {
      notifications.newPassword = 'New password is required';
    } else if (!confirmPassword) {
      notifications.confirmPassword = 'Confirm password is required';
    } else if (newPassword !== confirmPassword) {
      notifications.error = 'The two password fields didn\'t match.';
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
      this.props.dispatch(this.props.userActions.confirmPassword(null, {new_password: this.state.newPassword, uid: this.props.uid, token: this.props.token})).then(response => {
        if (response && response.status === 204) {
          window.location = '/confirm-password/success';
        }
      }).catch(error => {
        let notifications = {};
        notifications.error = 'Cannot change your password. Please try again.';
        this.setState({ notifications });
      });
    }
  }

  render() {
    return (
      <form role="form" className="main-form" onSubmit={this.onSubmit.bind(this)} noValidate>
        <h2 className="title-form">Enter new password</h2>
        <p className="description-form pb30">Please enter your new password twice so we can verify you typed it in correctly.</p>
        <FormMessage type="error" error={this.state.notifications.error} />
        <TextField type="password" name="newPassword" value={this.state.newPassword} error={this.state.notifications.newPassword} placeholder="New Password" onChange={this.onChange.bind(this)} />
        <TextField type="password" name="confirmPassword" value={this.state.confirmPassword} error={this.state.notifications.confirmPassword} placeholder="Confirm Password" onChange={this.onChange.bind(this)} />
        <div className="form-group button-group">
          <button type="submit" className="btn btn-default-corner btn-signin btn-reset-password">Change my password</button>
        </div>
      </form>
    );
  }
}

ConfirmPasswordForm.propTypes = {
  token: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  userActions: PropTypes.object.isRequired
};

export default ConfirmPasswordForm;
