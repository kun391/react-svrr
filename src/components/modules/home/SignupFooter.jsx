import React from 'react';
import PropTypes from 'prop-types';

class SignupFooter extends React.Component {
  render() {
    return (
      <div className="block-container block-signup-club">
        <div className="center">
          <h4 className="block-title">Sign your club up for free</h4>
          {
            this.props.isAuth
            ? <a href="/create-club" className="btn btn-default-corner bg-transparent btn-signup-now">Create a club</a>
            : <a href="/signup" className="btn btn-default-corner bg-transparent btn-signup-now">Sign up now</a>
          }
        </div>
      </div>
    );
  }
}

SignupFooter.propTypes = {
  isAuth: PropTypes.bool
}

export default SignupFooter;