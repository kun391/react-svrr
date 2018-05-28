import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import Autolinker from 'autolinker';

class MessageUserInfo extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="info">
        <p className="username">{ this.props.userName }</p>
        <span className="date-time">{ moment(new Date(this.props.dateTime)).format('lll') }</span>
        <p className="message-text" dangerouslySetInnerHTML={{__html: Autolinker.link(this.props.message, { stripPrefix: { scheme: false }}).replace(`\n`, `<br />`)}} />
      </div>
    );
  }
}

MessageUserInfo.propTypes = {
  currentUserId: PropTypes.node,
  username: PropTypes.string,
  dateTime: PropTypes.string,
  message: PropTypes.string
};

export default MessageUserInfo;
