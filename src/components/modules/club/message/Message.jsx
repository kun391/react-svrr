import React from 'react';
import { ImageItem, BlockHeader } from 'partials';
import ClubInfo from 'modules/club/ClubInfo.jsx';
import PropTypes from 'prop-types';
import { SIDE_BAR, API_URL, SPIN_CFG } from 'constants/config';
import NoMessages from './NoMessages.jsx';
import MessageGroup from './MessageGroup.jsx';
import PostMessageForm from './PostMessageForm.jsx';
import Spinner from 'react-tiny-spin';
import * as actions from 'actions/messages';

class Message extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  getMessages() {
    this.props.dispatch(actions.fetchMessages(this.props.clubId));
  }

  componentDidMount() {
    this.props.dispatch(actions.fetchMessagesIfNeeded(this.props.clubId));
  }

  render() {
    let spinCfg = Object.assign({}, SPIN_CFG);
    spinCfg.lines = 12;
    spinCfg.length = 15;
    spinCfg.width = 4;
    spinCfg.radius = 15;
    const { currentUser, clubId, messages, fetched } = this.props;

    let listMessageGroup = messages.map(item => {
      return (
        <MessageGroup key={item.id} clubId={clubId} messages={item} onGetMessages={this.getMessages.bind(this)} />
      );
    });

    return (
      <div className="profile-container message-container">
        <div className="container-fluid">
          <div className="row">
            <div className="center">
              <div className="left-container">
                <ClubInfo clubId={clubId} active={SIDE_BAR.MESSAGES} />
              </div>
              <div className="right-container">
                <div className="block-container">
                  {
                    messages && fetched
                    ? (
                        messages.length > 0
                        ? <div className="block-content block-my-clubs">
                            <BlockHeader ficon="" title="Messages" number={0} type="" link="" addText="" />
                            <PostMessageForm clubId={clubId} onGetMessages={this.getMessages.bind(this)} />
                            <div className="list-message-container">
                              { listMessageGroup }
                            </div>
                          </div>
                        : <NoMessages clubId={clubId} onGetMessages={this.getMessages.bind(this)} />
                      )
                    : <Spinner config={spinCfg} />
                  }
                </div>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  currentUser: PropTypes.object,
  messages: PropTypes.array,
  fetched: PropTypes.bool
};

export default Message;
