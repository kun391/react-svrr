import React from 'react';
import { ImageItem, BlockHeader } from 'partials';
import ClubInfo from 'modules/club/ClubInfo.jsx';
import PropTypes from 'prop-types';
import { SIDE_BAR, SPIN_CFG } from 'constants/config';
import 'react-select/dist/react-select.css';
import MeetingItem from './MeetingItem.jsx';
import ReactTooltip from 'react-tooltip';
import Spinner from 'react-tiny-spin';
import * as actions from 'actions/meetings';
import * as membershipActions from 'actions/memberships';

class Meeting extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    // This is call only at client
    const { dispatch, clubId, memberships, currentUser } = this.props;

    dispatch(actions.fetchMeetingsIfNeeded(clubId));
    dispatch(membershipActions.fetchMembershipsIfNeeded(clubId));
    dispatch(membershipActions.checkMembershipsByUserId(memberships, currentUser.id));
  }

  render() {
    let spinCfg = Object.assign({}, SPIN_CFG);
    spinCfg.lines = 12;
    spinCfg.length = 15;
    spinCfg.width = 4;
    spinCfg.radius = 15;

    const { currentUser, clubId, currentMeetings, fetchedCurrent, pastMeetings, fetchedPast, membershipByUserId } = this.props;

    let listCurrentMeetings = currentMeetings && currentMeetings.map(item => {
      let host = null
      if (item.host) {
        host = item.host.name ? item.host.name : item.host.email;
      }
      return (
        <MeetingItem
          key={item.id}
          currentUserId={currentUser.id}
          data={item}
          clubId={clubId}
          membership={membershipByUserId}
          host={host}
          onGetData={this.props.onGetData}
          dispatch={this.props.dispatch}
        />
      )
    });
    let listPastMeetings = pastMeetings && pastMeetings.map(item => {
      let host = null;
      if (item.host) {
        host = item.host.name ? item.host.name : item.host.email;
      }
      return (
        <MeetingItem
          key={item.id}
          currentUserId={currentUser.id}
          data={item}
          clubId={clubId}
          membership={membershipByUserId}
          host={host}
          type="past"
          dispatch={this.props.dispatch}
        />
      )
    });

    return (
      <div className="profile-container meeting-container">
        <div className="container-fluid">
          <div className="row">
            <div className="center">
              <div className="left-container">
                <ClubInfo clubId={clubId} active={SIDE_BAR.MEETINGS} currentUserId={currentUser.id} />
              </div>
              <div className="right-container">
                <div className="block-container">
                  { !fetchedCurrent && !fetchedPast && <Spinner config={spinCfg} /> }
                  {
                    currentMeetings || pastMeetings
                    ? <div className="book-list-container">
                        <div className="block-content block-my-clubs block-list-meeting">
                          <BlockHeader ficon="" title="UPCOMING MEETING(S)" number={currentMeetings.length} type="meeting" link={`/clubs/${clubId}/create-meeting`} addText="CREATE A NEW MEETING" />
                          {
                            fetchedCurrent
                            ? (
                                currentMeetings.length > 0
                                ? <div className="list-meeting">
                                    <ul className="list">
                                      { listCurrentMeetings }
                                    </ul>
                                  </div>
                                : <div className="block-content">
                                    <div className="no-meetings">
                                      <ImageItem image="no-meetings.svg" type="local" />
                                      <div className="description pt15">
                                        <p className="text">You don't have any upcoming meetings. <a href={`/clubs/${clubId}/create-meeting`} className="txt-link">Create a new meeting</a></p>
                                      </div>
                                    </div>
                                  </div>
                              )
                            : null
                          }
                        </div>
                        {
                          fetchedPast && pastMeetings.length > 0
                          ? <div className="block-content block-my-clubs block-list-meeting block-list-past-meeting">
                              <BlockHeader ficon="" title="PAST MEETING(S)" number={pastMeetings.length} type="meeting" />
                              <div className="list-meeting">
                                <ul className="list">
                                  { listPastMeetings }
                                </ul>
                              </div>
                            </div>
                          : null
                        }
                      </div>
                    : null
                  }
                  {
                    !currentMeetings && !pastMeetings
                    ? <div className="block-content">
                        <div className="no-meetings">
                          <ImageItem image="no-meetings.svg" type="local" />
                          <h3 className="title">Meetings</h3>
                          <div className="description">
                            <p>You don't have any upcoming meetings.</p>
                            <p>Create one now! Create a new meeting</p>
                          </div>
                          <div className="button">
                            <a href={`/clubs/${clubId}/create-meeting`} className="btn btn-default-corner bg-transparent btn-create-meeting">Create a meeting</a>
                          </div>
                          <div className="button-group">
                            <ul className="list">
                              <li className="item"><a href="#" className="btn btn-default-corner bg-transparent" data-tip data-for="global" ref="global">SEND A CALENDAR POLL</a></li>
                              <li className="item"><a href="#" className="btn btn-default-corner bg-transparent" data-tip data-for="global" ref="global">SEND A BOOK POLL</a></li>
                            </ul>
                            <ReactTooltip id="global" className="popup-create-meeting pb0" aria-haspopup="true" role="example" place="top" type="light" effect="solid">
                              <p className="description pb0">The feature is coming soon!</p>
                            </ReactTooltip>
                          </div>
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

Meeting.propTypes = {
  clubId: PropTypes.node,
  currentUser: PropTypes.object,
  currentMeetings: PropTypes.array,
  fetchedCurrent: PropTypes.bool,
  pastMeetings: PropTypes.array,
  fetchedPast: PropTypes.bool,
  dispatch: PropTypes.func
};

export default Meeting;
