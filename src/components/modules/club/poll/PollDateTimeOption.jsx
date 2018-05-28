import moment from 'moment'
import React from 'react'
import PropTypes from 'prop-types'
import 'react-select/dist/react-select.css'

class PollDateTimeOption extends React.Component {
  render () {
    const date = moment(this.props.dateTime.date).format('dddd, MMMM Do YYYY')
    const time = this.props.dateTime.time
      ? moment(this.props.dateTime.time, 'hh:mm:ss').format('LT') : null
    return (
      <div className='row poll-date-time-option'>
        <p className='col-sm-6 col-sm-offset-3'>
          {date}{ time ? ' at ' : null }{time}
        </p>
        <button className='btn btn-default-corner btn-remove-book' onClick={this.props.onDelete}>Remove</button>
      </div>
    )
  }
}

PollDateTimeOption.propTypes = {
  dateTime: PropTypes.object,
  onDelete: PropTypes.func
}

export default PollDateTimeOption
