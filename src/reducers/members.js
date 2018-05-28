import * as types from 'constants/ActionTypes';

const initialState = {
  isFetching: false,
  fetched: false,
  count: 0,
  results: []
};

function memberAlreadyReadBooks(state = initialState, action = {}) {
  switch (action.type) {
    case types.REQUEST_MEMBER_ALREADY_READ_BOOKS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case types.RECEIVE_MEMBER_ALREADY_READ_BOOKS:
      return Object.assign({}, state, {
        isFetching: false,
        fetched: true,
        count: action.count,
        results: action.books
      })
    default:
      return state
  }
}

function memberWantToReadBooks(state = initialState, action = {}) {
  switch (action.type) {
    case types.REQUEST_MEMBER_WANT_TO_READ_BOOKS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case types.RECEIVE_MEMBER_WANT_TO_READ_BOOKS:
      return Object.assign({}, state, {
        isFetching: false,
        fetched: true,
        count: action.count,
        results: action.books
      })
    default:
      return state
  }
}

function alreadyReadBooksByUserId(state = {}, action) {
  switch (action.type) {
    case types.REQUEST_MEMBER_ALREADY_READ_BOOKS:
      return Object.assign({}, state, {
        [action.userId]: memberAlreadyReadBooks(state[action.userId], action)
      })
    default:
      return state
  }
}

function wantToReadBooksByUserId(state = {}, action) {
  switch (action.type) {
    case types.REQUEST_MEMBER_WANT_TO_READ_BOOKS:
      return Object.assign({}, state, {
        [action.userId]: memberWantToReadBooks(state[action.userId], action)
      })
    default:
      return state
  }
}

export { memberAlreadyReadBooks, memberWantToReadBooks, alreadyReadBooksByUserId, wantToReadBooksByUserId };
