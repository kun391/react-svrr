import React from 'react';
import PropTypes from 'prop-types';
import { ImageItem } from 'partials';
import axios from 'axios';
import cookie from 'react-cookie';
import { API_URL, SPIN_CFG } from 'constants/config';
import Spinner from 'react-tiny-spin';
import defaultAvatar from 'assets/images/avatar.jpg';
import { Link } from 'react-router';

class UploadAvatar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      avatar: null,
      avatarFile: null,
      loading: false
    };
  }

  handleChangeAvatar(e) {
    let reader = new FileReader();
    let file = e.target.files[0];
    if (file) {
      reader.onloadend = () => {
        this.setState({
          avatarFile: file
        }, () => {
          this.handleUploadAvatar(this.state.avatarFile);
        });
      };
      reader.readAsDataURL(file);
    }
  }

  handleUploadAvatar(avatarFile) {
    let formData = new FormData();
    formData.append('avatar', avatarFile);

    this.setState({
      loading: true
    });

    axios({
      url: `${API_URL}${this.props.url}/`,
      method: 'PATCH',
      data: formData
    }).then(response => {
      if (response && response.data) {
        this.setState({
          avatar: response.data.avatar
        }, () => {
          if (this.props.type === 'profile') {
            let userInfo = cookie.load('userInfo');
            userInfo.avatar = response.data.avatar;
            cookie.save('userInfo', userInfo, { path: '/' });
          }
        });
        if (typeof this.props.onGetClubInfo === 'function') {
          this.props.onGetClubInfo();
        }
        this.setState({
          loading: false
        });
      }
    }).catch(() => {
      this.setState({
        loading: false
      });
    });
  }

  componentDidMount() {
    if (this.props.type === 'profile') {
      let userInfo = cookie.load('userInfo');
      if (userInfo && userInfo.avatar) {
        this.setState({
          avatar: userInfo.avatar
        });
      }
    }
  }

  render() {
    let spinCfg = SPIN_CFG;
    spinCfg.lines = 9;
    spinCfg.length = 6;
    spinCfg.width = 3;
    spinCfg.radius = 7;

    return (
      <div className="avatar-content">
        <div className="upload-avatar">
          <div className="wrap-avatar" style={{backgroundImage: `url(${this.state.avatar ? this.state.avatar : (this.props.info && this.props.info.avatar ? this.props.info.avatar : defaultAvatar)})`}}>
            {
              this.state.loading
              ? <div className="wrap-spinner"><Spinner config={spinCfg} /></div>
              : null
            }
            {
              this.state.avatar
              ? <ImageItem image={this.state.avatar} className="image" title="" description="" type="" />
              : <ImageItem image={this.props.info && this.props.info.avatar ? this.props.info.avatar : 'avatar.jpg'} className="image" title="" description="" type={!this.props.info || !this.props.info.avatar ? 'local' : ''} />
            }
          </div>
          <div className="btn-upload-avatar">
            <input type="file" className="form-control" onChange={this.handleChangeAvatar.bind(this)} mutilselect="false" />
            <span className="ficon ficon-camera"></span>
          </div>
        </div>
        {
          this.props.type === 'profile'
          ? <p className="user-name">{this.props.info && this.props.info.name || this.props.info && this.props.info.email || ''}</p>
          : <div className="club-info">
              <p className="text-gray">Club</p>
              <p className="user-name">{this.props.info.name}</p>
              <p className="member"><span className="ficon-people"></span> {this.props.info.number_members} members</p>
            </div>
        }
        {
          this.props.type === 'profile'
          ? <div>
              <p><Link to={`/profile/${this.props.info && this.props.info.id}/settings`} className="edit-profile-link">Edit Profile</Link></p>
              <p><Link to={`/profile/${this.props.info && this.props.info.id}/email-settings`} className="edit-profile-link">Email Settings</Link></p>
            </div>
          : null
        }
        <div className="clearfix"></div>
      </div>
    );
  }
}

UploadAvatar.propTypes = {
  info: PropTypes.object,
  onGetClubInfo: PropTypes.func
};

export default UploadAvatar;
