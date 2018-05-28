import * as types from 'constants/ActionTypes';
import axios from 'axios';
import { API_URL } from 'constants/config';
import cookie from 'react-cookie';

let at = cookie.load('accessToken');

if (at) {
  axios.defaults.headers.common['Authorization'] = `Token ${at}`;
}

function requestBookInspirations(clubId) {
  return {
    type: types.REQUEST_BOOK_INSPIRATION,
    clubId
  }
}

function receiveBookInspirations(clubId, response) {
  return {
    type: types.RECEIVE_BOOK_INSPIRATION,
    clubId,
    clubs: response
  }
}

export function fetchBookInspirations(clubId, token) {
  const headers = token ? { Authorization: `Token ${token}` } : {};

  return dispatch => {
    dispatch(requestBookInspirations(clubId))
    return axios.get(`${API_URL}/clubs/${clubId}/want-to-read-books/`, {
      headers: headers
    }).then(response => dispatch(receiveBookInspirations(clubId, response)))
  }
}

function shouldFetchBookInspirations(state, clubId) {
  const books = state.bookInspirationsByClubId[clubId];
  if (!books) {
    return true
  } else if (books.isFetching) {
    return false
  }
}

export function fetchBookInspirationsIfNeeded(clubId, token) {
  return (dispatch, getState) => {
    if (shouldFetchBookInspirations(getState(), clubId)) {
      return dispatch(fetchBookInspirations(clubId, token))
    }
  }
}
