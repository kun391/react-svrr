import React from 'react'
import PropTypes from 'prop-types'
import ClubInfo from 'modules/club/ClubInfo.jsx'
import { SIDE_BAR } from 'constants/config'
import CreatePollForm from './CreatePollForm.jsx'

class CreatePoll extends React.Component {
  onSubmit (params) {
    this.props.createPoll(params)
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
                    <h3 className='block-title'>Create a new poll</h3>
                    <CreatePollForm
                      label='Create'
                      onSubmit={this.onSubmit.bind(this)}
                      clubId={this.props.clubId}
                      currentUserId={this.props.currentUserId}
                      creatingPoll={this.props.creatingPoll}
                      creatingPollError={this.props.creatingPollError}
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

CreatePoll.propTypes = {
  currentUserId: PropTypes.number,
  clubId: PropTypes.string,
  creatingPoll: PropTypes.bool,
  creatingPollError: PropTypes.string,
  createPoll: PropTypes.func
}

export default CreatePoll
