import React from 'react';
import { ImageItem, FixedBanner } from 'partials';
import { TextField, FormMessage } from 'partials/forms';
import axios from 'axios';
import { API_URL, SPIN_CFG } from 'constants/config';
import PropTypes from 'prop-types';
import cookie from 'react-cookie';
import { emailPattern } from 'constants/regexPattern';
import Spinner from 'react-tiny-spin';

class Invitation extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: '',
      email: '',
      password: '',
      showSignin: false,
      notifications: {},
      clubName: '',
      submitting: false
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
    } else if (!password) {
      notifications.password = 'Password is required';
    }
    if (Object.getOwnPropertyNames(notifications).length !== 0 && notifications.constructor === Object) {
      this.setState({ notifications });
      return false;
    }

    return true;
  }

  handleJoinClub(e) {
    e.preventDefault();

    this.setState({ submitting: true });
    axios({
      url: `${API_URL}/clubs/${this.props.clubId}/join/${this.props.code}/`,
      method: 'POST'
    }).then(response => {
      if (response && response.data) {
        window.location = `/clubs/${this.props.clubId}/meetings`;
      }
    }).catch(error => {
      let notifications = {};
      notifications.error = 'Cannot join club. Please try again.';
      this.setState({
        submitting: false,
        notifications
      });
    });
  }

  getUserInfo(e) {
    this.props.dispatch(this.props.userActions.me()).then(response => {
      // save token
      if (response && response.data) {
        cookie.save('userInfo', response.data, {path: '/'});

        if (this.state.name) {
          this.updateProfile(e);
        }

        this.handleJoinClub(e);
      }
    }).catch(error => {
      let notifications = {};
      notifications.error = 'Cannot join club. Please try again.';
      this.setState({
        submitting: false,
        notifications
      });
    });
  }

  handleJoinMember(e) {
    e.preventDefault();

    if (this.validate()) {
      this.setState({ submitting: true });
      this.props.dispatch(this.props.userActions.signin(null, {email: this.state.email, password: this.state.password})).then(response => {
        if (response && response.data) {
          // save access token
          cookie.save('accessToken', response.data.auth_token, {path: '/'});
          // save user info
          this.getUserInfo(e);
        }
      }).catch(error => {
        let notifications = {};
        notifications.error = 'Cannot join club. Please try again.';

        this.setState({
          submitting: false,
          notifications
        });
      });
    }
  }

  updateProfile() {
    let notifications = {};
    let params = {
      name: this.state.name
    };

    let cdata = cookie.load('userInfo');

    axios({
      url: `${API_URL}/auth/me/`,
      method: 'PATCH',
      data: params
    }).then(response => {
      if (response && response.data) {
        cdata.name = response.data.name;

        cookie.save('userInfo', cdata, { path: '/' });
      }
    }).catch(error => {
      let notifications = {};
      notifications.error = 'Cannot join club. Please try again.';
      this.setState({
        submitting: false,
        notifications
      });
    });
  }

  handleJoinNewMember(e) {
    e.preventDefault();

    if (this.validate()) {
      this.setState({ submitting: true });
      this.props.dispatch(this.props.userActions.signup(null, this.state)).then(response => {
        if (response && response.data) {
          this.handleJoinMember(e);
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

  changeTab() {
    this.setState({
      showSignin: !this.state.showSignin,
      notifications: {},
      name: '',
      email: '',
      password: ''
    })
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
      <div className="invitation-form">
        <ImageItem image="image-invitation.png" className="image" alt="invitation" type="local" />
        <h3 className="title">You've been invited to <b>{ this.props.clubName }</b></h3>
        {
          this.props.currentUserId
          ? <div className="form-container">
              <FormMessage type="error" error={this.state.notifications.error} />
              <button type="submit" className="btn btn-default-corner btn-join" disabled={this.state.submitting} onClick={this.handleJoinClub.bind(this)}>
                {
                  this.state.submitting
                  ? <Spinner config={spinCfg} />
                  : "Join book club"
                }
              </button>
            </div>
          : <div className="form-container">
              {
                this.state.showSignin
                ? <form className="main-form" onSubmit={this.handleJoinMember.bind(this)} role="form" noValidate>
                    <FormMessage type="error" error={this.state.notifications.error} />
                    <TextField type="email" name="email" value={this.state.email} error={this.state.notifications.email} placeholder="Your Email" onChange={this.onChange.bind(this)} />
                    <TextField type="password" name="password" value={this.state.password} error={this.state.notifications.password} placeholder="Password" onChange={this.onChange.bind(this)} />
                    <div className="form-group button-group">
                      <button type="submit" className="btn btn-default-corner btn-join" disabled={this.state.submitting}>
                        {
                          this.state.submitting
                          ? <Spinner config={spinCfg} />
                          : "Join book club"
                        }
                      </button>
                    </div>
                  </form>
                : <form className="main-form" onSubmit={this.handleJoinNewMember.bind(this)} role="form" noValidate>
                    <FormMessage type="error" error={this.state.notifications.error} />
                    <TextField type="text" name="name" value={this.state.name} error={this.state.notifications.name} placeholder="Your Name" onChange={this.onChange.bind(this)} />
                    <TextField type="email" name="email" value={this.state.email} error={this.state.notifications.email} placeholder="Your Email" onChange={this.onChange.bind(this)} />
                    <TextField type="password" name="password" value={this.state.password} error={this.state.notifications.password} placeholder="Password" onChange={this.onChange.bind(this)} />
                    <div className="form-group button-group">
                      <button type="submit" className="btn btn-default-corner btn-join" disabled={this.state.submitting}>
                        {
                          this.state.submitting
                          ? <Spinner config={spinCfg} />
                          : "Join book club"
                        }
                      </button>
                    </div>
                  </form>
              }

              <div className="bottom">
                <a href="javascript:void(0)" className="txt-forgot-link">Already have a Bookclubz account?</a>
                {
                  this.state.showSignin
                  ? <a href="javascript:void(0);" className="btn btn-default-corner bg-transparent btn-signin" onClick={this.changeTab.bind(this)}>SIGN UP</a>
                  : <a href="javascript:void(0);" className="btn btn-default-corner bg-transparent btn-signin" onClick={this.changeTab.bind(this)}>SIGN IN</a>
                }
              </div>
            </div>
        }
      </div>
    );
  }
}

Invitation.propTypes = {
  clubId: PropTypes.node,
  code: PropTypes.node,
  currentUserId: PropTypes.node,
  dispatch: PropTypes.func.isRequired,
  clubName: PropTypes.string.isRequired,
  userActions: PropTypes.object.isRequired
};

export default Invitation;
