import * as types from 'constants/ActionTypes'
import axios from 'axios'
import { API_URL } from 'constants/config'
import cookie from 'react-cookie'

let at = cookie.load('accessToken')

if (at) {
  axios.defaults.headers.common['Authorization'] = `Token ${at}`
}

function requestPolls (clubId) {
  return {
    type: types.POLLS_REQUEST,
    clubId
  }
}

function receivePolls (clubId, response) {
  return {
    type: types.POLLS_RECEIVE,
    clubId,
    polls: response
  }
}

export function fetchPolls (clubId, token) {
  const headers = token ? { Authorization: `Token ${token}` } : {}

  return dispatch => {
    dispatch(requestPolls(clubId))
    return axios.get(`${API_URL}/clubs/${clubId}/polls/`, {
      headers: headers
    }).then(response => dispatch(receivePolls(clubId, response)))
  }
}

function shouldFetchPolls (state, clubId) {
  const polls = state.pollsByClubId[clubId]
  if (!polls) {
    return true
  }
}

export function fetchPollsIfNeeded (clubId, token) {
  return (dispatch, getState) => {
    if (shouldFetchPolls(getState(), clubId)) {
      return dispatch(fetchPolls(clubId, token))
    }
  }
}

export function createPoll (pollData) {
  return dispatch => {
    dispatch(initiateCreatePoll())
    return axios.post(`${API_URL}/clubs/${pollData.club}/polls/`, pollData)
      .then(response => {
        return dispatch(createPollSuccess(response, pollData))
      })
      .catch(error => {
        console.log(error)
        dispatch(createPollError(error))
      })
      .then(() => { window.location = `/clubs/${pollData.club}/polls` })
  }
}

function initiateCreatePoll () {
  return {
    type: types.POLLS_CREATE
  }
}

function createPollSuccess (response) {
  return {
    type: types.POLLS_CREATE_SUCCESS,
    response: response.data
  }
}

function createPollError (error) {
  return {
    type: types.POLLS_CREATE_ERROR,
    error: error
  }
}

export function editPoll (pollId, pollData) {
  return dispatch => {
    dispatch(editPollRequest())
    return axios.put(
      `${API_URL}/clubs/${pollData.club}/polls/${pollId}/`, pollData
    )
    .then(
      response => dispatch(editPollSuccess(response)),
      error => dispatch(editPollError(error))
    )
    .then(() => {
      window.location = `/clubs/${pollData.club}/polls`
    })
  }
}

function editPollRequest () {
  return {
    type: types.POLLS_UPDATE
  }
}

function editPollSuccess (response) {
  return {
    type: types.POLLS_UPDATE_SUCCESS,
    response: response.data
  }
}

function editPollError (error) {
  console.log(error)
  return {
    type: types.POLLS_UPDATE_ERROR,
    error: error
  }
}

export function deletePoll (pollData) {
  return dispatch => {
    return axios.delete(`${API_URL}/clubs/${pollData.club}/polls/${pollData.id}/`)
    .then(
      response => {
        if (response.status === 204) {
          dispatch(deletePollSuccess(pollData.id))
        }
      },
      error => dispatch(deletePollError(error))
    )
    .then(() => {
      window.location = `/clubs/${pollData.club}/polls`
    })
  }
}

function deletePollSuccess (pollId) {
  return {
    type: types.POLLS_DELETE_SUCCESS,
    pollId: pollId
  }
}

function deletePollError (error) {
  console.log(error)
  return {
    type: types.POLLS_DELETE_ERROR,
    error: error
  }
}

export function voteBook (currentUser, bookId, voteValue, clubId, pollId) {
  return dispatch => {
    dispatch(voteBookRequest(pollId, bookId))
    const url = `${API_URL}/clubs/${clubId}/polls/${pollId}/book/`
    const data = {'id': bookId}
    const method = voteValue ? 'put' : 'delete'

    return axios({
      method: method,
      url: url,
      data: data
    }).then(response => {
      return dispatch(voteBookSuccess(currentUser, pollId, bookId, voteValue))
    })
    .catch(error => {
      console.log(error)
      return dispatch(voteBookError(pollId, bookId, error))
    })
  }
}

function voteBookRequest (pollId, bookId) {
  return {
    type: types.POLLS_VOTE_BOOK,
    pollId: pollId,
    bookId: bookId
  }
}

function voteBookSuccess (currentUser, pollId, bookId, voteValue) {
  return {
    type: types.POLLS_VOTE_BOOK_SUCCESS,
    currentUser: currentUser,
    pollId: pollId,
    bookId: bookId,
    voteValue: voteValue
  }
}

function voteBookError (pollId, bookId, error) {
  return {
    type: types.POLLS_VOTE_BOOK_ERROR,
    error: error,
    pollId: pollId,
    bookId: bookId
  }
}

export function voteDateTime (currentUser, dateTimeId, voteValue, clubId, pollId) {
  return dispatch => {
    dispatch(voteDateTimeRequest(pollId, dateTimeId))
    const url = `${API_URL}/clubs/${clubId}/polls/${pollId}/date-time/`
    const data = {'id': dateTimeId}
    const method = voteValue ? 'put' : 'delete'

    return axios({
      method: method,
      url: url,
      data: data
    }).then(response => {
      return dispatch(voteDateTimeSuccess(currentUser, pollId, dateTimeId, voteValue))
    })
    .catch(error => {
      console.log(error)
      return dispatch(voteDateTimeError(pollId, dateTimeId, error))
    })
  }
}

function voteDateTimeRequest (pollId, dateTimeId) {
  return {
    type: types.POLLS_VOTE_DATE_TIME,
    pollId: pollId,
    dateTimeId: dateTimeId
  }
}

function voteDateTimeSuccess (currentUser, pollId, dateTimeId, voteValue) {
  return {
    type: types.POLLS_VOTE_DATE_TIME_SUCCESS,
    currentUser: currentUser,
    pollId: pollId,
    dateTimeId: dateTimeId,
    voteValue: voteValue
  }
}

function voteDateTimeError (pollId, dateTimeId, error) {
  return {
    type: types.POLLS_VOTE_DATE_TIME_ERROR,
    error: error,
    pollId: pollId,
    dateTimeId: dateTimeId
  }
}
