import React from 'react';
import { ImageItem } from 'partials';
import PropTypes from 'prop-types';
import { TextField, FormMessage } from 'partials/forms';
import CreateClubForm from './CreateClubForm.jsx';
import cookie from 'react-cookie';
import axios from 'axios';
import { API_URL } from 'constants/config';

class CreateClub extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      name: '',
      edited: false,
      showForm: false,
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
    let name = this.state.name;

    if (!name) {
      notifications.name = 'You must include a name.';
    }

    if (Object.getOwnPropertyNames(notifications).length !== 0 && notifications.constructor === Object) {
      this.setState({ notifications });
      return false;
    }

    return true;
  }

  onSubmit(e) {
    e.preventDefault();

    let notifications = {};
    let params = {
      name: this.state.name,
    };
    let cdata = cookie.load('userInfo');

    if (this.validate()) {
      axios({
        url: `${API_URL}/auth/me/`,
        method: 'PATCH',
        data: params
      }).then(response => {
        if (response && response.data) {
          this.setState({
            name: response.data.name,
            showForm: false,
            edited: true
          });

          if (typeof this.props.onUpdateState()) {
            this.props.onUpdateState(response.data);
          }

          cdata.name = response.data.name;

          cookie.save('userInfo', cdata, { path: '/' });
        }
      }).catch(error => {
        notifications.error = 'Cannot update you profile';
        this.setState({
          notifications
        });
      });
    }
  }

  showForm() {
    this.setState({
      showForm: true
    })
  }

  render() {
    return (
      <div className="club-container create-club-container">
        <div className="container-fluid">
          <div className="row">
            <div className="center">
              <div className="create-club-content">
                <div className="create-club">
                  <ImageItem image="img-create-new-club.svg" className="image" type="local" />
                  <h4 className="title">Create New Club</h4>
                  {
                    (!this.props.currentUser.name && !this.state.edited) || this.state.showForm
                    ? <form className="main-form form-create-name" onSubmit={this.onSubmit.bind(this)}>
                        <TextField type="text" name="name" value={this.state.name} error={this.state.notifications.name} maxLength="75" placeholder="Enter your name here..." onChange={this.onChange.bind(this)} />
                        <div className="form-group button-group">
                          <button type="submit" className="btn btn-default-corner btn-create-new-club">Save</button>
                        </div>
                      </form>
                    : null
                  }
                  {
                    this.state.edited && !this.state.showForm
                    ? <p className="name">Your name: {this.state.name} <span className="ficon-pencil" onClick={this.showForm.bind(this)} /></p>
                    : null
                  }
                  <CreateClubForm currentUserId={this.props.currentUser.id} />
                </div>
              </div>
            </div>
            <div className="clearfix" />
          </div>
        </div>
      </div>
    );
  }
}

CreateClub.propTypes = {
  currentUser: PropTypes.object
};

export default CreateClub;
