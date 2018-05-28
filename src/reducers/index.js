import { combineReducers } from 'redux';
import auth from './authentication.js';

let rootReducer = combineReducers(
  {
    auth
  }

);
export { rootReducer };
