import * as types from 'constants/ActionTypes';

const initialState = {
  isFetching: false,
  fetched: false,
  count: 0,
  results: []
};

function clubReducers(state = initialState, action = {}) {
  switch (action.type) {
    case types.REQUEST_CLUBS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case types.RECEIVE_CLUBS:
      return Object.assign({}, state, {
        isFetching: false,
        fetched: true,
        count: action.count,
        results: action.clubs
      })
    default:
      return state
  }
}

function clubName(state = {}, action = {}) {
  switch (action.type) {
    case types.RECEIVE_CLUB_NAME:
      return Object.assign({}, state, {
        name: action.name
      })
    default:
      return state
  }
}

function clubInfo(state = {}, action = {}) {
  switch (action.type) {
    case types.RECEIVE_CLUB_INFO:
      let club = action.club;
      if (action.club && action.club.data) {
        club = action.club.data;
      }
      return Object.assign({}, state, club)
    case types.DELETE_CLUB_SUCCESS:
      window.location = `/profile/${action.currentUserId}`;
      return Object.assign({}, state, {})
    default:
      return state
  }
}

function clubsByUserId(state = {}, action) {
  switch (action.type) {
    case types.REQUEST_CLUBS:
      return Object.assign({}, state, {
        [action.userId]: clubReducers(state[action.userId], action)
      })
    default:
      return state
  }
}

function members(state = initialState, action = {}) {
  switch (action.type) {
    case types.REQUEST_MEMBERS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case types.RECEIVE_MEMBERS:
      
      let results = [];
      let count = 0;

      if (action.members && action.members.data && action.members.data.results) {
        results = action.members.data.results;
        count = action.members.data.count;
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

function membersByClubId(state = {}, action) {
  switch (action.type) {
    case types.REQUEST_MEMBERS:
      return Object.assign({}, state, {
        [action.clubId]: clubReducers(state[action.clubId], action)
      })
    default:
      return state
  }
}

export { clubReducers, clubName, clubInfo, clubsByUserId, members, membersByClubId };
