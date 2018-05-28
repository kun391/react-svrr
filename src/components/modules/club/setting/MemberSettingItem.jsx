import React from 'react';
import { ImageItem } from 'partials';
import PropTypes from 'prop-types';
import { ToggleButton, FormMessage } from 'partials/forms';
import { SPIN_CFG } from 'constants/config';
import {findDOMNode} from 'react-dom';
import ReactTooltip from 'react-tooltip';
import Spinner from 'react-tiny-spin';
import * as clubSettingActions from 'actions/club-settings';

class MemberSettingItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      submitting: false
    };
  }

  onChange(type, e) {
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
      this.handleUser(type, e.target.name, value);
  }

  handleUser(type, target, value) {
    if (type === 'admin') {
      this.handleAdmin(target, value);
    }
    if (type === 'active') {
      this.handleActive(target, value);
    }
  }

  handleAdmin(target, value) {
    let method = '';
    let data = {};

    if (value) {
      method = 'PUT';
      data = {
        is_admin: true
      }
    } else {
      method = 'DELETE';
    }

    this.props.dispatch(clubSettingActions.handleAdminRole(this.props.clubId, this.props.user.membership.id, method, data));
  }

  handleActive(target, value) {
    let method = '';
    let data = {};

    if (value) {
      method = 'PUT';
      data = {
        is_active: true
      }
    } else {
      method = 'DELETE';
    }

    this.props.dispatch(clubSettingActions.handleActiveMember(this.props.clubId, this.props.user.membership.id, method, data));
  }

  closePopup() {
    ReactTooltip.hide(findDOMNode(this.refs.global));
  }

  handleRemoveMember(event) {
    this.setState({ submitting: true });
    ReactTooltip.hide(findDOMNode(this.refs.global));

    this.props.onRemoveUser(this.props.clubId, this.props.user.membership.id, this.props.user);
  }

  componentDidMount() {
    // This is call only at client
  }

  render() {
    const spinCfg = Object.assign({}, SPIN_CFG);
    spinCfg.position = 'relative';
    spinCfg.width = 2;
    spinCfg.color = '#fff';
    spinCfg.lines = 8;
    spinCfg.length = 4;
    spinCfg.radius = 4;

    return (
      <li className="item">
        <div className="left-content">
          <div className="avatar">
            <ImageItem image={this.props.user && this.props.user.avatar ? this.props.user.avatar : 'avatar.jpg'} type={!this.props.user || !this.props.user.avatar ? 'local' : ''} className="img-avatar" />
          </div>
          <div className="info">
            <p className="name">{this.props.user.name}</p>
            <p className="text-gray email">{this.props.user.email}</p>
            <p className="text-gray phone">{this.props.user.phone}</p>
          </div>
        </div>
        {
          this.props.currentUserAdmin
          ? <div className="right-content">
              {
                !this.props.user.membership.is_active
                ? <div className="button-group">
                    <button className="btn btn-default-corner btn-transparent btn-remove-member" data-tip data-for="global" data-event="click" ref="global" disabled={this.state.submitting}>
                      { 
                        this.state.submitting
                        ? <Spinner config={{...spinCfg, color: "#000"}} />
                        : "Remove"
                      }
                    </button>
                    <ReactTooltip id="global" className="popup-create-meeting popup-remove-member" aria-haspopup="true" role="example" place="bottom" type="light" effect="solid"
                      getContent={[() => 
                        <div className="popup-content">
                          <div className="heading">
                            <h3 className="title">Are you sure you want to remove this member?</h3>
                          </div>
                          <p className="description">This action is irreversible</p>
                          <div className="form-button-group">
                            <button type="button" className="btn btn-default-corner btn-cancel" onClick={this.closePopup.bind(this)}>Cancel</button>
                            <button type="submit" className="btn btn-default-corner btn-remove" onClick={this.handleRemoveMember.bind(this)} disabled={this.state.submitting}>
                              { 
                                this.state.submitting
                                ? <Spinner config={spinCfg} />
                                : "Remove member"
                              }
                            </button>
                          </div>
                        </div>
                      ]}
                    />
                  </div>
                : null
              }
              {
                this.props.user.membership.is_active
                ? <div className="toggle-button-group">
                    <label className="tgl-label">Admin</label>
                    <ToggleButton name="is_admin" forName={`is_admin_${this.props.user.id}`} value={this.props.user.membership.is_admin} onChange={this.onChange.bind(this, 'admin')} className="pull-right" />
                  </div>
                : null
              }
              <div className="toggle-button-group">
                <label className="tgl-label">{this.props.user.membership.is_active ? 'Active' : 'Inactive'}</label>
                <ToggleButton name="is_active" forName={`is_active_${this.props.user.id}`} value={this.props.user.membership.is_active} onChange={this.onChange.bind(this, 'active')} className="pull-right" />
              </div>
            </div>
          : null
        }
        {
          !this.props.currentUserAdmin && this.props.currentUserId === this.props.user.id
          ? <div className="right-content">
              <div className="button-group">
                <button className="btn btn-default-corner btn-transparent btn-remove-member" data-tip data-for="global" data-event="click" ref="global" disabled={this.state.submitting}>
                  { 
                    this.state.submitting
                    ? <Spinner config={{...spinCfg, color: "#000"}} />
                    : "Remove me"
                  }
                </button>
                <ReactTooltip id="global" className="popup-create-meeting popup-remove-member" aria-haspopup="true" role="example" place="bottom" type="light" effect="solid"
                  getContent={[() => 
                    <div className="popup-content">
                      <div className="heading">
                        <h3 className="title">Are you sure you want to remove this member?</h3>
                      </div>
                      <p className="description">This action is irreversible</p>
                      <div className="form-button-group">
                        <button type="button" className="btn btn-default-corner btn-cancel" onClick={this.closePopup.bind(this)}>Cancel</button>
                        <button type="submit" className="btn btn-default-corner btn-remove" onClick={this.handleRemoveMember.bind(this)} disabled={this.state.submitting}>
                          { this.state.submitting
                            ? <Spinner config={spinCfg} />
                            : "Remove me"
                          }
                        </button>
                      </div>
                    </div>
                  ]}
                />
              </div>
            </div>
          : null
        }
      </li>
    );
  }
}

MemberSettingItem.propTypes = {
  currentUserId: PropTypes.node,
  currentUserAdmin: PropTypes.bool,
  user: PropTypes.object
};

export default MemberSettingItem;
