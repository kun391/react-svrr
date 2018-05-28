import React from 'react'
import { ImageItem, BlockHeader } from 'partials'
import ClubInfo from 'modules/club/ClubInfo.jsx'
import PropTypes from 'prop-types'
import { SIDE_BAR, SPIN_CFG } from 'constants/config'
import 'react-select/dist/react-select.css'
import PollItem from './PollItem.jsx'
import ReactTooltip from 'react-tooltip'
import Spinner from 'react-tiny-spin'
import * as actions from 'actions/polls'

class Poll extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.sortPolls = this.sortPolls.bind(this)
  }

  componentDidMount () {
    // This is call only at client
    const { dispatch, clubId } = this.props
    dispatch(actions.fetchPollsIfNeeded(clubId))
  }

  sortPolls (polls) {
    return polls.sort((a, b) => {
      if (a.due_date < b.due_date) {
        return 1
      } else if (a.due_date > b.due_date) {
        return -1
      } else if (a.title < b.title) {
        return 1
      } else if (a.title > b.title) {
        return -1
      } else {
        return 0
      }
    })
  }

  render () {
    let spinCfg = Object.assign({}, SPIN_CFG)
    spinCfg.lines = 12
    spinCfg.length = 15
    spinCfg.width = 4
    spinCfg.radius = 15

    const { currentUser, clubId, currentPolls, fetchedCurrent, membershipByUserId, votingOn } = this.props

    let listCurrentPolls = currentPolls && this.sortPolls(currentPolls).map(item => {
      return (
        <PollItem
          key={item.id}
          currentUser={currentUser}
          data={item}
          clubId={clubId}
          dispatch={this.props.dispatch}
          votingOn={votingOn}
        />
      )
    })

    return (
      <div className='profile-container poll-container'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='center'>
              <div className='left-container'>
                <ClubInfo clubId={clubId} active={SIDE_BAR.POLLS} currentUserId={currentUser.id} />
              </div>
              <div className='right-container'>
                <div className='block-container'>
                  { !fetchedCurrent && <Spinner config={spinCfg} /> }
                  {
                    currentPolls
                    ? <div className='book-list-container'>
                      <div className='block-content block-my-clubs block-list-poll'>
                        <BlockHeader ficon='' title='UPCOMING POLL(S)' number={currentPolls.length} type='poll' link={`/clubs/${clubId}/create-poll`} addText='CREATE A NEW POLL' />
                        {
                          fetchedCurrent
                          ? (
                              currentPolls.length > 0
                              ? <div className='list-poll'>
                                <ul className='list'>
                                  { listCurrentPolls }
                                </ul>
                              </div>
                              : <div className='block-content'>
                                <div className='no-polls'>
                                  <ImageItem image='no-meetings.svg' type='local' />
                                  <div className='description pt15'>
                                    <p className='text'>You don't have any upcoming polls. <a href={`/clubs/${clubId}/create-poll`} className='txt-link'>Create a new poll</a></p>
                                  </div>
                                </div>
                              </div>
                              )
                            : null
                          }
                        </div>
                      </div>
                    : null
                  }
                  {
                    !currentPolls
                    ? <div className='block-content'>
                      <div className='no-polls'>
                        <ImageItem image='no-meetings.svg' type='local' />
                        <h3 className='title'>Polls</h3>
                        <div className='description'>
                          <p>You don't have any upcoming polls.</p>
                          <p>Create one now! Create a new poll</p>
                        </div>
                        <div className='button'>
                          <a href={`/clubs/${clubId}/create-poll`} className='btn btn-default-corner bg-transparent btn-create-poll'>Create a poll</a>
                        </div>
                        <div className='button-group'>
                          <ul className='list'>
                            <li className='item'><a href='#' className='btn btn-default-corner bg-transparent' data-tip data-for='global' ref='global'>SEND A CALENDAR POLL</a></li>
                            <li className='item'><a href='#' className='btn btn-default-corner bg-transparent' data-tip data-for='global' ref='global'>SEND A BOOK POLL</a></li>
                          </ul>
                          <ReactTooltip id='global' className='popup-create-poll pb0' aria-haspopup='true' role='example' place='top' type='light' effect='solid'>
                            <p className='description pb0'>The feature is coming soon!</p>
                          </ReactTooltip>
                        </div>
                      </div>
                    </div>
                    : null
                  }
                </div>
              </div>
              <div className='clearfix' />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Poll.propTypes = {
  clubId: PropTypes.node,
  currentUser: PropTypes.object,
  currentPolls: PropTypes.array,
  fetchedCurrent: PropTypes.bool,
  votingOn: PropTypes.number
}

export default Poll
