import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import configureStore from './store';
import { createBrowserHistory } from 'history';
import { routes } from './routes';
import { syncHistoryWithStore } from 'react-router-redux';

const store = configureStore();
const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.hydrate(
  <Root store={store} routes={routes} history={history}/>
, document.getElementById('root'));
