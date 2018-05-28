import * as types from 'constants/ActionTypes';
import axios from 'axios';
import { API_URL } from 'constants/config';
import cookie from 'react-cookie';

let at = cookie.load('accessToken');

if (at) {
  axios.defaults.headers.common['Authorization'] = `Token ${at}`;
}

export function mergeMembershipByUserId(memberships, members) {
  return {
    type: types.MERGE_MEMBERSHIP_BY_USERID,
    memberships,
    members
  }
}

export function checkClubAdmin(mergedMembers, currentUserId) {
  return {
    type: types.CHECK_CLUB_ADMIN,
    mergedMembers,
    currentUserId
  }
}

function removeMembership(user, currentUserId) {
  return {
    type: types.REMOVE_MEMBERSHIP,
    user,
    currentUserId
  }
}

function receiveMemberStatus(membershipId, response) {
  return {
    type: types.RECEIVE_MEMBER_STATUS,
    membershipId,
    membership: response.data
  }
}

export function handleRemoveMembership(clubId, membershipId, user, currentUserId) {
  return dispatch => {
    return axios({
      method: 'DELETE',
      url: `${API_URL}/clubs/${clubId}/memberships/${membershipId}/`,
    }).then(response => dispatch(removeMembership(user, currentUserId)))
  }
}

export function handleAdminRole(clubId, membershipId, method, data) {
  return dispatch => {
    return axios({
      method: method,
      url: `${API_URL}/clubs/${clubId}/memberships/${membershipId}/admin/`,
      data: data
    }).then(response => dispatch(receiveMemberStatus(membershipId, response)))
  }
}

export function handleActiveMember(clubId, membershipId, method, data) {
  return dispatch => {
    return axios({
      method: method,
      url: `${API_URL}/clubs/${clubId}/memberships/${membershipId}/active/`,
      data: data
    }).then(response => dispatch(receiveMemberStatus(membershipId, response)))
  }
}
