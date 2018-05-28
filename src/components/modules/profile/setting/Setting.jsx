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

class Setting extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      currentUser: this.props.currentUser,
      name: this.props.currentUser && this.props.currentUser.name || '',
      address: this.props.currentUser && this.props.currentUser.address || '',
      phone: this.props.currentUser && this.props.currentUser.phone || '',
      email: this.props.currentUser && this.props.currentUser.email || '',
      clubs: [],
      memberships: [],
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

  getClubs() {
    let id = 7;
    // let id = this.state.currentUser && this.state.currentUser.id;

    if (id) {
      axios({
        url: `${API_URL}/clubs/`,
        method: 'GET'
      }).then(response => {
        if (response && response.data) {
          this.setState({
            clubs: response.data.results
          })
        }
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    let notifications = {};
    let params = {
      name: this.state.name,
      address: this.state.address,
      phone: this.state.phone,
      email: this.state.email
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

        cdata.name = response.data.name;
        cdata.address = response.data.address;
        cdata.phone = response.data.phone;
        cdata.email = response.data.email;

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
    this.getClubs();
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
                  <BlockHeader ficon="setting" title="PROFILE SETTINGS" />
                  <div className="setting-content">
                    <form className="main-form" noValidate>
                      <div className="setting-profile">
                        <h3 className="block-title">Edit profile</h3>
                        <TextField type="text" name="name" value={this.state.name} placeholder="Name" onChange={this.onChange.bind(this)} />
                        <TextField type="text" name="address" value={this.state.address} placeholder="Address" onChange={this.onChange.bind(this)} />
                        <TextField type="text" name="phone" value={this.state.phone} placeholder="Phone" onChange={this.onChange.bind(this)} />
                        <TextField type="email" name="email" value={this.state.email} placeholder="Email" onChange={this.onChange.bind(this)} readOnly={true} />
                        <div className="toggle-button-group bd0">
                          <label className="tgl-label pb20">Share with my club members</label>
                          {
                            this.state.clubs.map(item => {
                              return (
                                <ShareInfo key={item.id} currentUserId={this.props.currentUser.id} clubId={item.id} name={item.name} />
                              )
                            })
                          }
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

Setting.propTypes = {
  isAuth: PropTypes.bool,
  currentUser: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  userActions: PropTypes.object.isRequired
};

export default Setting;
