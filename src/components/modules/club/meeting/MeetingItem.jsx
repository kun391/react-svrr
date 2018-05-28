import React from 'react';
import { ImageItem } from 'partials';
import PropTypes from 'prop-types';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import axios from 'axios';
import { API_URL } from 'constants/config';
import moment from 'moment';
import formatRoute from 'base/helpers/helpers.js';
import RsvpItem from './RsvpItem.jsx';
import * as actions from 'actions/meetings';
import Autolinker from 'autolinker';

class MeetingItem extends React.Component {
  constructor(props, context) {
    super(props, context);
    const vote = this.props.data.votes.find(vote => {
      return vote.member === this.props.currentUserId;
    })
    let rating = null;
    if (vote !== undefined) {
      rating = vote.rating;
    }

    this.state = {
      clubId: this.props.clubId,
      rating: rating,
      meetings: {},
      show: false,
      showRsvp: false
    };

    this.ratings = [
      {value: 1, label: '1'},
      {value: 2, label: '2'},
      {value: 3, label: '3'},
      {value: 4, label: '4'},
      {value: 5, label: '5'},
      {value: 6, label: '6'},
      {value: 7, label: '7'},
      {value: 8, label: '8'},
      {value: 9, label: '9'},
      {value: 10, label: '10'}
    ];

    this.rsvp = [
      {value: true, label: 'Yes'},
      {value: false, label: 'No'},
      {value: null, label: '---'}
    ]
  }

  ratingBook(data) {
    this.setState({
      rating: data.value
    });

    this.props.dispatch(actions.voteBook(this.props.data.book.id, data.value, this.props.clubId))
  }

  toggle() {
    this.setState({
      show: !this.state.show
    });
  }

  showRsvp() {
    this.setState({
      showRsvp: !this.state.showRsvp
    });
  }

  changeRsvp(id, item) {
    this.props.dispatch(actions.rsvp(item.value, id, this.props.clubId, this.props.data.id))
  }

