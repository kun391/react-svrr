import React from 'react';
import { TextField, FormMessage } from 'partials/forms';
import PropTypes from 'prop-types';
import { InvitationLink } from 'partials';
import axios from 'axios';
import { API_URL } from 'constants/config';

class CreateClubSuccess extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      clubInfo: {}
    }
  }

  getClub(e) {
    axios({
      url: `${API_URL}/clubs/${this.props.clubId}/`,
      method: 'GET',
      data: {
        name: this.state.clubName
      }
    }).then(response => {
      if (response && response.data) {
        this.setState({
          clubInfo: response.data
        })
      }
    });
  }

  componentDidMount() {
    this.getClub();
  }

  render() {
    return (
      <div className="create-club-success">
        <div className="create-club-success-content">
          <h4 className="title">Created a new club successfully!</h4>
          <p className="club-name">My club: {this.state.clubInfo && this.state.clubInfo.name}</p>
          <InvitationLink invitationLink={this.state.clubInfo.get_join_url} />
        </div>
      </div>
    );
  }
}

CreateClubSuccess.propTypes = {
  clubId: PropTypes.node
};

export default CreateClubSuccess;
