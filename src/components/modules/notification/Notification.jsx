import React from 'react';
import { ImageItem } from 'partials';
import { FormMessage } from 'partials/forms';
import axios from 'axios';
import { API_URL } from 'constants/config';
import PropTypes from 'prop-types';

class Notification extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      notifications: {}
    }
  }

  handleSubscribe(method) {
    axios({
      url: `${API_URL}/members/${this.props.memberId}/unsubscribe/${this.props.type}/`,
      method: method,
      data: {
        email_hash: this.props.emailHash
      }
    }).then(response => {
      let notifications = {};

      notifications.success = response.data.status;
      this.setState({
        notifications
      });
    }).catch(error => {
      let notifications = {};

      notifications.error = 'Authentication credentials were not provided.';
      this.setState({
        notifications
      });

    })
  }

  handleRsvp() {
    axios({
      url: `${API_URL}/clubs/${this.props.clubId}/meetings/${this.props.meetingId}/rsvp/`,
      method: 'PUT',
      data: {
        response: this.props.value,
        member: this.props.memberId,
        email_hash: this.props.emailHash
      }
    }).then(response => {
      let notifications = {};
      let responseText;
      if (this.props.value === 'true') {
        responseText = 'Yes';
      } else if (this.props.value === 'false') {
        responseText = 'No';
      } else if (this.props.value === 'null') {
        responseText = 'no response yet';
      }

      notifications.success = response.data.status || `Your RSVP of ${responseText} has been successfully submitted.`;
      this.setState({
        notifications
      });
    }).catch(error => {
      let notifications = {};

      notifications.error = 'Authentication credentials were not provided.';
      this.setState({
        notifications
      });

    })
  }

  handleVote() {
    axios({
      url: `${API_URL}/books/${this.props.bookId}/votes/`,
      method: 'PUT',
      data: {
        rating: this.props.rating,
        email_hash: this.props.emailHash
      }
    }).then(response => {
      let notifications = {};

      notifications.success = response.data.status || 'You have voted a book successfully.';
      this.setState({
        notifications
      });
    }).catch(error => {
      let notifications = {};

      notifications.error = 'Authentication credentials were not provided.';
      this.setState({
        notifications
      });

    })
  }

  componentDidMount() {
    if (this.props.path === 'unsubscribe') {
      this.handleSubscribe('DELETE');
    }
    if (this.props.path === 're-subscribe') {
      this.handleSubscribe('PUT');
    }
    if (this.props.path === 'clubs') {
      this.handleRsvp();
    }
    if (this.props.path === 'books') {
      this.handleVote();
    }
  }

  render() {
    return (
      <div className="invitation-form text-center">
        <ImageItem image="image-invitation.png" className="image" alt="invitation" type="local" />
        <h3 className="title">Bookclubz</h3>
        <FormMessage type="success" error={this.state.notifications.success} />
        <FormMessage type="error" error={this.state.notifications.error} />
        {
          !this.props.currentUserId
          ? <div className="bottom">
              <a href="/signin" className="btn btn-default-corner bg-transparent btn-signin">SIGN IN</a>
            </div>
          : null
        }
      </div>
    );
  }
}

Notification.propTypes = {
  memberId: PropTypes.node,
  currentUserId: PropTypes.node,
  path: PropTypes.string,
  type: PropTypes.string,
  clubId: PropTypes.node,
  meetingId: PropTypes.node,
  emailHash: PropTypes.string
};

export default Notification;
