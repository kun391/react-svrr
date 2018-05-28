import * as types from 'constants/ActionTypes';

export function auth(userInfo) {
  return {
    type: types.SET_CURRENT_USER,
    userInfo
  };
}

export function logout() {
  return {
    type: types.REMOVE_CURRENT_USER
  };
}

export function updateProfile(userInfo) {
  return {
    type: types.UPDATE_CURRENT_USER,
    userInfo
  };
}
