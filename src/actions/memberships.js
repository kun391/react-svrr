import * as types from 'constants/ActionTypes';
import axios from 'axios';
import { API_URL } from 'constants/config';
import cookie from 'react-cookie';

let at = cookie.load('accessToken');

if (at) {
  axios.defaults.headers.common['Authorization'] = `Token ${at}`;
}

function requestMemberships(clubId) {
  return {
    type: types.REQUEST_MEMBERSHIPS,
    clubId
  }
}

function receiveMemberships(clubId, response) {
  return {
    type: types.RECEIVE_MEMBERSHIPS,
    clubId,
    memberships: response
  }
}

export function checkMembershipsByUserId(memberships, userId) {
  return {
    type: types.CHECK_MEMBERSHIPS_BY_USERID,
    userId,
    memberships
  }
}

export function fetchMemberships(clubId, token) {
  const headers = token ? { Authorization: `Token ${token}` } : {};

  return dispatch => {
    dispatch(requestMemberships(clubId))
    return axios.get(`${API_URL}/clubs/${clubId}/memberships/`, {
      headers: headers
    }).then(response => dispatch(receiveMemberships(clubId, response)))
  }
}

function shouldFetchMemberships(state, clubId) {
  const memberships = state.membershipsByClubId[clubId];
  if (!memberships) {
    return true
  }
}

export function fetchMembershipsIfNeeded(clubId, token) {
  return (dispatch, getState) => {
    if (shouldFetchMemberships(getState(), clubId)) {
      return dispatch(fetchMemberships(clubId, token))
    }
  }
}
