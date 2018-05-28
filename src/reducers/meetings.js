import * as types from 'constants/ActionTypes';
import moment from 'moment';

const initialState = {
  isFetching: false,
  fetched: false,
  count: 0,
  results: []
};

const handleMeetings = (meetings, type) => {
  let now = moment().format('YYYY-MM-DD HH:mm');
  let list = [];

  for (var i = 0; i < meetings.length; i++) {
    let date = moment(meetings[i].meeting_moment, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DD HH:mm');
    if (type === 'current' && date >= now) {
      list.unshift(meetings[i]);
    }
    if (type === 'past' && date < now) {
      list.push(meetings[i]);
    }
  }
  return list;
}

function currentMeetings(state = initialState, action = {}) {
  let meetings = state.results;
  switch (action.type) {
    case types.REQUEST_MEETINGS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case types.RECEIVE_MEETINGS:
      let results = [];

      if (action.meetings && action.meetings.data && action.meetings.data.results) {
        results = action.meetings.data.results;
      }
      return Object.assign({}, state, {
        isFetching: false,
        fetched: true,
        results: handleMeetings(results, 'current')
      })
    case types.RSVP_SUCCESS:
      let index = meetings.findIndex(item => item.id === action.response.meeting)
      meetings[index].RSVPs.map(item => {
        if (item.id === action.response.id) {
          item.response = action.response.response
        }
      })

      return Object.assign({}, state, {
        isFetching: false,
        fetched: true,
        results: handleMeetings(meetings, 'current')
      })
    default:
      return state
  }
}

function pastMeetings(state = initialState, action = {}) {
  switch (action.type) {
    case types.REQUEST_MEETINGS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case types.RECEIVE_MEETINGS:
      let results = [];

      if (action.meetings && action.meetings.data && action.meetings.data.results) {
        results = action.meetings.data.results;
      }
      return Object.assign({}, state, {
        isFetching: false,
        fetched: true,
        count: action.count,
        results: handleMeetings(results, 'past')
      })
    default:
      return state
  }
}

function meetingsByClubId(state = {}, action) {
  switch (action.type) {
    case types.REQUEST_MEETINGS:
      return Object.assign({}, state, {
        [action.clubId]: currentMeetings(state[action.clubId], action)
      })
    default:
      return state
  }
}

export { currentMeetings, pastMeetings, meetingsByClubId };
