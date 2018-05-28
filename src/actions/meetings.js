import * as types from 'constants/ActionTypes';
import axios from 'axios';
import { API_URL } from 'constants/config';
import cookie from 'react-cookie';

let at = cookie.load('accessToken');

if (at) {
  axios.defaults.headers.common['Authorization'] = `Token ${at}`;
}

function requestMeetings(clubId) {
  return {
    type: types.REQUEST_MEETINGS,
    clubId
  }
}

function receiveMeetings(clubId, response) {
  return {
    type: types.RECEIVE_MEETINGS,
    clubId,
    meetings: response
  }
}

export function fetchMeetings(clubId, token) {
  const headers = token ? { Authorization: `Token ${token}` } : {};

  return dispatch => {
    dispatch(requestMeetings(clubId))
    return axios.get(`${API_URL}/clubs/${clubId}/meetings/`, {
      headers: headers
    }).then(response => dispatch(receiveMeetings(clubId, response)))
  }
}

function shouldFetchMeetings(state, clubId) {
  const meetings = state.meetingsByClubId[clubId];
  if (!meetings) {
    return true
  }
}

export function fetchMeetingsIfNeeded(clubId, token) {
  return (dispatch, getState) => {
    if (shouldFetchMeetings(getState(), clubId)) {
      return dispatch(fetchMeetings(clubId, token))
    }
  }
}

export function voteBook(bookId, rating, clubId, token) {
  return dispatch => {
    return axios.put(`${API_URL}/books/${bookId}/votes/`, {
      rating: rating
    }).then(response => {
      dispatch(fetchMeetings(clubId))
      alert('Successful')
    })
  }
}

function rsvpSuccess(response) {
  return {
    type: types.RSVP_SUCCESS,
    response: response.data
  }
}

export function rsvp(rsvp, memberId, clubId, meetingId, token) {
  return dispatch => {
    return axios.put(`${API_URL}/clubs/${clubId}/meetings/${meetingId}/rsvp/`, {
      response: rsvp,
      member: memberId
    }).then(response => {
      dispatch(rsvpSuccess(response))
      alert('Successful')
    })
  }
}
