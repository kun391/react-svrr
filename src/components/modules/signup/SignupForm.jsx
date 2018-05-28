import React from 'react';
import cookie from 'react-cookie';
import { emailPattern } from 'constants/regexPattern';
import { TextField, FormMessage } from 'partials/forms';
import PropTypes from 'prop-types';
import { SPIN_CFG } from 'constants/config';
import Spinner from 'react-tiny-spin';

class SignupForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      email: '',
      password: '',
      notifications: {},
      submitting: false
    };
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

  signin() {
    if (this.validate()) {
      this.props.dispatch(this.props.userActions.signin(null, {email: this.state.email, password: this.state.password})).then(response => {
        if (response && response.data) {
          // save access token
          cookie.save('accessToken', response.data.auth_token, {path: '/'});
          // save user info
          this.getUserInfo();
        }
      }).catch(error => {
        let notifications = {};
        notifications.error = 'Invalid credentials.';
        this.setState({
          submitting: false,
          notifications
        });
      });
    }
  }

  getUserInfo() {
    this.props.dispatch(this.props.userActions.me()).then(response => {
      // save token
      if (response && response.data) {
        cookie.save('userInfo', response.data, {path: '/'});

        if (typeof window != "undefined") {
          window.location = '/create-club';
        }
      }

      this.setState({ submitting: false });
    }).catch(error => {
      this.setState({ submitting: false });
      console.log(error);
    });
  }

  validate() {
    let notifications = {};
    let email = this.state.email;
    let password = this.state.password;

    if (!email) {
      notifications.email = 'Email is required';
    } else if (!emailPattern.test(email)) {
      notifications.email = 'Email is invalid';
    } else if (!password) {
      notifications.password = 'Password is required';
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
      this.setState({ submitting: true });
      this.props.dispatch(this.props.userActions.signup(null, this.state)).then(response => {
        if (response && response.data) {
          if (typeof window !== 'undefined' && window.gtag !== 'undefined') {
            gtag('event', 'Signup', {'event_action': 'Home page signup'})
          }
          this.signin();
        }
      }).catch(error => {
        let notifications = {};

        if (error && error.response && error.response.data) {
          if (error.response.data.email && error.response.data.email[0]) {
            notifications.error = error.response.data.email[0];
          } else {
            notifications.error = 'Cannot create new account. Please try again.';
          }
        } else {
          notifications.error = 'Cannot create new account. Please try again.';
        }

        this.setState({
          submitting: false,
          notifications
        });
      });
    }
  }

  render() {
    let spinCfg = Object.assign({}, SPIN_CFG);
    spinCfg.position = 'relative';
    spinCfg.color = '#fff';
    spinCfg.lines = 12;
    spinCfg.length = 5;
    spinCfg.width = 2;
    spinCfg.radius = 5;

    return (
      <form role="form" className="main-form" onSubmit={this.onSubmit.bind(this)} noValidate>
        <h2 className="title-form">Create a club</h2>
        <FormMessage type="error" error={this.state.notifications.error} />
        <TextField type="email" name="email" value={this.state.email} error={this.state.notifications.email} placeholder="Your Email" onChange={this.onChange.bind(this)} />
        <TextField type="password" name="password" value={this.state.password} error={this.state.notifications.password} placeholder="Password" onChange={this.onChange.bind(this)} />
        <div className="form-group button-group">
          <button type="submit" className="btn btn-default-corner btn-signin" disabled={this.state.submitting}>
            {
              this.state.submitting
              ? <Spinner config={spinCfg} />
              : "Get Started"
            }
          </button>
        </div>
      </form>
    );
  }
}

SignupForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  userActions: PropTypes.object.isRequired
};

export default SignupForm;
