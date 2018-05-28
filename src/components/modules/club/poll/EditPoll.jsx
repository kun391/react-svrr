import React from 'react'
import PropTypes from 'prop-types'
import ClubInfo from 'modules/club/ClubInfo.jsx'
import { SIDE_BAR } from 'constants/config'
import CreatePollForm from './CreatePollForm.jsx'

class EditPoll extends React.Component {
  onSubmit (params) {
    this.props.editPoll(params)
  }

  onDelete (pollData) {
    this.props.deletePoll(pollData)
  }

  render () {
    return (
      <div className='profile-container create-poll-container'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='center'>
              <div className='left-container'>
                <ClubInfo clubId={this.props.clubId} active={SIDE_BAR.POLLS} currentUserId={this.props.currentUserId} />
              </div>
              <div className='right-container'>
                <div className='block-container'>
                  <div className='block-content create-poll-content'>
                    <h3 className='block-title'>Edit a poll</h3>
                    <CreatePollForm
                      label='Edit'
                      onSubmit={this.onSubmit.bind(this)}
                      onDelete={this.onDelete.bind(this)}
                      poll={this.props.poll}
                      clubId={this.props.clubId}
                      currentUserId={this.props.currentUserId}
                      creatingPoll={this.props.updatingPoll}
                      creatingPollError={this.props.updatingPollError}
                    />
                  </div>
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

EditPoll.propTypes = {
  currentUserId: PropTypes.number,
  clubId: PropTypes.string,
  updatingPoll: PropTypes.bool,
  updatingPollError: PropTypes.string,
  editPoll: PropTypes.func,
  deletePoll: PropTypes.func,
  poll: PropTypes.object
}

export default EditPoll
