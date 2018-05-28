import React from 'react'
import { ImageItem } from 'partials'
import { TextField, TextArea, FormMessage } from 'partials/forms'
import PropTypes from 'prop-types'
import { API_URL, SPIN_CFG } from 'constants/config'
import 'react-select/dist/react-select.css'
import FindBookResults from 'modules/profile/FindBookResults.jsx'
import axios from 'axios'
import {findDOMNode} from 'react-dom'
import Datetime from 'react-datetime'
import PollDateTimeOption from 'modules/club/poll/PollDateTimeOption.jsx'
import 'react-datetime/css/react-datetime.css'
import moment from 'moment'
import ReactTooltip from 'react-tooltip'
import Spinner from 'react-tiny-spin'

class CreatePollForm extends React.Component {
  constructor (props, context) {
    super(props, context)

    this.state = {
      pollDueDate: null,
      pollTitle: '',
      pollNotes: '',
      isBookPoll: false,
      showBookSearch: true,
      isDateTimePoll: false,
      newDateOption: '',
      newTimeOption: '',
      pollDateTimeOptions: [],
      pollBookOptions: [],
      isSendEmail: true,
      book: {},
      bookName: '',
      searchResults: [],
      options: [],
      notifications: {},
      searching: false
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.poll && !nextProps.creatingPoll) {
      this.setState({
        pollDueDate: moment(nextProps.poll.due_date),
        pollTitle: nextProps.poll.title,
        pollNotes: nextProps.poll.notes,
        pollBookOptions: nextProps.poll.book_options,
        pollDateTimeOptions: nextProps.poll.date_time_options,
        isSendEmail: false
      })
    }
    if (nextProps.creatingPollError) {
      this.setState({
        notifications: {
          ...this.state.notifications,
          ...{creatingPollError: nextProps.creatingPollError}
        }
      })
    }
  }

  onChange (e) {
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    const optionsState = e.target.name.replace('is', 'poll').replace('Poll', '') + 'Options'

    if (this.state.notifications[e.target.name]) {
      let notifications = Object.assign({}, this.state.notifications)
      delete notifications[e.target.name]
      delete notifications['error']
      this.setState({
        [e.target.name]: value,
        [optionsState]: [],
        notifications
      })
    } else {
      this.setState({
        [e.target.name]: value
      })
    }
  }

  onDateTimeChange (name, value) {
    if (this.state.notifications[name]) {
      let notifications = Object.assign({}, this.state.notifications)
      delete notifications[name]
      delete notifications['error']
      this.setState({
        [name]: moment(value),
        notifications
      })
    } else {
      this.setState({
        [name]: moment(value)
      })
    }
  }

  searchBook (e) {
    e.preventDefault()

    this.removeSelectedBook()

    let notifications = {}

    let keyword = this.state.bookName

    if (keyword.length < 2) {
      notifications.bookName = 'You must enter more than two characters to search for a book.'

      this.setState({notifications})

      return
    }

    this.setState({
      searching: true
    })

    axios({
      url: `${API_URL}/books/search/?searchTerms=${keyword}`,
      method: 'GET'
    }).then(response => {
      if (response && response.data) {
        this.setState({
          searchResults: response.data,
          searching: false
        })
      }
    }).catch(error => {
      console.log(error)
      let notifications = {}
      notifications.bookName = 'Your search was too specific and didn\'t return any results. Please try a simpler set of search terms.'
      this.setState({
        searchResults: [],
        searching: false,
        notifications
      })
    })
  }

  handleAfterAddBook (item) {
    const duplicate = this.state.pollBookOptions.some(bookOption => {
      return item.title === bookOption.book.title && item.author.name === bookOption.book.author.name
    })
    if (duplicate) {
      let notifications = {pollBookOptions: 'You cannot add the same book twice.'}
      this.setState({
        notifications
      })
    } else if (this.state.pollBookOptions.length === 12) {
      let notifications = {pollBookOptions: 'You cannot add more than twelve books options to a poll.'}
      this.setState({
        notifications
      })
    } else {
      this.setState({
        pollBookOptions: this.state.pollBookOptions.concat({'book': item}),
        bookName: '',
        notifications: {},
        showBookSearch: false
      })
    }
  }

  removeSelectedBook () {
    this.setState({
      book: {},
      searchResults: []
    })
  }

  removeBookOption (title, authorName) {
    const pollBookOptions = this.state.pollBookOptions.filter(bookOption => {
      return bookOption.book.title !== title || bookOption.book.author.name !== authorName
    })
    this.setState({
      pollBookOptions: pollBookOptions
    })
  }

