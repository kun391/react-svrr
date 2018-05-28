import React from 'react'
import { ImageItem } from 'partials'
import PropTypes from 'prop-types'
import moment from 'moment'
import formatRoute from 'base/helpers/helpers.js'
import * as actions from 'actions/polls'
import { SPIN_CFG } from 'constants/config'
import Spinner from 'react-tiny-spin'
import Autolinker from 'autolinker'
const dateTimeOptionFormat = 'ddd MMM Do'

class PollItem extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      showBookVoteWidget: false,
      showDateTimeVoteWidget: false,
      currentUserHasVotedForABook: false,
      currentUserHasVotedForADate: false
    }
  }

  componentWillReceiveProps (nextProps) {
    const currentUserBookVote = nextProps.data.book_votes.find(vote => {
      return vote.member.id === nextProps.currentUser.id && vote.response === true
    })
    let currentUserHasVotedForABook = false
    if (currentUserBookVote) {
      currentUserHasVotedForABook = true
    }
    const currentUserDateVote = nextProps.data.date_time_votes.find(vote => {
      return vote.member.id === nextProps.currentUser.id && vote.response === true
    })
    let currentUserHasVotedForADate = false
    if (currentUserDateVote) {
      currentUserHasVotedForADate = true
    }
    this.setState({
      currentUserHasVotedForABook: currentUserHasVotedForABook,
      currentUserHasVotedForADate: currentUserHasVotedForADate
    })
  }

  voteBook (bookId, voteValue) {
    this.props.dispatch(actions.voteBook(
      this.props.currentUser,
      bookId,
      voteValue,
      this.props.clubId,
      this.props.data.id
    ))
  }

  toggleBookVoteWidget () {
    this.setState({showBookVoteWidget: !this.state.showBookVoteWidget})
  }

  voteDateTime (dateTimeId, voteValue) {
    this.props.dispatch(actions.voteDateTime(
      this.props.currentUser,
      dateTimeId,
      voteValue,
      this.props.clubId,
      this.props.data.id
    ))
  }

  toggleDateTimeVoteWidget () {
    this.setState({showDateTimeVoteWidget: !this.state.showDateTimeVoteWidget})
  }

  render () {
    let spinCfg = Object.assign({}, SPIN_CFG)
    spinCfg.lines = 12
    spinCfg.length = 5
    spinCfg.width = 2
    spinCfg.radius = 5
    spinCfg.color = '#fff'
    spinCfg.position = 'relative'

    const bookOptions = this.props.data.book_options.map((bookOption, idx) => {
      const currentUserBookVote = this.props.data.book_votes.find(bookVote => {
        return bookVote.option === bookOption.id &&
          bookVote.member.id === this.props.currentUser.id
      })
      let voteText = 'Vote'
      let voteValue = true
      const votingOn = this.props.votingOnBook
      if (votingOn === bookOption.id) {
        voteText = <Spinner config={spinCfg} />
      } else if (currentUserBookVote && currentUserBookVote.response === true) {
        voteText = <i className='glyphicon glyphicon-ok' />
        voteValue = false
      }

      const book = bookOption.book
      if (book.image_url) {
        return (
          <div key={idx} className='selected-book poll col-xs-6 col-md-3'>
            <div className='row content'>
              <div className='wrap-image poll col-sm-10 col-xs-offset-1' style={{backgroundImage: `url(${book.image_url})`}}>
                <a key={idx} href={book.id ? `/books/${formatRoute(book.title, book.id)}` : `javascript:void(0);`} className='image-link'>
                  <ImageItem className='image' image={book.image_url} description={book.title} />
                </a>
              </div>
            </div>
            <div className='row content'>
              <button type='button' className='btn btn-default-corner btn-remove-book' onClick={this.voteBook.bind(this, book.id, voteValue)}>
                { voteText }
              </button>
            </div>
          </div>
        )
      }
    })
    function sortPollOptions (a, b) {
      if (a.numberOfVotes < b.numberOfVotes) {
        return 1
      } else if (a.numberOfVotes > b.numberOfVotes) {
        return -1
      } else {
        return 0
      }
    }

    const bookResults = this.props.data.book_options.map((option, idx) => {
      const bookVotes = this.props.data.book_votes.filter(vote => {
        return vote.option === option.id && vote.response === true
      })
      const renderedBookVotes = bookVotes.map((vote, idx) => {
        return (
          <p key={idx} className='row'>{vote.member.name || vote.member.email}</p>
        )
      })
      option.numberOfVotes = renderedBookVotes.length
      option.renderedBookVotes = renderedBookVotes
      return option
    })
    bookResults.sort(sortPollOptions)
    const renderedBookResults = bookResults.map((option, idx) => {
      return (
        <div key={idx} className='row book-results'>
          <div className='col-xs-5'>
            <div className='wrap-image poll col-sm-10 col-xs-offset-1' style={{backgroundImage: `url(${option.book.image_url})`}}>
              <a key={idx} href={option.book.id ? `/books/${formatRoute(option.book.title, option.book.id)}` : `javascript:void(0);`} className='image-link'>
                <ImageItem className='image' image={option.book.image_url} description={option.book.title} />
              </a>
            </div>
          </div>
          <div className='col-xs-7'>
            <p className='row'>{ option.numberOfVotes } votes:</p>
            { option.renderedBookVotes }
          </div>
        </div>

      )
    })
    const dateTimeOptions = this.props.data.date_time_options.map((dateTimeOption, idx) => {
      const currentUserDateTimeVote = this.props.data.date_time_votes.find(dateTimeVote => {
        return dateTimeVote.option === dateTimeOption.id &&
          dateTimeVote.member.id === this.props.currentUser.id
      })
      let voteText = 'Vote'
      let voteClass = ''
      let voteValue = true
      const votingOn = this.props.votingOnDateTime
      if (votingOn === dateTimeOption.id) {
        voteText = <Spinner config={spinCfg} />
      } else if (currentUserDateTimeVote && currentUserDateTimeVote.response === true) {
        voteText = <i className='glyphicon glyphicon-ok' />
        voteValue = false
        voteClass = ' bg-black'
      }

      return (
        <div key={idx} className='poll-date-time-option row'>
          <button type='button' className={'col-xs-3 btn btn-default-corner btn-remove-book' + voteClass} onClick={this.voteDateTime.bind(this, dateTimeOption.id, voteValue)}>
            { voteText }
          </button>
          <p className='col-xs-8 col-xs-offset-1 poll-date-time'>
            {moment(dateTimeOption.date).format(dateTimeOptionFormat)}
            {dateTimeOption.time
              ? ' at ' + moment(dateTimeOption.time, 'hh:mm:ss').format('LT')
              : null
            }
          </p>
        </div>
      )
    })
    const dateTimeResults = this.props.data.date_time_options.map((option, idx) => {
      const dateTimeVotes = this.props.data.date_time_votes.filter(vote => {
        return vote.option === option.id && vote.response === true
      })
      const renderedDateTimeVotes = dateTimeVotes.map((vote, idx) => {
        return (
          <p key={idx} className='row'>{vote.member.name || vote.member.email}</p>
        )
      })
      option.renderedDateTimeVotes = renderedDateTimeVotes
      option.numberOfVotes = renderedDateTimeVotes.length
      return option
    })
    dateTimeResults.sort(sortPollOptions)
    const renderedDateTimeResults = dateTimeResults.map((option, idx) => {
      return (
        <div key={idx} className='row date-time-results'>
          <div className='col-xs-6'>
            <h3>
              {moment(option.date).format(dateTimeOptionFormat)}
            </h3>
            { option.time
            ? <h3>{' at ' + moment(option.time, 'hh:mm:ss').format('LT')}</h3>
            : null
            }
          </div>
          <div className='col-xs-6'>
            <p className='row'>{ option.numberOfVotes } can attend:</p>
            { option.renderedDateTimeVotes }
          </div>
        </div>
      )
    })
    const changeBookVoteButtonText = this.state.currentUserHasVotedForABook
    ? 'Change my book vote(s)'
    : 'Vote for book(s)'

    const changeDateVoteButtonText = this.state.currentUserHasVotedForADate
    ? 'Change my availability'
    : 'Set my availability'

    return (
      <li className='item'>
        <div className='row'>
          <div className='col-xs-2 calendar'>
            {
              this.props.data.due_date
              ? <span className='date-group'>
                <span className='date'>{moment(this.props.data.due_date).format('DD')}</span>
                <span className='date'>{moment(this.props.data.due_date).format('MMM')}</span>
                <span className='year'>{moment(this.props.data.due_date).format('YYYY')}</span>
              </span>
              : <span className='text'>(No due date.)</span>
            }
          </div>
          <div className='col-xs-10 book-description'>
            <div className='row poll-title'>
              <h2 className='pull-left'>{ this.props.data.title }</h2>
              <div className='topbar'>
                <a href={`/clubs/${this.props.clubId}/polls/${this.props.data.id}`} className='btn btn-default-corner btn-edit-poll'>Edit</a>
              </div>
            </div>
            <div className='row poll-notes'>
              { this.props.data.notes
              ? <p className='notes'><b>Notes:</b> <span dangerouslySetInnerHTML={{__html: Autolinker.link(this.props.data.notes, {stripPrefix: {scheme: false}}).replace(`\n`, `<br />`)}} /></p>
              : null }
            </div>
            <div className='row poll-vote-toggles'>
              { this.props.data.book_options.length
              ? <a
                onClick={this.toggleBookVoteWidget.bind(this)}
                className='btn btn-default-corner btn-change-vote'>
                { this.state.showBookVoteWidget
                ? 'Finish changing my book vote'
                : changeBookVoteButtonText
                }
              </a>
              : null }
              { this.props.data.date_time_options.length
              ? <a
                onClick={this.toggleDateTimeVoteWidget.bind(this)}
                className='btn btn-default-corner btn-change-vote'>
                { this.state.showDateTimeVoteWidget
                ? 'Finish changing my availability'
                : changeDateVoteButtonText
                }
              </a>
              : null }
            </div>
            { this.state.showBookVoteWidget
            ? <div className='row book-options'>
              { bookOptions }
            </div>
            : null
            }
            { this.state.showDateTimeVoteWidget
            ? <div className='row date-time-options'>
              <h3>Check all that apply</h3>
              { dateTimeOptions }
            </div>
            : null
            }
          </div>
        </div>
        <div className='row'>
          <div className='col-md-7'>
            <h3 className='text-center vote-results-header'>Books</h3>
            { renderedBookResults }
          </div>
          <div className='col-md-5'>
            <h3 className='text-center vote-results-header'>Dates</h3>
            { renderedDateTimeResults }
          </div>
        </div>
      </li>
    )
  }
}

PollItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentUser: PropTypes.object,
  data: PropTypes.object,
  clubId: PropTypes.string.isRequired
}

export default PollItem
