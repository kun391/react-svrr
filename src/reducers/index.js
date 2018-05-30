import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import auth from './authentication.js';
import { reducer as reduxAsyncConnect } from 'redux-connect'

let rootReducer = combineReducers({
  auth, routing, reduxAsyncConnect
});

export { rootReducer };
