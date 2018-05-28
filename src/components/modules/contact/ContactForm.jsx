import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Users } from 'api';
import { emailPattern } from 'constants/regexPattern';
import classnames from 'classnames';
import { TextField, FormMessage } from 'partials/forms';
import PropTypes from 'prop-types';

class ContactForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: '',
      email: '',
      phone: '',
      message: '',
      notifications: {}
    }
  }

  onChange(e) {
    if (!!this.state.notifications[e.target.name]) {
      let notifications = Object.assign({}, this.state.notifications);
      delete notifications[e.target.name];
      delete notifications['error'];
      delete notifications['success'];
      this.setState({
        [e.target.name]: e.target.value,
        notifications
      });
    } else {
      this.setState({
        [e.target.name]: e.target.value
      });
    }
  }

  validate() {
    let notifications = {};
    let name = this.state.name;
    let email = this.state.email;
    let phone = this.state.phone;
    let message = this.state.message;

    if (!name) {
      notifications.name = 'Name is required';
    } else if (!email) {
      notifications.email = 'Email is required';
    } else if (!emailPattern.test(email)) {
      notifications.email = 'Email is invalid';
    } else if (!phone) {
      notifications.phone = 'Phone is required';
    } else if (!message) {
      notifications.message = 'Message is required';
    }

    if (Object.getOwnPropertyNames(notifications).length !== 0 && notifications.constructor === Object) {
      this.setState({ notifications });
      return false;
    }

    return true;
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.validate()) {
      this.props.users.contact(null, { name: this.state.name, email: this.state.email, phone: this.state.phone, message: this.state.message }).then(response => {
        if (response && response.data) {
          let notifications = {};
          notifications.success = 'Your message has been sent.';

          this.setState({
            name: '',
            email: '',
            phone: '',
            message: '',
            notifications
          })
        }
      }).catch(error => {
        let notifications = {};

        notifications.error = 'Your message has not been sent. Please try again.';

        this.setState({ notifications });
      });
    }
  }

  render() {
    return (
      <form role="form" className="main-form" onSubmit={this.onSubmit.bind(this)} noValidate>
        <FormMessage type="error" error={this.state.notifications.error} />
        <FormMessage type="success" error={this.state.notifications.success} />
        <TextField type="text" name="name" value={this.state.name} error={this.state.notifications.name} placeholder="Your Name" onChange={this.onChange.bind(this)} />
        <TextField type="text" name="email" value={this.state.email} error={this.state.notifications.email} placeholder="Your Email" onChange={this.onChange.bind(this)} />
        <TextField type="text" name="phone" value={this.state.phone} error={this.state.notifications.phone} placeholder="Phone Number" onChange={this.onChange.bind(this)} />
        <div className="form-group">
          <textarea name="message" value={this.state.message} className="form-control form-textarea" placeholder="Note" onChange={this.onChange.bind(this)}></textarea>
          <span className={classnames('notification-message error', { show: !!this.state.notifications.message })}>{this.state.notifications.message}</span>
        </div>
        <div className="form-group button-group">
          <button type="submit" className="btn btn-default-corner btn-form-default btn-send">SEND</button>
        </div>
      </form>
    );
  }
}

ContactForm.propTypes = {
  users: PropTypes.object
};

function bindStateToProps(state) {
  return {};
}

function bindDispatchToProps(dispatch) {
  return {
    users: bindActionCreators(Users.actions, dispatch)
  };
}

export default connect(bindStateToProps, bindDispatchToProps)(ContactForm);
