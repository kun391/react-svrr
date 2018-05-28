import React from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import ReactTooltip from 'react-tooltip';
import PropTypes from 'prop-types';

class InvitationLink extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      copiedText: 'Click to copy',
    };
  }

  copyLink(e) {
    e.target.select();
  }

  render() {
    return (
      <div className="invite-link">
        <h5 className="title">INVITE LINK</h5>
        <CopyToClipboard text={this.props.invitationLink} onCopy={() => { this.setState({copiedText: 'Copied'}) }}>
          <input type="text" value={this.props.invitationLink} readOnly className="form-control" data-tip={this.state.copiedText} onFocus={this.copyLink.bind(this)} />
        </CopyToClipboard>
        <span className="note">Send friends this link to invite them to your club</span>
        <ReactTooltip place="top" type="dark" effect="solid" />
      </div>
    );
  }
}

InvitationLink.propTypes = {
  invitationLink: PropTypes.string
};

export default InvitationLink;
