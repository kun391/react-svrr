import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import { UploadAvatar, SidebarMenu, InvitationLink } from 'partials';
import { SIDE_BAR, API_URL } from 'constants/config';
import ReactTooltip from 'react-tooltip';
import { findDOMNode } from 'react-dom';
import * as actions from 'actions/clubs';

class ClubInfo extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      clubId: this.props.clubId,
      clubInfo: {}
    };

    this.sidebar = [
      {
        title: 'MEETINGS',
        link: `/clubs/${this.state.clubId}/meetings`,
        activeClass: this.props.active === SIDE_BAR.MEETINGS ? 'active' : ''
      },
      {
        title: 'MESSAGES',
        link: `/clubs/${this.state.clubId}/messages`,
        activeClass: this.props.active === SIDE_BAR.MESSAGES ? 'active' : ''
      },
      {
        title: 'BOOK INSPIRATION',
        link: `/clubs/${this.state.clubId}/book-inspiration`,
        activeClass: this.props.active === SIDE_BAR.INSPIRATION ? 'active' : ''
      },
      {
        title: 'BOOKS WE\'VE READ',
        link: `/clubs/${this.state.clubId}/already-read-books`,
        activeClass: this.props.active === SIDE_BAR.ALREADY_READ ? 'active' : ''
      },
      {
        title: 'POLLS (BETA)',
        link: `/clubs/${this.state.clubId}/polls`,
        activeClass: this.props.active === SIDE_BAR.POLLS ? 'active' : ''
      },
      {
        title: 'MEMBER SETTINGS',
        link: `/clubs/${this.state.clubId}/settings`,
        activeClass: this.props.active === SIDE_BAR.MEMBER_SETTINGS ? 'active' : ''
      }
    ];
  }

  getClubInfo() {
    this.props.dispatch(actions.fetchClubInfo(this.props.clubId));
  }

  removeClub() {
    this.props.dispatch(actions.deleteClub(this.props.club.id, this.props.currentUserId))
  }

  closePopup() {
    ReactTooltip.hide(findDOMNode(this.refs.deleteClub));
  }

  componentDidMount() {
    // This is call only at client
    this.getClubInfo();
  }

  render() {
    const { club } = this.props;
    return (
      <div className="profile-content club-content">
        <UploadAvatar info={club} url={`/clubs/${club.id}`} onGetClubInfo={this.getClubInfo.bind(this)} />
        <SidebarMenu sidebar={this.sidebar} />
        {
          club && club.get_join_url
          ? <InvitationLink invitationLink={club.get_join_url} />
          : null
        }
        <a href="javascript:void(0);" className="edit-profile-link" data-tip data-for="deleteClub" data-event="click" ref="deleteClub">Delete this club</a>
        <ReactTooltip id="deleteClub" className="popup-create-meeting popup-delete-club" aria-haspopup="true" role="deleteClub" place="top" type="light" effect="solid">
          {
            club.number_members <= 1
            ? <div className="content">
                <p className="description">Are you sure you want to delete this club?</p>
                <div className="group-button">
                  <button type="button" className="btn btn-default-corner btn-cancel" onClick={this.closePopup.bind(this)}>Cancel</button>
                  <button type="submit" className="btn btn-default-corner btn-delete-club" data-tip data-for="deleteClub" data-event="click" onClick={this.removeClub.bind(this)}>Delete Club</button>
                </div>
              </div>
            : <p className="description-2">To delete a club that has more than one member, email us at clubs@bookclubz.com</p>
          }
        </ReactTooltip>
      </div>
    );
  }
}

ClubInfo.propTypes = {
  clubId: PropTypes.node,
  currentUserId: PropTypes.node
};

const bindStateToProps = state => {
  return {
    club: state.clubInfo
  }
}

const bindDispatchToProps = dispatch => ({
  dispatch
});

export default connect(bindStateToProps)(ClubInfo);
