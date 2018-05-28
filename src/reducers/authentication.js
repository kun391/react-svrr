import isEmpty from 'lodash/isEmpty';
import reactCookie from 'react-cookie';
import * as types from 'constants/ActionTypes';

const initialState = {
  userInfo: reactCookie.load('userInfo') ? reactCookie.load('userInfo') : {},
  isAuth: !isEmpty(reactCookie.load('userInfo'))
};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_CURRENT_USER:
      return Object.assign({}, state, {
        isAuth: !isEmpty(action.userInfo),
        userInfo: action.userInfo
      })
    case types.REMOVE_CURRENT_USER:
      return Object.assign({}, state, {
        isAuth: false,
        userInfo: {}
      })
    case types.UPDATE_CURRENT_USER:
      return Object.assign({}, state, {
        isAuth: !isEmpty(action.userInfo),
        userInfo: action.userInfo
      })
    default:
      return state;
  }
}
