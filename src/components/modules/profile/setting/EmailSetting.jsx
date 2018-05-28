import React from 'react';
import { ImageItem, BlockHeader } from 'partials';
import ProfileInfo from 'modules/profile/ProfileInfo.jsx';
import { TextField, ToggleButton, FormMessage } from 'partials/forms';
import PropTypes from 'prop-types';
import cookie from 'react-cookie';
import { SIDE_BAR } from 'constants/config';
import axios from 'axios';
import { API_URL } from 'constants/config';
import ShareInfo from './ShareInfo.jsx';

class EmailSetting extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      currentUser: this.props.currentUser,
      email_me: this.props.currentUser && this.props.currentUser.email_me || false,
      email_popular_books: this.props.currentUser && this.props.currentUser.email_popular_books || false,
      notifications: {}
    };
  }

  onChange(e) {
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({
      [e.target.name]: value,
    });
  }

  redirectLink(e) {
    e.preventDefault();

    window.location = `/profile/${this.props.currentUser.id}`;
  }

  onSubmit(e) {
    e.preventDefault();

    let notifications = {};
    let params = {
      email_me: this.state.email_me,
      email_popular_books: this.state.email_popular_books
    };
    let cdata = cookie.load('userInfo');

    axios({
      url: `${API_URL}/auth/me/`,
      method: 'PATCH',
      data: params
    }).then(response => {
      if (response && response.data) {
        notifications.success = 'Update successful';
        this.setState({
          currentUser: response.data,
          notifications
        });

        cdata.email_me = response.data.email_me;
        cdata.email_popular_books = response.data.email_popular_books;

        cookie.save('userInfo', cdata, { path: '/' });
      }
    }).catch(error => {
      notifications.error = 'Cannot update you profile';
      this.setState({
        notifications
      });
    });
  }

  componentDidMount() {
    // This is call only at client
  }

  render() {
    return (
      <div className="profile-container setting-container">
        <div className="container-fluid">
          <div className="row">
            <div className="center">
              <div className="left-container">
                <ProfileInfo currentUser={this.state.currentUser} active={SIDE_BAR.SETTINGS} />
              </div>
              <div className="right-container">
                <div className="block-container">
                  <BlockHeader ficon="setting" title="EMAIL SETTINGS" />
                  <div className="setting-content">
                    <form className="main-form" noValidate>
                      <div className="setting-email">
                        <h3 className="block-title">Email settings</h3>
                        <div className="toggle-button-group">
                          <label className="tgl-label">Email me reminder notifications</label>
                          <ToggleButton name="email_me" value={this.state.email_me} onChange={this.onChange.bind(this)} className="pull-right" />
                        </div>
                        <div className="toggle-button-group">
                          <label className="tgl-label">Email me about popular books on Bookclubz</label>
                          <ToggleButton name="email_popular_books" value={this.state.email_popular_books} onChange={this.onChange.bind(this)} className="pull-right" />
                        </div>
                        <div className="toggle-button-group bd0">
                          <label className="tgl-label">Email me reminders to rate books</label>
                          <ToggleButton name="isRateBooks" value={this.state.isRateBooks} onChange={this.onChange.bind(this)} className="pull-right" />
                        </div>
                      </div>
                      <FormMessage type="success" error={this.state.notifications.success} />
                      <div className="group-form-button">
                        <button className="btn btn-default-corner btn-transparent btn-cancel" onClick={this.redirectLink.bind(this)}>Cancel</button>
                        <button className="btn btn-default-corner btn-transparent btn-update" onClick={this.onSubmit.bind(this)}>Update</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EmailSetting.propTypes = {
  isAuth: PropTypes.bool,
  currentUser: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  userActions: PropTypes.object.isRequired
};

export default EmailSetting;
