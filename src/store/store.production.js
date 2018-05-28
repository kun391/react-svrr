import { apiClients, apiMiddlewareConfig } from '../middlewares/api';
import { createStore, applyMiddleware } from 'redux';
import { reducer as reduxAsyncConnect } from 'redux-connect';
import { multiClientMiddleware } from 'redux-axios-middleware';
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  reduxAsyncConnect,
  applyMiddleware(thunk, multiClientMiddleware(apiClients, apiMiddlewareConfig)),
  window.__REDUX__
)

export default configureStore;
