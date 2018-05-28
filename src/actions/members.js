import * as types from 'constants/ActionTypes';
import axios from 'axios';
import { API_URL, BOOK_TYPES } from 'constants/config';
import cookie from 'react-cookie';

let at = cookie.load('accessToken');

if (at) {
  axios.defaults.headers.common['Authorization'] = `Token ${at}`;
}

function requestMemberAlreadyReadBooks(userId) {
  return {
    type: types.REQUEST_MEMBER_ALREADY_READ_BOOKS,
    userId
  }
}

function receiveMemberAlreadyReadBooks(userId, response) {
  return {
    type: types.RECEIVE_MEMBER_ALREADY_READ_BOOKS,
    userId,
    count: response.data.count,
    books: response.data.results
  }
}

function requestMemberWantToReadBooks(userId) {
  return {
    type: types.REQUEST_MEMBER_WANT_TO_READ_BOOKS,
    userId
  }
}

function receiveMemberWantToReadBooks(userId, response) {
  return {
    type: types.RECEIVE_MEMBER_WANT_TO_READ_BOOKS,
    userId,
    count: response.data.count,
    books: response.data.results
  }
}

export function fetchBooks(userId, type, token) {
  const headers = token ? { Authorization: `Token ${token}` } : {};

  return dispatch => {
    if (type === BOOK_TYPES.ALREADY_READ) {
      dispatch(requestMemberAlreadyReadBooks(userId))
    }
    if (type === BOOK_TYPES.WANT_TO_READ) {
      dispatch(requestMemberWantToReadBooks(userId))
    }

    return axios(`${API_URL}/members/${userId}/${type}/`, {
      headers: headers
    }).then(response => {
      if (type === BOOK_TYPES.ALREADY_READ) {
        dispatch(receiveMemberAlreadyReadBooks(userId, response))
      }
      if (type === BOOK_TYPES.WANT_TO_READ) {
        dispatch(receiveMemberWantToReadBooks(userId, response))
      }
    })
  }
}

function shouldFetchMemberAlreadyReadBooks(state, userId) {
  const books = state.alreadyReadBooksByUserId[userId];
  if (!books) {
    return true
  } else if (books.isFetching) {
    return false
  }
}

function shouldFetchMemberWantToReadBooks(state, userId) {
  const books = state.wantToReadBooksByUserId[userId];
  if (!books) {
    return true
  } else if (books.isFetching) {
    return false
  }
}

export function fetchBooksIfNeeded(userId, type, token) {
  return (dispatch, getState) => {
    if (type === BOOK_TYPES.ALREADY_READ) {
      if (shouldFetchMemberAlreadyReadBooks(getState(), userId)) {
        return dispatch(fetchBooks(userId, type, token))
      }
    }
    if (type === BOOK_TYPES.WANT_TO_READ) {
      if (shouldFetchMemberWantToReadBooks(getState(), userId)) {
        return dispatch(fetchBooks(userId, type, token))
      }
    }
  }
}
