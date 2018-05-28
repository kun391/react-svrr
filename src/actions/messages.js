import * as types from 'constants/ActionTypes';
import axios from 'axios';
import { API_URL } from 'constants/config';
import cookie from 'react-cookie';

let at = cookie.load('accessToken');

if (at) {
  axios.defaults.headers.common['Authorization'] = `Token ${at}`;
}

function requestMessages(clubId) {
  return {
    type: types.REQUEST_MESSAGES,
    clubId
  }
}

function receiveMessages(clubId, response) {
  return {
    type: types.RECEIVE_MESSAGES,
    clubId,
    messages: response
  }
}

export function fetchMessages(clubId, token) {
  const headers = token ? { Authorization: `Token ${token}` } : {};

  return dispatch => {
    dispatch(requestMessages(clubId))
    return axios.get(`${API_URL}/clubs/${clubId}/messages/`, {
      headers: headers
    }).then(response => dispatch(receiveMessages(clubId, response)))
  }
}

function shouldFetchMessages(state, clubId) {
  const messages = state.messagesByClubId[clubId];
  if (!messages) {
    return true
  }
}

export function fetchMessagesIfNeeded(clubId, token) {
  return (dispatch, getState) => {
    if (shouldFetchMessages(getState(), clubId)) {
      return dispatch(fetchMessages(clubId, token))
    }
  }
}
