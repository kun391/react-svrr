import { apiClients, apiMiddlewareConfig } from '../middlewares/api';
import { createStore, applyMiddleware } from 'redux';
import { multiClientMiddleware } from 'redux-axios-middleware';
import thunk from 'redux-thunk'
import { rootReducer } from 'reducers'

const configureStore = preloadedState => createStore(
  rootReducer,
  preloadedState,
  applyMiddleware(thunk, multiClientMiddleware(apiClients, apiMiddlewareConfig))
)

export default configureStore;
