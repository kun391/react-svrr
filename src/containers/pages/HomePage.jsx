import React from 'react';
import { MasterLayout } from 'layouts';
import { connect } from 'react-redux';
import Home from 'modules/home';
import Promise from 'bluebird';
import PropTypes from 'prop-types';
import { asyncConnect } from 'redux-connect'

@asyncConnect([{
  key: 'lunch',
  promise: ({ match: { params }, helpers }) => Promise.resolve({ id: 1, name: 'Borsch' })
}])

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="bg-homepage-fix">
        <MasterLayout classHeader="bg-transparent">
          <Home isAuth={this.props.isAuth} />
        </MasterLayout>
      </div>
    );
  }
}

HomePage.propTypes = {
  isAuth: PropTypes.bool
};

const bindStateToProps = state => {
  return {
    isAuth: state.auth ? state.auth.isAuth : false
  }
}

export default connect(bindStateToProps)(HomePage);
