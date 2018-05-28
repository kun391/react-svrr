import React from 'react';
import { ImageItem, InvitationLink } from 'partials';
import PropTypes from 'prop-types';
import { TextField, FormMessage } from 'partials/forms';
import { API_URL } from 'constants/config';
import axios from 'axios';

class ClubItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      clubName: this.props.name,
      originalName: this.props.name,
      showEdit: false,
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

  showEditForm() {
    this.setState({
      showEdit: true
    });
  }

  hideEditForm() {
    this.setState({
      showEdit: false
    });
  }

  onSubmit(e) {
    e.preventDefault();

    axios({
      url: `${API_URL}/clubs/${this.props.id}/`,
      method: 'PATCH',
      data: {
        name: this.state.clubName
      }
    }).then(response => {
      if (response && response.data) {
        this.setState({
          originalName: this.state.clubName
        }, () => {
          this.hideEditForm();
        })
      }
    }).catch(error => {
      let notifications = {};
      notifications.error = 'Cannot change club name.';
      this.setState({
        notifications
      });
    });
  }

  render() {
    let imageAvatar = this.props.type === 'local' ? require(`assets/images/${this.props.image}`) : this.props.image;
    return (
      <li className="item">
        <div className="left-content">
          <div className="image" style={{backgroundImage: `url(${imageAvatar})`}}>
            <a href={`/clubs/${this.props.id}/meetings`}>
              <ImageItem image={this.props.image} type={this.props.type} className="image" />
            </a>
          </div>
          <div className="club-info">
            <div className="info">
              {
                this.state.showEdit
                ? <form className="main-form edit-club-form">
                    <TextField type="text" name="clubName" value={this.state.clubName} error={this.state.notifications.email} placeholder="Your Email" onChange={this.onChange.bind(this)} />
                    <button className="btn btn-default-corner btn-transparent btn-submit" onClick={this.onSubmit.bind(this)}>Save</button>
                    <a href="javascript:void(0);" className="btn-cancel" onClick={this.hideEditForm.bind(this)}>Cancel</a>
                    <div className="clearfix"></div>
                    <FormMessage type="error" error={this.state.notifications.error} />
                  </form>
                : <h4 className="club-title"><a href={`/clubs/${this.props.id}/meetings`}>{this.state.originalName}</a>
                    {
                      this.props.edit
                      ? <span className="ficon-pencil btn-edit" onClick={this.showEditForm.bind(this)}></span>
                      : null
                    }
                  </h4>
              }
              <p className="member"><span className="ficon ficon-people"></span>{this.props.member} members</p>
            </div>
            <InvitationLink invitationLink={this.props.invitationLink} />
          </div>
        </div>
        <div className="clearfix"></div>
      </li>
    );
  }
}

ClubItem.propTypes = {
  currentUserId: PropTypes.node,
  id: PropTypes.node,
  name: PropTypes.string,
  code: PropTypes.string,
  type: PropTypes.string,
  member: PropTypes.number,
  image: PropTypes.string,
  invitationLink: PropTypes.string,
  edit: PropTypes.bool
};

export default ClubItem;
