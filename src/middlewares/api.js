import * as Actions from '../actions';
import axios from 'axios';
import { API_URL } from '../constants/config';
import { getActionTypes } from 'redux-axios-middleware';

export const apiClients = {
  default: {
    client: axios.create({
      baseURL: API_URL,
      responseType: 'json',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
};

export const apiMiddlewareConfig = {
  onSuccess: ({ action, next, response }, options) => {
    const nextAction = {
      type: getActionTypes(action, options)[1],
      payload: response,
      meta: {
        previousAction: action
      }
    };
    next(nextAction);
    return nextAction;
  },
  onError: ({ action, next, error, dispatch }, options) => {
    if (error.response && error.response.status === 401) {
      return dispatch(Actions.authLogout());
    }

    let errorObject;
    if (!error.response) {
      errorObject = {
        data: error.message,
        status: 0
      };
      if (process.env.NODE_ENV !== 'production') {
        console.log('HTTP Failure in Axios', error);
      }
    } else {
      errorObject = error;
    }
    const nextAction = {
      type: getActionTypes(action, options)[2],
      error: errorObject,
      meta: {
        previousAction: action
      }
    };

    next(nextAction);
    return nextAction;
  }
};
