import { apiClients, apiMiddlewareConfig } from '../middlewares/api';
import { createStore, applyMiddleware, compose } from 'redux';
import { createLogger } from 'redux-logger';
import { multiClientMiddleware } from 'redux-axios-middleware';
import thunk from 'redux-thunk';
import { rootReducer } from 'reducers';
import DevTools from '../containers/DevTools';

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    compose(
      applyMiddleware(
        thunk,
        multiClientMiddleware(apiClients, apiMiddlewareConfig),
        createLogger(),
      ),
      DevTools.instrument()
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    })
  }

  return store;
}

export default configureStore;