  validate () {
    let notifications = {}
    if (this.state.pollDueDate < moment()) {
      notifications.pollDueDate = "You can't set a poll due date earlier than today."
    }

    if (Object.getOwnPropertyNames(notifications).length !== 0 && notifications.constructor === Object) {
      this.setState({ notifications })
      return false
    }

    return true
  }

  redirectRoute (e) {
    e.preventDefault()
    window.location = `/clubs/${this.props.clubId}/polls`
  }

  onDelete (e) {
    e.preventDefault()
    const pollData = {
      id: this.props.poll.id,
      club: this.props.clubId
    }
    // Hiding the tooltip is a temporary solution. Currently the tooltip's state
    // will not update dynamically. To be fixed via this PR:
    // https://github.com/wwayne/react-tooltip/pull/281
    ReactTooltip.hide(findDOMNode(this.refs.deleteMeetingTooltip))
    this.props.onDelete(pollData)
  }

  onSubmit (e) {
    e.preventDefault()

    if (this.validate()) {
      // Hiding the tooltip is a temporary solution. Currently the tooltip's state
      // will not update dynamically. To be fixed via this PR:
      // https://github.com/wwayne/react-tooltip/pull/281
      ReactTooltip.hide(findDOMNode(this.refs.global))
      const date = this.state.pollDueDate
        ? this.state.pollDueDate.format('YYYY-MM-DD') : null

      const pollDateTimeOptions = this.state.pollDateTimeOptions.map(option => {
        option.date = moment(option.date).format('YYYY-MM-DD')
        option.time = option.time ? moment(option.time, 'hh:mm:ss').format('HH:mm') : null
        return option
      })
      let params = {
        title: this.state.pollTitle,
        notes: this.state.pollNotes,
        club: this.props.clubId,
        due_date: date,
        date_time_options: pollDateTimeOptions,
        book_options: this.state.pollBookOptions,
        email_club: this.state.isSendEmail
      }
      this.props.onSubmit(params)
    } else {
      ReactTooltip.hide(findDOMNode(this.refs.global))
    }
  }
  closePopup () {
    ReactTooltip.hide(findDOMNode(this.refs.global))
  }

  closeEditPollTooltip () {
    ReactTooltip.hide(findDOMNode(this.refs.editMeetingTooltip))
  }

  closeDeleteMeetingTooltip () {
    ReactTooltip.hide(findDOMNode(this.refs.deleteMeetingTooltip))
  }

  addDateTimeOption () {
    const dateTimeOption = {
      date: this.state.newDateOption,
      time: this.state.newTimeOption || null
    }
    const duplicate = this.state.pollDateTimeOptions.some(option => {
      return dateTimeOption.date === option.date &&
        dateTimeOption.time === option.time
    })
    if (duplicate) {
      let notifications = {
        pollDateTimeOptions: 'This date and time option has already been added!'
      }
      this.setState({
        notifications
      })
    } else {
      let pollDateTimeOptions = this.state.pollDateTimeOptions.concat([dateTimeOption])
      pollDateTimeOptions.sort((a, b) => {
        if (a.date > b.date) {
          return 1
        } else if (a.date < b.date) {
          return -1
        } else if (a.time > b.time) {
          return 1
        } else if (a.time < b.time) {
          return -1
        } else {
          return 0
        }
      })
      pollDateTimeOptions.filter((el, index, arr) => {
        return index === arr.indexOf(el)
      })
      this.setState({
        pollDateTimeOptions: pollDateTimeOptions
      })
    }
  }

  deleteDateTimeOption (option) {
    const filteredDateTimeOptions = this.state.pollDateTimeOptions.filter(item => {
      return item.date !== option.date || item.time !== option.time
    })
    this.setState({pollDateTimeOptions: filteredDateTimeOptions})
  }
  toggleShowBookSearch () {
    this.setState({
      showBookSearch: !this.state.showBookSearch
    })
  }

