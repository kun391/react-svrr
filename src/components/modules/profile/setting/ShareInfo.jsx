import React from 'react';
import { ToggleButton } from 'partials/forms';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API_URL } from 'constants/config';

class ShareInfo extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isShare: this.props.currentUser && this.props.currentUser.isShare || false,
      membershipId: null,
      notifications: {}
    };
  }

  onChange(e) {
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    if (value) {
      this.handleShare('PUT');
    } else {
      this.handleShare('DELETE');
    }

    this.setState({
      [e.target.name]: value,
    });
  }

  handleShare(method) {
    axios({
      url: `${API_URL}/clubs/${this.props.clubId}/memberships/${this.state.membershipId}/share_info/`,
      method: method
    });
  }

  getMembership() {
    let id = this.props.currentUserId;

    if (id) {
      axios({
        url: `${API_URL}/clubs/${this.props.clubId}/memberships/`,
        method: 'GET'
      }).then(response => {
        if (response && response.data) {
          for (var i = 0; i < response.data.results.length; i++) {
            if (parseInt(response.data.results[i].member) === parseInt(id)) {
              this.setState({
                membershipId: response.data.results[i].id,
                isShare: response.data.results[i].share_info_with_club
              })
            }
          }
        }
      });
    }
  }

  componentDidMount() {
    // This is call only at client
    this.getMembership(this.props.clubId);
  }

  render() {
    return (
      <div className="toggle-button-group">
        <label className="tgl-label pl15">{this.props.name}</label>
        <ToggleButton name="isShare" value={this.state.isShare} forName={`btn-${this.state.membershipId}`} onChange={this.onChange.bind(this)} className="pull-right" />
      </div>
    );
  }
}

ShareInfo.propTypes = {
  currentUserId: PropTypes.node,
  clubId: PropTypes.node,
  name: PropTypes.string
};

export default ShareInfo;
