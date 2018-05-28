import React from 'react';
import PropTypes from 'prop-types'
import { RenderRoutes } from '../routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

const Root = ({ store, routes, history }) => (
  <Provider store={store}>
    <IntlProvider locale="en-GB">
      <Router history={history}>
        <RenderRoutes routes={routes} />
      </Router>
    </IntlProvider>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired
}

export default Root;
