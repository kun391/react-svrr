import React from 'react';
import PropTypes from 'prop-types';
import { HandleRoute } from '../routes';

const App = ({route}) => (
  <HandleRoute routes={route.routes}/>
);

App.propTypes = {
  route: PropTypes.object.isRequired
};

export default App;
