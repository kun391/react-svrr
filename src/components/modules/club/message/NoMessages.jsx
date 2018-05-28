import React from 'react';
import { ImageItem } from 'partials';
import PropTypes from 'prop-types';
import { FormMessage } from 'partials/forms';
import axios from 'axios';
import { API_URL } from 'constants/config';

class NoMessages extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      clubId: this.props.clubId,
      message: '',
      notifications: {}
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

  validate() {
    let notifications = {};
    let message = this.state.message;

    if (!message) {
      notifications.message = 'Please enter your message';
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
      content: this.state.message,
      email_everyone: true,
    };

    if (this.validate()) {
      axios({
        url: `${API_URL}/clubs/${this.state.clubId}/messages/`,
        method: 'POST',
        data: params
      }).then(response => {
        if (response && response.data) {
          this.props.onGetMessages();

          this.setState({
            message: ''
          });
        }
      }).catch(error => {
        let notifications = [];
        notifications.error = 'Cannot post your message.';
        this.setState({
          notifications
        });
      });
    }
  }

  render() {
    return (
      <div className="block-content">
        <div className="no-messages">
          <ImageItem image="img-no-message.svg" type="local" />
          <h3 className="title">Messages</h3>
          <div className="description">
            <p>You don't have any messages.</p>
            <p>Create one now!</p>
          </div>
          <div className="main-form input-message">
            <textarea placeholder="Send a message to club members..." name="message" className="form-control" value={this.state.message} onChange={this.onChange.bind(this)}></textarea>
            <FormMessage type="error" error={this.state.notifications.message} />
          </div>
          <div className="button">
            <button className="btn btn-default-corner bg-transparent btn-create-meeting" onClick={this.onSubmit.bind(this)}>POST</button>
          </div>
        </div>
      </div>
    );
  }
}

NoMessages.propTypes = {
  clubId: PropTypes.node,
  onGetMessages: PropTypes.func
};

export default NoMessages;
