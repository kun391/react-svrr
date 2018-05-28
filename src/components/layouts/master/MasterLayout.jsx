import React from 'react';
import Header from '../partials/Header.jsx';
import Footer from '../partials/Footer.jsx';
import PropTypes from 'prop-types';
import cookie from 'react-cookie';
import axios from 'axios';

class MasterLayout extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, {}));
    return (
      <div className={`wrapper-container ${this.props.classOver}`}>
        <Header classHeader={this.props.classHeader} currentUser={this.props.currentUser} />
        <main className="main-container">
          {childrenWithProps}
        </main>
        <Footer/>
      </div>
    );
  }
}

MasterLayout.propTypes = {
  classHeader: PropTypes.string,
  classOver: PropTypes.string
};

export default MasterLayout;
