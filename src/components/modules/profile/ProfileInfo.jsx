import React from 'react';
import PropTypes from 'prop-types';
import { UploadAvatar, SidebarMenu } from 'partials';
import UserInfo from './UserInfo.jsx';
import { SIDE_BAR } from 'constants/config';
import { Link } from 'react-router';

class ProfileInfo extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      currentUser: this.props.currentUser
    }

    this.sidebar = [
      {
        title: 'OVERVIEW',
        link: `/profile/${this.state.currentUser.id}`,
        activeClass: this.props.active === SIDE_BAR.OVERVIEW ? 'active' : ''
      },
      {
        title: 'BOOKS I\'VE READ',
        link: `/profile/${this.state.currentUser.id}/already-read-books`,
        number: 0,
        activeClass: this.props.active === SIDE_BAR.ALREADY_READ ? 'active' : ''
      },
      {
        title: 'BOOKS I WANT TO READ',
        link: `/profile/${this.state.currentUser.id}/want-to-read-books`,
        number: 0,
        activeClass: this.props.active === SIDE_BAR.WANT_TO_READ ? 'active' : ''
      }
    ];
  }

  componentDidMount() {
    // This is call only at client
  }

  render() {
    return (
      <div className="profile-content">
        <UploadAvatar info={this.props.currentUser} type="profile" url={`/auth/me`} />
        <SidebarMenu sidebar={this.sidebar} />
        {
          this.props.currentUser
          ? <UserInfo currentUser={this.props.currentUser} />
          : null
        }
        <p><Link to={`/profile/${this.state.currentUser && this.state.currentUser.id}/settings`} className="edit-profile-link">Edit Profile</Link></p>
        <p><Link to={`/profile/${this.state.currentUser && this.state.currentUser.id}/email-settings`} className="edit-profile-link">Email Settings</Link></p>
      </div>
    );
  }
}

ProfileInfo.propTypes = {
  currentUser: PropTypes.object,
  active: PropTypes.number
};

export default ProfileInfo;
