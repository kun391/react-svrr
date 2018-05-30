import React from 'react';
import PropTypes from 'prop-types'
import DevTools from './DevTools';
import { HandleRoute } from '../routes';
import { ReduxAsyncConnect } from 'redux-connect';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

const Root = ({ store, routes, history }) => {
  return (
    <Provider store={store}>
      <IntlProvider locale="en-GB">
        <Router store={store} history={history}>
            <div>
              <ReduxAsyncConnect routes={routes} />
              <DevTools />
            </div>
        </Router>
      </IntlProvider>
    </Provider>
  )
};

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired
}

export default Root;
