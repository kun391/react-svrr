import React from 'react';
import ReactDOM from 'react-dom';

import {Provider} from 'react-redux';
import {Router, browserHistory} from 'react-router';
import routes, {store} from './routes/index.jsx';


ReactDOM.render((
  <Provider store={store}>
    <Router children={routes} history={browserHistory} />
  </Provider>
), document.getElementById('root'));
