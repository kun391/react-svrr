import * as types from 'constants/ActionTypes';
import axios from 'axios';
import { API_URL } from 'constants/config';
import cookie from 'react-cookie';

let at = cookie.load('accessToken');

if (at) {
  axios.defaults.headers.common['Authorization'] = `Token ${at}`;
}

axios.interceptors.request.use((request) => {
  return request
}, function (error) {
  if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    if (error.request.status === 403) {
      window.location = `/signin?redirect=${window.location.href}`;
    }
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error(error)
    console.log('Error', error.message)
  }
  return Promise.reject(error);
})

axios.interceptors.response.use((response) => {
  return response;
}, function (error) {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // console.log(error.response.data);
    // console.log(error.response.status);
    // console.log(error.response.headers);
    if (error.response.status === 403 && error.response.config.method !== 'POST') {
      window.location = `/signin?redirect=${window.location.href}`;
    }
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error(error)
    console.log('Error', error.message)
  }
  return Promise.reject(error);
})

function requestClubs(userId) {
  return {
    type: types.REQUEST_CLUBS,
    userId
  }
}

function receiveClubs(userId, response) {
  return {
    type: types.RECEIVE_CLUBS,
    userId,
    count: response.data.count,
    clubs: response.data.results
  }
}

function receiveClubName(clubId, response) {
  return {
    type: types.RECEIVE_CLUB_NAME,
    clubId,
    name: response.data
  }
}

function receiveClubInfo(clubId, response) {
  return {
    type: types.RECEIVE_CLUB_INFO,
    clubId,
    club: response
  }
}

function deleteClubSuccess(currentUserId) {
  return {
    type: types.DELETE_CLUB_SUCCESS,
    currentUserId
  }
}

export function fetchClubs(userId, token) {
  const headers = token ? { Authorization: `Token ${token}` } : {};

  return dispatch => {
    dispatch(requestClubs(userId))
    return axios.get(`${API_URL}/clubs/`, {
      headers: headers
    }).then(response => dispatch(receiveClubs(userId, response)))
  }
}

export function fetchClubName(clubId, code, token) {
  const headers = token ? { Authorization: `Token ${token}` } : {};

  return dispatch => {
    return axios.get(`${API_URL}/clubs/${clubId}/join/${code}/`, {
      headers: headers
    }).then(response => dispatch(receiveClubName(clubId, response)))
  }
}

export function fetchClubInfo(clubId) {
  return dispatch => {
    return axios.get(`${API_URL}/clubs/${clubId}/`)
      .then(response => dispatch(receiveClubInfo(clubId, response)))
  }
}

export function deleteClub(clubId, currentUserId) {
  return dispatch => {
    return axios.delete(`${API_URL}/clubs/${clubId}/`)
      .then(response => dispatch(deleteClubSuccess(currentUserId)))
  }
}

function shouldFetchClubs(state, userId) {
  const clubs = state.clubsByUserId[userId];
  if (!clubs) {
    return true
  } else if (clubs.isFetching) {
    return false
  }
}


export function fetchClubsIfNeeded(userId, token) {
  return (dispatch, getState) => {
    if (shouldFetchClubs(getState(), userId)) {
      return dispatch(fetchClubs(userId, token))
    }
  }
}

function requestMembers(clubId) {
  return {
    type: types.REQUEST_MEMBERS,
    clubId
  }
}

function receiveMembers(clubId, response) {
  return {
    type: types.RECEIVE_MEMBERS,
    clubId,
    members: response
  }
}

export function fetchMembers(clubId, token) {
  const headers = token ? { Authorization: `Token ${token}` } : {};

  return dispatch => {
    dispatch(requestMembers(clubId))
    return axios.get(`${API_URL}/clubs/${clubId}/members/`, {
      headers: headers
    }).then(response => dispatch(receiveMembers(clubId, response)))
  }
}

function shouldFetchMembers(state, clubId) {
  const members = state.membersByClubId[clubId];
  if (!members) {
    return true
  }
}

export function fetchMembersIfNeeded(clubId, token) {
  return (dispatch, getState) => {
    if (shouldFetchMembers(getState(), clubId)) {
      return dispatch(fetchMembers(clubId, token))
    }
  }
}

// Club - Books we've read
function requestAlreadyBooks(clubId) {
  return {
    type: types.REQUEST_ALREADY_READ_BOOKS,
    clubId
  }
}

function receiveAlreadyBooks(clubId, response) {
  return {
    type: types.RECEIVE_ALREADY_READ_BOOKS,
    clubId,
    count: response.data.count,
    books: response.data.results
  }
}

export function fetchAlreadyBooks(clubId, token) {
  const headers = token ? { Authorization: `Token ${token}` } : {};

  return dispatch => {
    dispatch(requestClubs(clubId))
    return axios.get(`${API_URL}/clubs/${clubId}/already-read-books/`, {
      headers: headers
    }).then(response => dispatch(receiveAlreadyBooks(clubId, response)))
  }
}

function shouldFetchAlreadyBooks(state, clubId) {
  const books = state.alreadyBooksByClubId[clubId];
  if (!books) {
    return true
  }
}

export function fetchAlreadyBooksIfNeeded(clubId, token) {
  return (dispatch, getState) => {
    if (shouldFetchAlreadyBooks(getState(), clubId)) {
      return dispatch(fetchAlreadyBooks(clubId, token))
    }
  }
}

function deleteAlreadyReadBookFailure(bookId, response) {
  return {
    type: types.DELETE_ALREADY_READ_BOOK_FAILURE,
    bookId,
    error: "Error deleting this book. Please try again later."
  }
}

function deleteAlreadyReadBookSuccess(bookId, response) {
  return {
    type: types.DELETE_ALREADY_READ_BOOK_SUCCESS,
    bookId
  }
}

function deletingAlreadyReadBook(bookId) {
  return {
    type: types.DELETE_ALREADY_READ_BOOK,
    bookId
  }
}

export function deleteAlreadyReadBook(clubId, bookId, token) {
  const headers = token ? { Authorization: `Token ${token}` } : {};

  return dispatch => {
    dispatch(deletingAlreadyReadBook(bookId))
    return axios.delete(
      `${API_URL}/clubs/${clubId}/already-read-books/${bookId}/`,
      { headers: headers }
    )
    .then(response => dispatch(deleteAlreadyReadBookSuccess(bookId)))
    .catch(error => dispatch(deleteAlreadyReadBookFailure(bookId)))
  }
}
