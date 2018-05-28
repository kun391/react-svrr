import React from 'react';
import { ImageItem, BlockHeader } from 'partials';
import ClubInfo from 'modules/club/ClubInfo.jsx';
import PropTypes from 'prop-types';
import { TextField, FormMessage } from 'partials/forms';
import { SIDE_BAR, API_URL } from 'constants/config';
import axios from 'axios';
import MemberSettingItem from './MemberSettingItem.jsx';
import * as clubSettingActions from 'actions/club-settings';

class MemberSetting extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  handleRemoveUser(clubId, membershipId, user) {
    this.props.dispatch(clubSettingActions.handleRemoveMembership(clubId, membershipId, user, this.props.currentUser.id));
  }

  render() {
    let { currentUser, clubId, mergedMembers, isClubAdmin } = this.props;

    let listUser = this.props.mergedMembers.map((item, index) => {
      return (
        <MemberSettingItem
          key={item.id}
          dispatch={this.props.dispatch}
          index={index}
          clubId={clubId}
          user={item}
          currentUserId={currentUser.id}
          currentUserAdmin={isClubAdmin}
          onRemoveUser={this.handleRemoveUser.bind(this)}
        />
      );
    });

    return (
      <div className="profile-container member-setting-container">
        <div className="container-fluid">
          <div className="row">
            <div className="center">
              <div className="left-container">
                <ClubInfo clubId={clubId} active={SIDE_BAR.MEMBER_SETTINGS} />
              </div>
              <div className="right-container">
                <div className="block-container">
                  {
                    this.props.mergedMembers.length > 0
                    ? <div className="block-content block-my-clubs">
                        <BlockHeader ficon="" title="Member Settings" number={mergedMembers.length} type="member" link="" addText="" />
                        <div className="list-user-container">
                          { listUser }
                        </div>
                      </div>
                    : null
                  }
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

MemberSetting.propTypes = {
  currentUser: PropTypes.object,
  members: PropTypes.array,
  fetchedMembers: PropTypes.bool,
  memberships: PropTypes.array,
  fetchedMeetings: PropTypes.bool,
  mergedMembers: PropTypes.array,
  fetchedMergedMembers: PropTypes.bool
};

export default MemberSetting;
