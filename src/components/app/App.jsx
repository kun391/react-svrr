import 'core-js/es6/map';
import 'core-js/es6/set';
import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div className="wrapper">
        {this.props.children}
      </div>
    );
  }
}
export default App;