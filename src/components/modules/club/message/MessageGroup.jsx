import React from 'react';
import PropTypes from 'prop-types';
import { TextArea } from 'partials/forms';
import MessageItem from './MessageItem.jsx';
import { API_URL, SPIN_CFG } from 'constants/config';
import axios from 'axios';
import moment from 'moment';
import Spinner from 'react-tiny-spin';

class MessageGroup extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      message: this.props.messages || {},
      messageText: '',
      replyEntire: false,
      more: false,
      messagePosting: false,
      notifications: []
    };
  }

  onChange(e) {
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    if (!!this.state.notifications[e.target.name]) {
      let notifications = Object.assign({}, this.state.notifications);
      delete notifications[e.target.name];
      delete notifications['error'];
      this.setState({
        [e.target.name]: value,
        notifications
      });
    } else {
      this.setState({
        [e.target.name]: value,
      });
    }
  }

  validate() {
    let notifications = {};
    let messageText = this.state.messageText;

    if (!messageText) {
      notifications.messageText = 'Please enter your message';
    }

    if (Object.getOwnPropertyNames(notifications).length !== 0 && notifications.constructor === Object) {
      this.setState({ notifications });
      return false;
    }

    return true;
  }

  onSubmit(e) {
    e.preventDefault();

    let params = {
      content: this.state.messageText,
      parent: this.props.messages.id,
      email_everyone: this.state.replyEntire,
    };

    if (this.validate()) {
      this.setState({messagePosting: true});
      axios({
        url: `${API_URL}/clubs/${this.props.clubId}/messages/`,
        method: 'POST',
        data: params
      }).then(response => {
        if (response && response.data) {
          this.setState({
            messageText: '',
            messagePosting: false
          });

          this.props.onGetMessages();
        }
      }).catch(error => {
        let notifications = [];
        notifications.error = 'Cannot post your message.';
        this.setState({
          notifications,
          messagePosting: false
        });
      });
    }
  }

  viewMoreMessages() {
    this.setState({
      more: !this.state.more
    });
    // $('.list-group-message').scrollTop($('.list-group-message').prop("scrollHeight"));
  }

  componentDidMount() {
    // This is call only at client
  }

  render() {
    let spinCfg = Object.assign({}, SPIN_CFG);
    spinCfg.position = 'relative';
    spinCfg.color = '#fff';
    spinCfg.lines = 9;
    spinCfg.length = 5;
    spinCfg.width = 2;
    spinCfg.radius = 5;

    let listReply;

    if (this.props.messages && this.props.messages.replies && this.props.messages.replies.length > 0) {
      listReply = this.props.messages.replies.sort((a, b) => { return a.created > b.created }).map((item, index) => {
        if (!this.state.more && index >= this.props.messages.replies.length - 2) {
          return (
            <MessageItem key={ item.id } userId={ item.member.id } userName={ item.member.name } created={ item.created } avatar={ item.member.avatar } messageText={ item.content } />
          );
        }
        if (this.state.more) {
          return (
            <MessageItem key={ item.id } userId={ item.member.id } userName={ item.member.name } created={ item.created } avatar={ item.member.avatar } messageText={ item.content } />
          );
        }
      });
    }

    return (
      <div className="message-group">
        <p className="title-date-time">{ moment(new Date(this.props.messages.created)).format('LLLL') }</p>
        <ul className={`list-group-message main-message pb15`}>
          <MessageItem userId={ this.props.messages.member.id } userName={ this.props.messages.member.name } created={ this.props.messages.created } avatar={ this.props.messages.member.avatar } messageText={ this.props.messages.content } />
          {
            this.props.messages.replies && this.props.messages.replies.length > 2
            ? <li className="item">
                <button className="btn-view-more" onClick={this.viewMoreMessages.bind(this, this.props.messages.replies[0].parent)}>{this.state.more ? 'View less' : 'View more messages'}</button>
              </li>
            : null
          }
        </ul>
        {
          this.props.messages.replies && this.props.messages.replies.length
          ? <ul className={`list-group-message list-group-message-${this.props.messages.replies[0].parent}`}>
              { listReply }
            </ul>
          : null
        }
        <div className="input-reply-message">
          <form role="form" className="main-form" onSubmit={this.onSubmit.bind(this)} noValidate>
            <span className="ficon-smiling" />
            <div className="reply-form row">
              <TextArea className='col-xs-10 col-md-11' name="messageText" value={ this.state.messageText } error={ this.state.notifications.messageText } maxLength="255" placeholder="Reply..." onChange={this.onChange.bind(this)} />
              <button className="btn btn-transparent btn-post-reply col-xs-1 col-xs-offset-1 col-md-offset-0" disabled={this.state.messagePosting}>
                {
                  !this.state.messagePosting
                  ? 'Reply'
                  : <Spinner config={spinCfg} />
                }
              </button>
            </div>
          </form>
        </div>
        <div className="input-reply-message">
          <div className="checkbox-cus">
            <input type="checkbox" value={this.state.replyEntire} name="replyEntire" id={`replyEntire${this.props.messages.id}`} onChange={this.onChange.bind(this)} />
            <label className="input-label" htmlFor={`replyEntire${this.props.messages.id}`}>Reply to my entire club</label>
          </div>
        </div>
      </div>
    );
  }
}

MessageGroup.propTypes = {
  clubId: PropTypes.node,
  messages: PropTypes.object
};

export default MessageGroup;
