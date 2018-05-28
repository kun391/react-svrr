import React from 'react';
import PropTypes from 'prop-types';
import { RenderRoutes } from '../routes';
import 'flexboxgrid/dist/flexboxgrid.css';
import 'normalize.css/normalize.css';
import '@blueprintjs/core/dist/blueprint.css';
import './pages/assets/app.css';

const App = ({route}) => (
  <RenderRoutes routes={route.routes}/>
);

App.propTypes = {
  route: PropTypes.object.isRequired
};

export default App;
