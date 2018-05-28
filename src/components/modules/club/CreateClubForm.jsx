import React from 'react';
import { TextField, FormMessage } from 'partials/forms';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API_URL } from 'constants/config';

class CreateClubForm extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      clubName: '',
      notifications: {}
    }
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
    let clubName = this.state.clubName;

    if (!clubName) {
      notifications.clubName = 'Club name is required';
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
      axios({
        url: `${API_URL}/clubs/`,
        method: 'POST',
        data: {
          name: this.state.clubName
        }
      }).then(response => {
        if (response && response.data) {
          window.location = `/create-club/${response.data.id}/success`;
        }
      }).catch(error => {
        let notifications = {};
        notifications.error = 'Only three clubs per person. Please contact us to add more clubs';
        this.setState({
          notifications
        })
      })
    }
  }

  render() {
    return (
      <form role="form" className="main-form" onSubmit={this.onSubmit.bind(this)} noValidate>
        <FormMessage type="error" error={this.state.notifications.error} />
        <TextField type="text" name="clubName" value={this.state.clubName} error={this.state.notifications.clubName} maxLength="75" placeholder="Enter its name here..." onChange={this.onChange.bind(this)} />
        <div className="form-group button-group">
          <button type="submit" className="btn btn-default-corner btn-create-new-club">Create</button>
        </div>
      </form>
    );
  }
}

CreateClubForm.propTypes = {
  currentUserId: PropTypes.node
};

export default CreateClubForm;
