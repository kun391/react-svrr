// TODO: Remove these alerts.
/* global alert */
import * as types from 'constants/ActionTypes'

const initialState = {
  creatingPoll: false,
  updatingPoll: false,
  isFetching: false,
  fetched: false,
  count: 0,
  results: {},
  votingOnBook: null,
  votingOnDateTime: null
}

const handlePolls = (polls) => {
  let normalizedPolls = {}
  for (var i = 0; i < polls.length; i++) {
    normalizedPolls[polls[i].id] = polls[i]
  }
  return normalizedPolls
}

function currentPolls (state = initialState, action = {}) {
  let polls = state.results
  let bookOption, dateTimeOption
  switch (action.type) {
    case types.POLLS_REQUEST:
      return Object.assign({}, state, {
        isFetching: true
      })
    case types.POLLS_RECEIVE:
      let results = [];

      if (action.polls && action.polls.data && action.polls.data.results) {
        results = action.polls.data.results;
      }
      return Object.assign({}, state, {
        isFetching: false,
        fetched: true,
        results: handlePolls(results, 'current')
      })
    case types.POLLS_CREATE:
      return Object.assign({}, state, {
        creatingPoll: true
      })
    case types.POLLS_CREATE_SUCCESS:
      return Object.assign({}, state, {
        creatingPoll: false,
        results: {...polls, [action.response.id]: action.response}
      })
    case types.POLLS_CREATE_ERROR:
      return Object.assign({}, state, {
        creatingPoll: false,
        creatingPollError: action.error
      })
    case types.POLLS_UPDATE:
      return Object.assign({}, state, {
        updatingPoll: true
      })
    case types.POLLS_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        updatingPoll: false,
        results: {...polls, [action.response.id]: action.response}
      })
    case types.POLLS_UPDATE_ERROR:
      return Object.assign({}, state, {
        updatingPoll: false,
        updatingPollError: action.error
      })
    case types.POLLS_DELETE:
      return Object.assign({}, state, {
        deletingPoll: true
      })
    case types.POLLS_DELETE_SUCCESS:
      delete polls[action.pollId]
      return Object.assign({}, state, {
        deletingPoll: false,
        results: polls
      })
    case types.POLLS_DELETE_ERROR:
      return Object.assign({}, state, {
        deletingPoll: false,
        deletingPollError: action.error
      })
    case types.POLLS_VOTE_DATE_TIME:
      dateTimeOption = polls[action.pollId].date_time_options.find(dateTimeOption => {
        return dateTimeOption.id === action.dateTimeId
      })
      const votingOnDateTime = dateTimeOption ? dateTimeOption.id : null
      return Object.assign({}, state, {votingOnDateTime: votingOnDateTime})
    case types.POLLS_VOTE_DATE_TIME_SUCCESS:
      dateTimeOption = polls[action.pollId].date_time_options.find(dateTimeOption => {
        return dateTimeOption.id === action.dateTimeId
      })
      let dateTimeVotes = [...state.results[action.pollId].date_time_votes.map(vote => {
        if (action.currentUser.id === vote.member.id && dateTimeOption.id === vote.option) {
          vote.response = action.voteValue
        }
        return vote
      })]
      const currentDateTimeOptionVotes = dateTimeVotes.filter(vote => {
        return vote.option === dateTimeOption.id && action.currentUser.id === vote.member.id
      })
      if (currentDateTimeOptionVotes.length === 0) {
        dateTimeVotes.push({
          member: action.currentUser,
          option: dateTimeOption.id,
          response: action.voteValue
        })
      }
      return {
        ...state,
        votingOnDateTime: null,
        results: {
          ...state.results,
          [action.pollId]: {
            ...state.results[action.pollId],
            date_time_votes: dateTimeVotes
          }
        }
      }
    case types.POLLS_VOTE_DATE_TIME_ERROR:
      alert('An error occurred and your vote was not submitted. Please try again later.')
      return Object.assign({}, state, {votingOnDateTime: null})

    case types.POLLS_VOTE_BOOK:
      bookOption = polls[action.pollId].book_options.find(bookOption => {
        return bookOption.book.id === action.bookId
      })
      const votingOnBook = bookOption ? bookOption.id : null
      return Object.assign({}, state, {votingOnBook: votingOnBook})
    case types.POLLS_VOTE_BOOK_SUCCESS:
      bookOption = polls[action.pollId].book_options.find(bookOption => {
        return bookOption.book.id === action.bookId
      })
      let bookVotes = [...state.results[action.pollId].book_votes.map(vote => {
        if (action.currentUser.id === vote.member.id && bookOption.id === vote.option) {
          vote.response = action.voteValue
        }
        return vote
      })]
      const currentBookOptionVotes = bookVotes.filter(vote => {
        return vote.option === bookOption.id && action.currentUser.id === vote.member.id
      })
      if (currentBookOptionVotes.length === 0) {
        bookVotes.push({
          member: action.currentUser,
          option: bookOption.id,
          response: action.voteValue
        })
      }
      return {
        ...state,
        votingOnBook: null,
        results: {
          ...state.results,
          [action.pollId]: {
            ...state.results[action.pollId],
            book_votes: bookVotes
          }
        }
      }
    case types.POLLS_VOTE_BOOK_ERROR:
      alert('An error occurred and your vote was not submitted. Please try again later.')
      return Object.assign({}, state, {votingOnBook: null})
    default:
      return state
  }
}

function pollsByClubId (state = {}, action) {
  switch (action.type) {
    case types.POLLS_REQUEST:
      return Object.assign({}, state, {
        [action.clubId]: currentPolls(state[action.clubId], action)
      })
    default:
      return state
  }
}

export { currentPolls, pollsByClubId }
