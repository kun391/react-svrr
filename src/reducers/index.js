import { combineReducers } from 'redux';
import * as API from 'api';
import auth from './authentication.js';
import { clubReducers, clubsByUserId, clubInfo, clubName, members, membersByClubId } from './clubs.js';
import { memberAlreadyReadBooks, memberWantToReadBooks, alreadyReadBooksByUserId, wantToReadBooksByUserId } from './members.js';
import { memberships, membershipsByClubId, membershipByUserId } from './memberships';
import { currentMeetings, pastMeetings, meetingsByClubId } from './meetings';
import { currentPolls, pollsByClubId } from './polls';
import { mergedMembers, clubAdmin } from './club-settings';
import { bookInspirations, bookInspirationsByClubId } from './inspirations';
import { clubAlreadyReadBooks, alreadyBooksByClubId } from './club-already-books';
import { messages, messagesByClubId } from './messages.js';

let rootReducer = combineReducers(
  {
    ...API.Books.reducers,
    ...API.Users.reducers,
    ...API.FAQs.reducers,
    ...API.Members.reducers,
    ...API.Clubs.reducers,
    auth,
    clubReducers,
    clubName,
    clubInfo,
    clubsByUserId,
    members,
    membersByClubId,
    memberAlreadyReadBooks,
    memberWantToReadBooks,
    alreadyReadBooksByUserId,
    wantToReadBooksByUserId,
    memberships,
    membershipsByClubId,
    membershipByUserId,
    mergedMembers,
    clubAdmin,
    currentMeetings,
    pastMeetings,
    meetingsByClubId,
    currentPolls,
    pollsByClubId,
    bookInspirations,
    bookInspirationsByClubId,
    clubAlreadyReadBooks,
    alreadyBooksByClubId,
    messages,
    messagesByClubId
  }

);
export { rootReducer };
