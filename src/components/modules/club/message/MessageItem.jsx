import React from 'react';
import { ImageItem } from 'partials';
import PropTypes from 'prop-types';
import MessageUserInfo from './MessageUserInfo.jsx';
import defaultAvatar from 'assets/images/avatar.jpg';

class MessageItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      message: '',
      notifications: []
    };
  }

  onChange(e) {
    if (!!this.state.notifications[e.target.name]) {
      let notifications = Object.assign({}, this.state.notifications);
      delete notifications[e.target.name];
      delete notifications['error'];
      this.setState({
        [e.target.name]: e.target.value,
        notifications
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value,
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
  }

  componentDidMount() {
    // This is call only at client
  }

  render() {
    return (
      <li className="message-item">
        <div className="avatar" style={{backgroundImage: `url(${this.props.avatar || defaultAvatar})`}}>
          <ImageItem image={this.props.avatar || 'avatar.jpg'} type={!this.props.avatar ? 'local' : ''} className="image" />
        </div>
        <MessageUserInfo userId={this.props.userId} userName={this.props.userName} dateTime={this.props.created} message={this.props.messageText} />
        <div className="clearfix" />
      </li>
    );
  }
}

MessageItem.propTypes = {
  userId: PropTypes.node,
  userName: PropTypes.string,
  created: PropTypes.string,
  avatar: PropTypes.string,
  messageText: PropTypes.string
};

export default MessageItem;
