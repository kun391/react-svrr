import React from 'react';
import PropTypes from 'prop-types'
import DevTools from './DevTools';
import { HandleRoute } from '../routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';

const Root = ({ store, routes, history }) => hydrate((
  <Provider store={store}>
    <IntlProvider locale="en-GB">
      <Router history={history}>
        <div>
          <HandleRoute routes={routes} />
          <DevTools />
        </div>
      </Router>
    </IntlProvider>
  </Provider>
), el);

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired
}

export default Root;
