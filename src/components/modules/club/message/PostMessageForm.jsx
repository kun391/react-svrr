import React from 'react';
import PropTypes from 'prop-types';
import { TextField, FormMessage } from 'partials/forms';
import axios from 'axios';
import { API_URL } from 'constants/config';
import Spinner from 'react-tiny-spin';

class PostMessageForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      clubId: this.props.clubId,
      message: '',
      notifications: {},
      messagePosting: false,
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
      this.setState({messagePosting: true})
      axios({
        url: `${API_URL}/clubs/${this.state.clubId}/messages/`,
        method: 'POST',
        data: params
      }).then(response => {
        if (response && response.data) {
          this.props.onGetMessages();

          this.setState({
            messagePosting: false,
            message: ''
          });
        }
      }).catch(error => {
        let notifications = [];
        notifications.error = 'Cannot post your message.';
        this.setState({
          messagePosting: false,
          notifications
        });
      });
    }
  }

  componentDidMount() {
    // This is call only at client
  }

  render() {
    const spinCfg = {
      lines: 12, // The number of lines to draw
      length: 5, // The length of each line
      width: 2, // The line thickness
      radius: 5, // The radius of the inner circle
      scale: 1, // Scales overall size of the spinner
      corners: 1, // Corner roundness (0..1)
      color: '#fff', // #rgb or #rrggbb or array of colors
      opacity: 0.25, // Opacity of the lines
      rotate: 0, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      speed: 1, // Rounds per second
      trail: 60, // Afterglow percentage
      fps: 20, // Frames per second when using setTimeout() as a fallback in IE 9
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      className: 'spinner', // The CSS class to assign to the spinner
      top: '50%', // Top position relative to parent
      left: '50%', // Left position relative to parent
      shadow: false, // Whether to render a shadow
      position: 'relative' // Element positioning
    };
    return (
      <div className="form-message">
        <FormMessage type="success" error={this.state.notifications.success} />
        <form role="form" className="main-form" onSubmit={this.onSubmit.bind(this)} noValidate>
          <div className="form-group">
            <textarea name="message" value={this.state.message} onChange={this.onChange.bind(this)} placeholder="Write a new message" className="form-control"></textarea>
            <FormMessage type="error" error={this.state.notifications.message} />
          </div>
          <div className="form-group button-group pr0">
            <button type="submit" className="btn btn-default-corner btn-create-new-message" disabled={this.state.messagePosting}>
              { this.state.messagePosting
              ? <Spinner config={spinCfg} />
              : 'POST'
              }
            </button>
          </div>
        </form>
        <div className="clearfix" />
      </div>
    );
  }
}

PostMessageForm.propTypes = {
  clubId: PropTypes.node,
  onGetMessages: PropTypes.func
};

export default PostMessageForm;
