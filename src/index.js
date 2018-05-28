import React from 'react';
import ReactDOM from 'react-dom';
import Root from './containers/Root';
import {Router, browserHistory} from 'react-router';
import configureStore from './store';
import { createBrowserHistory } from 'history';
import { routes } from './routes';
import { syncHistoryWithStore } from 'react-router-redux';

const store = configureStore();
const browserHistory = createBrowserHistory();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Root store={store} routes={routes} history={history}/>
, document.getElementById('root'));
