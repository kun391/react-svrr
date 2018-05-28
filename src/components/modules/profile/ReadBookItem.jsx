import React from 'react';
import PopularBookItem from 'modules/home/PopularBookItem.jsx';
import PropTypes from 'prop-types';
import { RatingButton } from 'modules/partials';
import axios from 'axios';
import { API_URL, SPIN_CFG } from 'constants/config';
import ReactTooltip from 'react-tooltip';
import Spinner from 'react-tiny-spin';

class ReadBookItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      alreadyReadProcessing: false,
      wantToReadProcessing: false
    }
  }

  handleRemoveBook(type) {
    if (type === 'already-read-books') {
      this.setState({ alreadyReadProcessing: true });
    }

    if (type === 'want-to-read-books') {
      this.setState({ wantToReadProcessing: true });
    }

    axios({
      url: `${API_URL}/members/${this.props.currentUserId}/${type}/${this.props.id}/`,
      method: 'DELETE'
    }).then(response => {
      this.setState({
        alreadyReadProcessing: false,
        wantToReadProcessing: false
      });

      this.props.onAfterHandleBook(type);
    });
  }

  handleAddBook(type) {
    let params = {
      book: {
        author: {
          name: this.props.author.name
        },
        image_url: this.props.image,
        title: this.props.title,
        url: this.props.url
      }
    };

    if (type === 'already-read-books') {
      params.already_read = true;
      this.setState({ alreadyReadProcessing: true });
    }

    if (type === 'want-to-read-books') {
      params.want_to_read = true;
      this.setState({ wantToReadProcessing: true });
    }


    axios({
      url: `${API_URL}/members/${this.props.currentUserId}/${type}/`,
      method: 'POST',
      data: params
    }).then(response => {
      this.setState({
        alreadyReadProcessing: false,
        wantToReadProcessing: false
      });
      this.props.onAfterHandleBook(type);
    }).catch(error => {
      this.setState({
        alreadyReadProcessing: false,
        wantToReadProcessing: false
      });
    });
  }

  componentDidMount() {
    // This is call only at client
  }

  render() {
    const spinCfg = Object.assign({}, SPIN_CFG);
    spinCfg.position = 'relative';
    spinCfg.lines = 8;
    spinCfg.length = 3;
    spinCfg.width = 2;
    spinCfg.radius = 3;

    return (
      <div className="slider-item">
        <div className="slider-box">
          {
            this.props.showActions
            ? <div className="action-box">
                <div className="content-box">
                  {
                    this.props.showRating
                    ? <RatingButton rating={ this.props.memberRating } id={this.props.id} />
                    : null
                  }
                  <div className="group-button">
                    {
                      this.props.alreadyRead
                      ? <button className="btn btn-default-corner" disabled={this.state.alreadyReadProcessing} onClick={this.handleRemoveBook.bind(this, 'already-read-books')}>
                          {
                            this.state.alreadyReadProcessing
                            ? <p><Spinner config={spinCfg} /></p>
                            : <p className="wrap">
                                <span className="ficon-checked pr5"></span>
                                I've read this
                              </p>
                          }
                        </button>
                      : <button className="btn btn-default-corner" disabled={this.state.alreadyReadProcessing} onClick={this.handleAddBook.bind(this, 'already-read-books')}>
                          {
                            this.state.alreadyReadProcessing
                            ? <Spinner config={spinCfg} />
                            : "I've read this"
                          }
                        </button>
                    }
                    {
                      this.props.wantToRead
                      ? <button className="btn btn-default-corner" disabled={this.state.wantToReadProcessing} onClick={this.handleRemoveBook.bind(this, 'want-to-read-books')}>
                          {
                            this.state.wantToReadProcessing
                            ? <p><Spinner config={spinCfg} /></p>
                            : <p className="wrap">
                                <span className="ficon-checked pr5" />
                                I want to read this
                              </p>
                          }

                        </button>
                      : <button className="btn btn-default-corner" disabled={this.state.wantToReadProcessing} onClick={this.handleAddBook.bind(this, 'want-to-read-books')}>
                          {
                            this.state.wantToReadProcessing
                            ? <Spinner config={spinCfg} />
                            : "I want to read this"
                          }
                        </button>
                    }
                  </div>
                </div>
              </div>
            : null
          }
          <PopularBookItem
            id={ this.props.id }
            image={ this.props.image }
            title={ this.props.title }
            author={ this.props.author }
            onClick={ this.props.onClick ? this.props.onClick : null }
          />
        </div>
      </div>
    );
  }
}

ReadBookItem.propTypes = {
  currentUserId: PropTypes.node,
  id: PropTypes.node,
  image: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.object,
  url: PropTypes.string,
  memberRating: PropTypes.number,
  showRating: PropTypes.bool,
  alreadyRead: PropTypes.bool,
  wantToRead: PropTypes.bool
};

export default ReadBookItem;
