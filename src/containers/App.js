import React from 'react';
import PropTypes from 'prop-types';
import { HandleRoute } from '../routes';
import { asyncConnect } from 'redux-connect';
import renderRoutes from 'react-router-config/renderRoutes'

@asyncConnect([{
  key: 'article',
  promise: () => {
    console.log('ok');
  }
}])

class App extends React.Component {
  render() {
    const { article, route } = this.props;
    return (
        <div>
            {renderRoutes(route.routes)}
       </div>
    )
  }
}

App.propTypes = {
  route: PropTypes.object.isRequired
};

export default App;
