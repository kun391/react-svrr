import * as types from 'constants/ActionTypes';

const initialState = {
  isFetching: false,
  fetched: false,
  count: 0,
  results: []
};

function bookInspirations(state = initialState, action = {}) {
  switch (action.type) {
    case types.REQUEST_BOOK_INSPIRATION:
      return Object.assign({}, state, {
        isFetching: true
      })
    case types.RECEIVE_BOOK_INSPIRATION:
      let results = [];
      let count = 0;

      if (action.clubs && action.clubs.data && action.clubs.data.results) {
        results = action.clubs.data.results;
        count = action.clubs.data.count;
      }
      
      return Object.assign({}, state, {
        isFetching: false,
        fetched: true,
        count: count,
        results: results
      })
    default:
      return state
  }
}

function bookInspirationsByClubId(state = {}, action) {
  switch (action.type) {
    case types.REQUEST_BOOK_INSPIRATION:
      return Object.assign({}, state, {
        [action.clubId]: bookInspirations(state[action.clubId], action)
      })
    default:
      return state
  }
}

export { bookInspirations, bookInspirationsByClubId };
