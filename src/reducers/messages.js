import * as types from 'constants/ActionTypes';

const initialState = {
  isFetching: false,
  fetched: false,
  results: []
};

function messages(state = initialState, action = {}) {
  switch (action.type) {
    case types.REQUEST_MESSAGES:
      return Object.assign({}, state, {
        isFetching: true
      })
    case types.RECEIVE_MESSAGES:
      let results = [];

      if (action.messages && action.messages.data && action.messages.data.results) {
        results = action.messages.data.results;
      }
      return Object.assign({}, state, {
        isFetching: false,
        fetched: true,
        results: results
      })
    default:
      return state
  }
}

function messagesByClubId(state = {}, action) {
  switch (action.type) {
    case types.REQUEST_MESSAGES:
      return Object.assign({}, state, {
        [action.clubId]: messages(state[action.clubId], action)
      })
    default:
      return state
  }
}

export { messages, messagesByClubId };