  render() {
    let rsvpResponse = null;
    if (this.props.data.RSVPs) {
      const rsvp = this.props.data.RSVPs.find(rsvp => {
        return rsvp.member.id === this.props.currentUserId;
      });
      if (typeof rsvp !== 'undefined') {
        rsvpResponse = rsvp.response
      }
    }

    return (
      <li className="item">
        <div className="content">
          <div className="column calendar">
            {
              this.props.data.meeting_date
              ? <span className="date-group">
                  <span className="date">{moment(this.props.data.meeting_date).format('DD')}</span>
                  <span className="date">{moment(this.props.data.meeting_date).format('MMM')}</span>
                  <span className="year">{moment(this.props.data.meeting_date).format('YYYY')}</span>
                </span>
              : <span className="text">(No date.)</span>
            }
            {
              this.props.data.meeting_time
              ? <span className="time">{this.props.data.meeting_time}</span>
              : <span className="text">(No time.)</span>
            }
          </div>
          <div className="column book-image text-center">
            <div className="wrap-image">
              {
                this.props.data.book && this.props.data.book.image_url
                ? <a href={this.props.data.book.id ? `/books/${formatRoute(this.props.data.book.title, this.props.data.book.id)}` : `javascript:void(0);`} className="image-link">
                    <ImageItem image={this.props.data.book.image_url} />
                  </a>
                : <div className="wrap-add-book">
                    <a href={`/clubs/${this.props.clubId}/meetings/${this.props.data.id}`} className="btn-add-book ficon-add"></a>
                  </div>
              }
            </div>
            { this.props.data.book && this.props.data.book.amazon_url
            ? <a href={this.props.data.book.amazon_url} className='btn btn-default-corner btn-buy-it-on-amazon' target='_blank'>Buy it on Amazon</a>
            : null }
          </div>
          <div className="column book-description">
            <div className="topbar">
              {
                this.props.data.book_rating && typeof this.props.data.book_rating === 'number'
                ? <p className="rating">Rating: <span className="ficon-star"></span>{this.props.data.book_rating}</p>
                : <p className="rating"><span className="ficon-star"></span>{this.props.data.book_rating}</p>
              }
              {
                ((this.props.membership && this.props.membership.is_admin) || (this.props.currentUserId === this.props.data.creator.id) || (this.props.data.host && this.props.currentUserId === this.props.data.host.id))
                ? <a href={`/clubs/${this.props.clubId}/meetings/${this.props.data.id}`} className="btn btn-default-corner btn-edit-meeting">Edit</a>
                : null
              }
            </div>
            {
              this.props.data.book && this.props.data.book.id
              ? <div className="book-info pb10">
                  <h3 className="title"><a href={this.props.data.book.id ? `/books/${formatRoute(this.props.data.book.title, this.props.data.book.id)}` : `javascript:void(0);`}>{this.props.data.book.title}</a></h3>
                  <p className="author">By {this.props.data.book.author.name}</p>
                </div>
              : null
            }
            <p className="location pt0"><span className="ficon-location"></span>
              {
                this.props.data.location
                ? <span dangerouslySetInnerHTML={{__html: Autolinker.link(this.props.data.location, { stripPrefix: { scheme: false }}).replace(`\n`, `<br />`)}} />
                : '(No location selected yet.)'}
            </p>
            {
              this.props.host
              ? <p className="notes"><b>Host:</b> {this.props.host}</p>
              : null
            }
            <p className="notes"><b>Notes:</b> <span dangerouslySetInnerHTML={{__html: Autolinker.link(this.props.data.notes, { stripPrefix: { scheme: false }}).replace(`\n`, `<br />`)}} /></p>
            <div className="features">
              <div className="g-right pull-right">
                {
                  this.props.type !== 'past'
                  ? <div className="select-content rsvp">
                      <span className="s-label">My RSVP:</span>
                      <div className="select">
                        <Select
                          name="select-picker"
                          value={rsvpResponse}
                          options={this.rsvp}
                          onChange={this.changeRsvp.bind(this, this.props.currentUserId)}
                          clearable={false}
                          searchable={false}
                          placeholder="---"
                        />
                      </div>
                      <div className="clearfix"></div>
                    </div>
                  : null
                }
                {
                  this.props.data.book && this.props.data.book.id
                  ? <div className="select-content rating">
                      <span className="s-label">My Rating:</span>
                      <div className="select">
                        <Select
                          name="select-picker"
                          value={this.state.rating}
                          options={this.ratings}
                          onChange={this.ratingBook.bind(this)}
                          clearable={false}
                          searchable={false}
                          placeholder="---"
                        />
                      </div>
                      <div className="clearfix"></div>
                    </div>
                  : null
                }
              </div>
              <div className="attending pull-left">
                <span className="s-label ficon-people"></span>
                <a href="javascript:void(0);" className="link-attending" onClick={this.toggle.bind(this)}>{this.props.data.number_attending} people attending <span className="ficon-arrow-down" /></a>
                <div className="clearfix"></div>
              </div>
            </div>
            {
              this.state.show
              ? <div className="attending-content">
                  <table className="list-people">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th style={{'width': '150px'}}>RSVP</th>
                        <th>Rating</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        this.props.data.RSVPs && this.props.data.RSVPs.sort((a, b) => {
                          if (a.response < b.response) return 1;
                          if (a.response > b.response) return -1;
                          if (a.member.name > b.member.name) return 1;
                          if (a.member.name < b.member.name) return -1;
                          return 0;
                        }).map(rsvp => {
                          const memberPk = rsvp.member.id;
                          const vote = this.props.data.votes.find(
                            vote => vote.member === memberPk);
                          let response;
                          switch (rsvp.response) {
                            case null:
                              response = '----';
                              break;
                            case true:
                              response = 'Yes';
                              break;
                            case false:
                              response = 'No';
                          }

                          const data = {
                            rating: vote ? vote.rating : null,
                            pk: memberPk,
                            rsvp: response,
                            name: rsvp.member.name
                          };
                          return (
                            <RsvpItem
                              key={rsvp.id}
                              currentUserId={this.props.currentUserId}
                              member={this.props.membership}
                              meeting={this.props.data}
                              data={data}
                              type={this.props.type}
                              onRsvp={this.changeRsvp.bind(this)} />
                          );
                        })
                      }
                    </tbody>
                  </table>
                </div>
              : null
            }
          </div>
        </div>
        <div className="clearfix" />
      </li>
    );
  }
}

// TODO: specify the shape of MeetingItem.data
MeetingItem.propTypes = {
  currentUserId: PropTypes.node,
  host: PropTypes.node,
  clubId: PropTypes.node,
  data: PropTypes.object
};

export default MeetingItem;