  render () {
    const pollDateTimeOptions = this.state.pollDateTimeOptions &&
      this.state.pollDateTimeOptions.map((option, index) => {
        return (<PollDateTimeOption key={index} onDelete={this.deleteDateTimeOption.bind(this, option)} dateTime={option} />)
      })

    let spinCfg = Object.assign({}, SPIN_CFG)
    spinCfg.lines = 12
    spinCfg.length = 5
    spinCfg.width = 2
    spinCfg.radius = 5
    spinCfg.color = '#fff'
    spinCfg.position = 'relative'

    let pollBookOptions = null
    pollBookOptions = this.state.pollBookOptions.map((bookOption, idx) => {
      const book = bookOption.book
      return (
        <div key={idx} className='selected-book poll col-sm-3'>
          <div className='row content'>
            <div className='wrap-image poll col-sm-10 col-sm-offset-1' style={{backgroundImage: `url(${book.image_url})`}}>
              <ImageItem className='image' image={book.image_url} description={book.title} />
            </div>
          </div>
          <div className='row content'>
            <button type='button' className='btn btn-default-corner btn-remove-book' onClick={this.removeBookOption.bind(this, book.title, book.author.name)}>Remove</button>
          </div>
        </div>
      )
    })

    return (
      <div className='create-poll-form'>
        <div className='main-form'>
          <FormMessage type='error' error={this.state.notifications.error} />
          <div className='col-sm-12'>
            <TextField type='text' name='pollTitle' value={this.state.pollTitle} error={this.state.notifications.pollTitle} maxLength='' placeholder='POLL TITLE' onChange={this.onChange.bind(this)} />
          </div>
          <div className='col-sm-12'>
            <TextArea name='pollNotes' value={this.state.pollNotes} error={this.state.notifications.pollNotes} maxLength='' placeholder='NOTES OR INSTRUCTIONS FOR THIS POLL (OPTIONAL)' className={'textarea'} onChange={this.onChange.bind(this)} />
          </div>
          <div className='col-sm-12'>
            <div className='form-group'>
              <Datetime className='form-custom ficon-calendar' closeOnSelect dateFormat='dddd, MMMM Do YYYY' onChange={this.onDateTimeChange.bind(this, 'pollDueDate')} inputProps={{'placeholder': 'POLL DUE DATE', 'name': 'pollDueDate'}} value={this.state.pollDueDate} />
              <FormMessage type='error' error={this.state.notifications.pollDueDate} />
            </div>
          </div>
        </div>
        <div className='main-form form-search-book'>
          <div className='col-sm-12'>
            <div className='form-group pl20'>
              <div className='checkbox-cus'>
                <input type='checkbox' value={this.state.isBookPoll} name='isBookPoll' id='isBookPoll' onChange={this.onChange.bind(this)} />
                <label className='input-label' htmlFor='isBookPoll'>add book selections to the poll</label>
              </div>
            </div>
            <div className='row'>
              { pollBookOptions }
            </div>
            <div className='row'>
              <FormMessage type='error' error={this.state.notifications.pollBookOptions} />
            </div>
            {
              this.state.isBookPoll && this.state.showBookSearch
              ? <div className='main-form form-search-book'>
                <form role='form' onSubmit={this.searchBook.bind(this)} noValidate>
                  <div className='form-search-book-content'>
                    <TextField type='text' name='bookName' value={this.state.bookName} error={this.state.notifications.bookName} icon='book' maxLength='75' placeholder='SEARCH BOOKS BY TITLE OR AUTHOR' onChange={this.onChange.bind(this)} />
                    <div className='button-search'>
                      <button type='submit' className='btn btn-default-corner' disabled={this.state.searching}>
                        { this.state.searching
                          ? <Spinner config={spinCfg} />
                          : <span className='ficon-search' />
                        }
                      </button>
                    </div>
                  </div>
                </form>
                <FormMessage type='error' error={this.state.notifications.book} />
                {
                  Object.getOwnPropertyNames(this.state.book).length === 0 && this.state.book.constructor === Object && this.state.searchResults.length
                  ? <div className='box-search-book'>
                    <FindBookResults currentUserId={this.props.currentUserId} onAfterAddBook={this.handleAfterAddBook.bind(this)} type='already-read-books' searchResults={this.state.searchResults} />
                  </div>
                  : null
                }
              </div>
              : null
            }
            {
              this.state.isBookPoll && !this.state.showBookSearch
              ? <div className='row text-center add-another-book'>
                <a className='btn btn-default-corner btn-cancel' onClick={this.toggleShowBookSearch.bind(this)}>Add another book</a>
              </div>
              : null
            }
            {
              this.state.isBookPoll && this.state.showBookSearch
              ? <div className='row text-center add-another-book'>
                <a className='btn btn-default-corner btn-cancel' onClick={this.toggleShowBookSearch.bind(this)}>Stop adding books</a>
              </div>
              : null
            }
          </div>
          <div className='col-sm-12'>
            <div className='form-group pl20'>
              <div className='checkbox-cus'>
                <input type='checkbox' value={this.state.isDateTimePoll} name='isDateTimePoll' id='isDateTimePoll' onChange={this.onChange.bind(this)} />
                <label className='input-label' htmlFor='isDateTimePoll'>add meeting date and time options to the poll</label>
              </div>
            </div>
            {
              this.state.isDateTimePoll
              ? <div className='row'>
                <div className='col-sm-5'>
                  <div className='form-group'>
                    <Datetime className='form-custom ficon-calendar' closeOnSelect timeFormat={false} dateFormat='dddd, MMMM Do YYYY' onChange={this.onDateTimeChange.bind(this, 'newDateOption')} inputProps={{'placeholder': 'MEETING DATE', 'name': 'newDateOption'}} value={this.state.newDateOption} />
                    <FormMessage type='error' error={this.state.notifications.newDateOption} />
                  </div>
                </div>
                <div className='col-sm-5'>
                  <div className='form-group'>
                    <Datetime className='form-custom ficon-time' dateFormat={false} closeOnSelect timeFormat='hh:mm A' onChange={this.onDateTimeChange.bind(this, 'newTimeOption')} inputProps={{'placeholder': 'MEETING TIME', 'name': 'newTimeOption'}} value={this.state.newTimeOption} />
                    <FormMessage type='error' error={this.state.notifications.newTimeOption} />
                  </div>
                </div>
                <div className='col-sm-2'>
                  <button type='button' className='btn btn-default-corner btn-remove-book' onClick={this.addDateTimeOption.bind(this)}>Add</button>
                </div>
              </div>
              : null
            }
            {
              this.state.isDateTimePoll &&
                this.state.pollDateTimeOptions.length
              ? pollDateTimeOptions
              : null
            }
          </div>
        </div>
        <div className='form-group button-group clearfix row main-form'>
          <button type='button' className='btn btn-default-corner btn-cancel col-md-3' onClick={this.redirectRoute.bind(this)}>Cancel</button>
          <button type='submit' className='btn btn-default-corner btn-create-poll col-md-4' data-tip data-for='global' data-event='click' ref='global' onClick={this.validate.bind(this)} disabled={this.props.creatingPoll}>
            {this.props.creatingPoll
            ? <Spinner config={spinCfg} />
            : `${this.props.label} poll`
            }
          </button>

          <ReactTooltip id='global' className='popup-create-meeting' aria-haspopup='true' role='example' place='top' type='light' effect='solid'
            getContent={[() =>
              <div className='popup-content'>
                <div className='heading'>
                  <h3 className='title'>Review poll submission</h3>
                </div>
                <p className='description'>Please review your inputs. When you're ready to submit, click below.</p>
                <div className='checkbox-cus'>
                  <input type='checkbox' value={this.state.isSendEmail} name='isSendEmail' checked={this.state.isSendEmail} id='isSendEmail' onChange={this.onChange.bind(this)} />
                  <label className='input-label' htmlFor='isSendEmail'>Send an email notification to my club</label>
                </div>
                <button type='button' className='btn btn-default-corner btn-cancel' onClick={this.closePopup.bind(this)}>Cancel</button>
                <button type='button' className='btn btn-default-corner btn-create-meeting' onClick={this.onSubmit.bind(this)} disabled={this.props.creatingPoll}>
                  { this.props.creatingPoll
                    ? <Spinner config={spinCfg} />
                    : 'Submit poll'
                  }
                </button>
              </div>
            ]}
          />
          { this.props.onDelete
            ? <div className='col-md-3'>
              <button type='button' className='btn btn-default-corner btn-delete-meeting' data-tip data-for='deleteMeetingTooltip' data-event='click' ref='deleteMeetingTooltip' onClick={this.validate.bind(this)} disabled={this.props.deletingPoll}>
                { this.props.deletingPoll
                ? <Spinner config={spinCfg} />
                : 'Delete poll'
                }
              </button>
              <ReactTooltip id='deleteMeetingTooltip' className='popup-create-meeting' aria-haspopup='true' role='example' place='top' type='light' effect='solid' >
                <div className='heading'>
                  <h3 className='title'>Are you sure you want to delete this poll?</h3>
                </div>
                <p className='description'>Once a poll is deleted, it's gone forever. When you're ready to delete, click below.</p>
                <button type='button' className='btn btn-default-corner btn-cancel' onClick={this.closeDeleteMeetingTooltip.bind(this)}>Cancel</button>
                <button type='button' className='btn btn-default-corner btn-delete-meeting' onClick={this.onDelete.bind(this)} disabled={this.props.deletingPoll}>
                  { this.props.deletingPoll
                    ? <Spinner config={spinCfg} />
                    : 'Delete poll'
                  }
                </button>
              </ReactTooltip>
            </div>
          : null }
        </div>
      </div>
    )
  }
}

CreatePollForm.propTypes = {
  currentUserId: PropTypes.number,
  clubId: PropTypes.string,
  creatingPoll: PropTypes.bool,
  creatingPollError: PropTypes.string,
  onSubmit: PropTypes.func,
  onDelete: PropTypes.func,
  poll: PropTypes.object
}

export default CreatePollForm
