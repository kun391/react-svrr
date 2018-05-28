import * as types from 'constants/ActionTypes';

const initialState = {
  results: [],
  merged: false
};

const handleMembers = (memberships, members) => {
  let mergedMembers = [];

  if (memberships && members) {
    for (var i = 0; i < members.length; i++) {
      members[i].membership = memberships.filter(item => item.member === members[i].id)[0];
      mergedMembers.push(members[i]);
    }
  }

  return mergedMembers;
}

const checkClubAdmin = (mergedMembers, currentUserId) => {
  let member = mergedMembers.filter(item => item.id === currentUserId && item.membership.is_admin);

  return member.length > 0 ? true : false;
}

function mergedMembers(state = initialState, action = {}) {
  let members = [...state.results];
  switch (action.type) {
    case types.MERGE_MEMBERSHIP_BY_USERID:
      return Object.assign({}, state, {
        results: handleMembers(action.memberships, action.members),
        merged: true
      })
    case types.REMOVE_MEMBERSHIP:
      members.splice(members.indexOf(action.user), 1);
      if (action.user.id === action.currentUserId) {
        window.location = `/profile/${action.currentUserId}`;
      }
      return Object.assign({}, state, {
        results: members,
        merged: true
      })
    case types.RECEIVE_MEMBER_STATUS:
      let item = members.filter(item => item.membership.id === action.membershipId);
      let index = members.indexOf(item[0]);
      members[index].membership = action.membership;
      return Object.assign({}, state, {
        results: members,
        merged: true
      })
    default:
      return state
  }
}

function clubAdmin(state = { isClubAdmin: false }, action = {}) {
  switch (action.type) {
    case types.CHECK_CLUB_ADMIN:
      return Object.assign({}, state, {
        isClubAdmin: checkClubAdmin(action.mergedMembers, action.currentUserId)
      })
    default:
      return state
  }
}

export { mergedMembers, clubAdmin };
