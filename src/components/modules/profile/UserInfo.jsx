import React from 'react';
import PropTypes from 'prop-types';

class UserInfo extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    // This is call only at client
  }

  render() {
    return (
      <div className="user-info">
        <ul className="list">
          <li className="item">
            <h5 className="title">ADDRESS</h5>
            <p className="text">{this.props.currentUser.address}</p>
          </li>
          <li className="item">
            <h5 className="title">PHONE</h5>
            <p className="text">{this.props.currentUser.phone}</p>
          </li>
          <li className="item">
            <h5 className="title">EMAIL</h5>
            <p className="text">{this.props.currentUser.email}</p>
          </li>
        </ul>
      </div>
    );
  }
}

UserInfo.propTypes = {
  currentUser: PropTypes.object
};

export default UserInfo;
