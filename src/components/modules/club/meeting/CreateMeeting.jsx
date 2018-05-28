import React from 'react';
import { ImageItem } from 'partials';
import PropTypes from 'prop-types';
import ClubInfo from 'modules/club/ClubInfo.jsx';
import { TextField, FormMessage } from 'partials/forms';
import { SIDE_BAR } from 'constants/config';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import FindBookResults from 'modules/profile/FindBookResults.jsx';
import axios from 'axios';
import { API_URL } from 'constants/config';
import {findDOMNode} from 'react-dom';
import Datetime from 'react-datetime';
import style from 'react-datetime/css/react-datetime.css';
import moment from 'moment';
import ReactTooltip from 'react-tooltip';
import Spinner from 'react-tiny-spin';
// import CreateMeetingForm from './CreateMeetingForm.jsx';

class CreateMeeting extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      clubId: this.props.clubId,
      meetingDate: null,
      meetingTime: null,
      meetingLocation: '',
      includeMeetingHost: false,
      hostId: '',
      isSendEmail: true,
      note: '',
      book: {},
      bookName: '',
      searchResults: [],
      options: [],
      notifications: {},
      submitting: false,
      searching: false
    };
  }

  onChange(e) {
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    if (!!this.state.notifications[e.target.name]) {
      let notifications = Object.assign({}, this.state.notifications);
      delete notifications[e.target.name];
      delete notifications['error'];
      this.setState({
        [e.target.name]: value,
        notifications
      });
    } else {
      this.setState({
        [e.target.name]: value,
      });
    }
  }

  onDateTimeChange(name, value) {
    if (!!this.state.notifications[name]) {
      let notifications = Object.assign({}, this.state.notifications);
      delete notifications[name];
      delete notifications['error'];
      this.setState({
        [name]: moment(value),
        notifications
      });
    } else {
      this.setState({
        [name]: moment(value)
      });
    }
  }

  searchBook(e) {
    e.preventDefault();

    this.removeSelectedBook();

    let notifications = {};

    let keyword = this.state.bookName;

    if (keyword.length < 2) {
      notifications.bookName = 'You must enter more than two characters to search for a book.';

      this.setState({notifications});

      return;
    }

    this.setState({
      searching: true
    });

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
      let notifications = {};
      notifications.bookName = 'Your search was too specific and didn\'t return any results. Please try a simpler set of search terms.';
      this.setState({
        searchResults: [],
        searching: false,
        notifications
      });
    })
  }

  handleAfterAddBook(item) {
    this.setState({
      bookName: '',
      book: item,
      notifications: {}
    });
  }

  removeSelectedBook() {
    this.setState({
      book: {},
      searchResults: []
    });
  }

  redirectRoute(e) {
    e.preventDefault();

    window.location = `/clubs/${this.state.clubId}/meetings`;
  }

  formatOption(array) {
    let options = [];

    for (var i = 0; i < array.length; i++) {
      options.push({
        value: array[i].id,
        label: array[i].name || array[i].email
      });
    }

    return options;
  }

  getHosts() {
    axios({
      url: `${API_URL}/clubs/${this.state.clubId}/members/`,
      method: 'GET'
    }).then(response => {
      if (response && response.data) {
        this.setState({
          options: this.formatOption(
            response.data.results.sort((a, b) => {
              let aName = a.name || a.email;
              let bName = b.name || b.email;
              if (aName.toLowerCase() < bName.toLowerCase()) return -1;
              if (aName.toLowerCase() > bName.toLowerCase()) return 1;
              return 0;
            }))
        }, () => {
          this.setState({
            hostId: this.state.options[0].value
          })
        })
      }
    });
  }

  selectHost(item) {
    this.setState({
      hostId: item.value
    })
  }

  validate() {
    let notifications = {};
    let meetingDate = this.state.meetingDate;
    let meetingTime = this.state.meetingTime;
    let book = this.state.book;

    if (!meetingDate && meetingTime) {
      notifications.meetingTime = "You can't set a meeting time without a meeting date";
    }

    if (Object.getOwnPropertyNames(book).length === 0 && book.constructor === Object && !meetingDate) {
      const errorMessage = "You must set either a book or a date for your meeting."
      notifications.meetingDate = errorMessage;
      notifications.book = errorMessage;
    }
    if (Object.getOwnPropertyNames(notifications).length !== 0 && notifications.constructor === Object) {
      this.setState({ notifications });
      return false;
    }

    return true;
  }

  onSubmit(e) {
    e.preventDefault();

    if (this.validate()) {
      this.setState({submitting: true});
      // Hiding the tooltip is a temporary solution. Currently the tooltip's state
      // will not update dynamically. To be fixed via this PR:
      // https://github.com/wwayne/react-tooltip/pull/281
      ReactTooltip.hide(findDOMNode(this.refs.global));
      let date = null;
      let time_set = false;
      if (this.state.meetingDate) {
        date = moment(this.state.meetingDate).format('YYYY-MM-DD');
        if (this.state.meetingTime) {
          const time = moment(this.state.meetingTime).format('HH:mm');
          date = moment.utc(`${date} ${time}`).toISOString();
          time_set = true;
        } else {
          date = moment.utc(date).toISOString();
        }
      }

      let book = this.state.book;
      if (Object.getOwnPropertyNames(book).length === 0 && book.constructor === Object) {
        book = null;
      } else {
        book = {
          author: {
            name: this.state.book.author.name
          },
          image_url: this.state.book.image_url,
          title: this.state.book.title,
          url: this.state.book.url
        };
      }

      let params = {
        book: book,
        date: date,
        host_id: this.state.includeMeetingHost ? this.state.hostId || this.state.options[0].value : '',
        location: this.state.meetingLocation,
        notes: this.state.note,
        creator_id: this.props.currentUserId,
        include_in_already_read: false,
        book_only: false,
        time_set: time_set,
        email_club: this.state.isSendEmail
      };

      axios({
        url: `${API_URL}/clubs/${this.state.clubId}/meetings/`,
        method: 'POST',
        data: params
      }).then(response => {
        if (response && response.data) {
          this.setState({submitting: false});
          window.location = `/clubs/${this.state.clubId}/meetings`;
        }
      }).catch(errors => {
        let notifications = {};
        notifications.error = 'Cannot create the meeting. Please try again.';
        this.setState({
          submitting: false,
          notifications
        });
      })
    } else {
      this.setState({submitting: false});
      ReactTooltip.hide(findDOMNode(this.refs.global));
    }
  }

  closePopup() {
    ReactTooltip.hide(findDOMNode(this.refs.global));
  }

  componentDidMount() {
    this.getHosts();
  }

  render() {
    const spinCfg = {
      lines: 12, // The number of lines to draw
      length: 5, // The length of each line
      width: 2, // The line thickness
      radius: 5, // The radius of the inner circle
      scale: 1, // Scales overall size of the spinner
      corners: 1, // Corner roundness (0..1)
      color: '#fff', // #rgb or #rrggbb or array of colors
      opacity: 0.25, // Opacity of the lines
      rotate: 0, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      speed: 1, // Rounds per second
      trail: 60, // Afterglow percentage
      fps: 20, // Frames per second when using setTimeout() as a fallback in IE 9
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      className: 'spinner', // The CSS class to assign to the spinner
      top: '50%', // Top position relative to parent
      left: '50%', // Left position relative to parent
      shadow: false, // Whether to render a shadow
      position: 'relative' // Element positioning
    };
    return (
      <div className="profile-container create-meeting-container">
        <div className="container-fluid">
          <div className="row">
            <div className="center">
              <div className="left-container">
                <ClubInfo clubId={this.state.clubId} active={SIDE_BAR.MEETINGS} currentUserId={this.props.currentUserId} />
              </div>
              <div className="right-container">
                <div className="block-container">
                  <div className="block-content create-meeting-content">
                    <h3 className="block-title">Create a new meeting</h3>
                    <div className="create-meeting-form">
                      <div className="main-form">
                        <FormMessage type="error" error={this.state.notifications.error} />
                        <div className="col-sm-6">
                          <div className="form-group">
                            <Datetime className="form-custom ficon-calendar" closeOnSelect={true} timeFormat={false} dateFormat="dddd, MMMM Do YYYY" onChange={this.onDateTimeChange.bind(this, 'meetingDate')} inputProps={{"placeholder": "MEETING DATE", "name": "meetingDate"}} value={this.state.meetingDate} />
                            <FormMessage type="error" error={this.state.notifications.meetingDate} />
                          </div>
                        </div>
                        <div className="col-sm-6">
                          <div className="form-group">
                            <Datetime className="form-custom ficon-time" closeOnSelect={true} dateFormat={false} timeFormat="hh:mm A" onChange={this.onDateTimeChange.bind(this, 'meetingTime')} inputProps={{"placeholder": "MEETING TIME", "name": "meetingTime"}} value={this.state.meetingTime} />
                            <FormMessage type="error" error={this.state.notifications.meetingTime} />
                          </div>
                        </div>
                        <div className="col-sm-12">
                          <TextField type="text" name="meetingLocation" value={this.state.meetingLocation} error={this.state.notifications.meetingLocation} icon="location" maxLength="" placeholder="MEETING LOCATION" onChange={this.onChange.bind(this)} />
                        </div>
                        <div className="col-sm-12">
                          <div className="form-group pl20">
                            <div className="checkbox-cus">
                              <input type="checkbox" value={this.state.includeMeetingHost} name="includeMeetingHost" id="includeMeetingHost" onChange={this.onChange.bind(this)} />
                              <label className="input-label" htmlFor="includeMeetingHost">include meeting host</label>
                            </div>
                          </div>
                          {
                            this.state.includeMeetingHost
                            ? <div className="form-group">
                                <Select
                                  name="selectHost"
                                  value={this.state.hostId}
                                  onChange={this.selectHost.bind(this)}
                                  options={this.state.options}
                                  clearable={false}
                                  searchable={false}
                                />
                              </div>
                            : null
                          }
                        </div>
                        <div className="col-sm-12">
                          <div className="form-group textarea">
                            <textarea placeholder="Note to the group" name="note" className="form-control" value={this.state.note} onChange={this.onChange.bind(this)}></textarea>
                            <FormMessage type="error" error={this.state.notifications.note} />
                          </div>
                        </div>
                      </div>
                      <div className="main-form form-search-book">
                        <form role="form" onSubmit={this.searchBook.bind(this)} noValidate>
                          <div className="form-search-book-content">
                            <TextField type="text" name="bookName" value={this.state.bookName} error={this.state.notifications.bookName} icon="book" maxLength="75" placeholder="SEARCH BOOKS BY TITLE OR AUTHOR" onChange={this.onChange.bind(this)} />
                            <div className="button-search">
                              <button type="submit" className="btn btn-default-corner" disabled={this.state.searching}>
                                { this.state.searching
                                  ? <Spinner config={spinCfg} />
                                  : <span className="ficon-search" />
                                }
                              </button>
                            </div>
                          </div>
                        </form>
                        <FormMessage type="error" error={this.state.notifications.book} />
                        {
                          Object.getOwnPropertyNames(this.state.book).length === 0 && this.state.book.constructor === Object && this.state.searchResults.length
                          ? <div className="box-search-book">
                              <FindBookResults currentUserId={this.props.currentUserId} onAfterAddBook={this.handleAfterAddBook.bind(this)} type="already-read-books" searchResults={this.state.searchResults} />
                            </div>
                          : null
                        }
                      </div>
                      {
                        Object.getOwnPropertyNames(this.state.book).length !== 0 && this.state.book.constructor === Object
                        ? <div className="selected-book">
                            <div className="content">
                              <div className="wrap-image" style={{backgroundImage: `url(${this.state.book.image_url})`}}>
                                <ImageItem className="image" image={this.state.book.image_url} description={this.state.book.title} />
                              </div>
                              <div className="info">
                                <h5 className="title">{this.state.book.title}</h5>
                                <p className="author">By {this.state.book.author.name}</p>
                                <a href={this.state.book.url}><span className="ficon-amazon"></span></a>
                                <button type="button" className="btn btn-default-corner btn-remove-book" onClick={this.removeSelectedBook.bind(this)}>Remove</button>
                              </div>
                            </div>
                            <div className="clearfix" />
                          </div>
                        : null
                      }
                      <div className="form-group button-group clearfix">
                        <button type="button" className="btn btn-default-corner btn-cancel" onClick={this.redirectRoute.bind(this)}>Cancel</button>
                        <button type="submit" className="btn btn-default-corner btn-create-meeting" data-tip data-for="global" data-event="click" ref="global" onClick={this.validate.bind(this)} disabled={this.state.submitting}>
                        {this.state.submitting
                        ? <Spinner config={spinCfg} />
                        : "Create meeting"
                        }
                        </button>

                        <ReactTooltip id="global" className="popup-create-meeting" aria-haspopup="true" role="example" place="top" type="light" effect="solid"
                          getContent={[() =>
                            <div className="popup-content">
                              <div className="heading">
                                <h3 className="title">Review meeting submission</h3>
                              </div>
                              <p className="description">Please review your inputs. When you're ready to submit, click below.</p>
                              <div className="checkbox-cus">
                                <input type="checkbox" value={this.state.isSendEmail} name="isSendEmail" checked={this.state.isSendEmail} id="isSendEmail" onChange={this.onChange.bind(this)} />
                                <label className="input-label" htmlFor="isSendEmail">Send an email notification to my club</label>
                              </div>
                              <button type="button" className="btn btn-default-corner btn-cancel" onClick={this.closePopup.bind(this)}>Cancel</button>
                              <button type="button" className="btn btn-default-corner btn-create-meeting" onClick={this.onSubmit.bind(this)} disabled={this.state.submitting}>
                                { this.state.submitting
                                  ? <Spinner config={spinCfg} />
                                  : "Submit meeting"
                                }
                              </button>
                            </div>
                          ]}
                        />
                      </div>
                    </div>
                  </div>
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

CreateMeeting.propTypes = {
  currentUserId: PropTypes.node,
  clubId: PropTypes.node
};

export default CreateMeeting;
