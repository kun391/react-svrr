import * as types from 'constants/ActionTypes';

const initialState = {
  isFetching: false,
  fetched: false,
  count: 0,
  results: []
};

function memberships(state = initialState, action = {}) {
  switch (action.type) {
    case types.REQUEST_MEMBERSHIPS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case types.RECEIVE_MEMBERSHIPS:
      let results = [];

      if (action.memberships && action.memberships.data && action.memberships.data.results) {
        results = action.memberships.data.results;
      }
      return Object.assign({}, state, {
        isFetching: false,
        fetched: true,
        count: action.count,
        results: results
      })
    default:
      return state
  }
}

function membershipsByClubId(state = {}, action) {
  switch (action.type) {
    case types.REQUEST_MEMBERSHIPS:
      return Object.assign({}, state, {
        [action.clubId]: memberships(state[action.clubId], action)
      })
    default:
      return state
  }
}

const checkMembership = (memberships, userId) => {
  let membership = {};
  for (var i = 0; i < memberships.length; i++) {
    if (parseInt(memberships[i].member, 10) === parseInt(userId, 10)) {
      membership = memberships[i];
      break;
    }
  }

  return membership;
}

function membershipByUserId(state = {}, action) {
  switch (action.type) {
    case types.CHECK_MEMBERSHIPS_BY_USERID:
      return Object.assign({}, state, checkMembership(action.memberships, action.userId))
    default:
      return state
  }
}

export { memberships, membershipsByClubId, membershipByUserId };
