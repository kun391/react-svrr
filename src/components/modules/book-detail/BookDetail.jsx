import React from 'react';
import { ImageItem, Rating, RatingButton } from 'partials';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API_URL } from 'constants/config';

class BookDetail extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      alreadyBook: false,
      wantToReadBook: false,
      memberRating: null,
      rating: null
    };
  }

  getListBook(type) {
    axios({
      url: `${API_URL}/members/${this.props.currentUser.id}/${type}/?limit=1000`,
      method: 'GET'
    }).then(response => {
      if (response.data && response.data.results) {
        let data = response.data.results;

        let bookItem = data.filter((item) => {
          return item.book.id === this.props.detail.id;
        });

        if (type === 'already-read-books' && bookItem.length) {
          this.setState({
            memberRating: bookItem[0].member_rating,
            alreadyBook: true
          });
        }
        if (type === 'want-to-read-books' && bookItem.length) {
          this.setState({
            memberRating: bookItem[0].member_rating,
            wantToReadBook: true
          });
        }
      }
    });
  }

  handleRemoveBook(type) {
    axios({
      url: `${API_URL}/members/${this.props.currentUser.id}/${type}/${this.props.detail.id}/`,
      method: 'DELETE'
    }).then(response => {
      if (type === 'already-read-books') {
        this.setState({
          alreadyBook: false
        });
      }

      if (type === 'want-to-read-books') {
        this.setState({
          wantToReadBook: false
        });
      }
    });
  }

  handleGetBook() {
    axios({
      url: `${API_URL}/books/${this.props.detail.id}/`,
      method: 'GET'
    }).then(response => {
      if (response && response.data) {
        this.setState({
          rating: response.data.get_average_rating
        })
      }
    });
  }

  handleAddBook(type) {
    let params = {
      book: {
        author: {
          name: this.props.detail.author.name
        },
        image_url: this.props.detail.image_url,
        title: this.props.detail.title,
        url: this.props.detail.url
      }
    };

    if (type === 'already-read-books') {
      params.already_read = true;
    }

    if (type === 'want-to-read-books') {
      params.want_to_read = true;
    }

    axios({
      url: `${API_URL}/members/${this.props.currentUser.id}/${type}/`,
      method: 'POST',
      data: params
    }).then(() => {
      if (type === 'already-read-books') {
        this.setState({
          alreadyBook: true
        });
      }

      if (type === 'want-to-read-books') {
        this.setState({
          wantToReadBook: true
        });
      }
    })
  }

  handleBook(type) {
    if (type === 'already-read-books') {
      if (this.state.alreadyBook) {
        this.handleRemoveBook(type);
      } else {
        this.handleAddBook(type);
      }
    }

    if (type === 'want-to-read-books') {
      if (this.state.wantToReadBook) {
        this.handleRemoveBook(type);
      } else {
        this.handleAddBook(type);
      }
    }
  }

  componentDidMount() {
    // This is call only at client
    if (this.props.isAuth) {
      this.getListBook('already-read-books');
      this.getListBook('want-to-read-books');
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="bg-book-detail">
          <div className="bg-image" style={{backgroundImage: `url(${this.props.detail.image_url})`}} />
        </div>
        <div className="row">
          <div className="center">
            <div className="book-detail-content" itemscope="" itemtype="http://schema.org/Book">
              <div className="left-content">
                <div className="wrap-image">
                  <ImageItem image={this.props.detail.image_url} className="image" description={this.props.detail.title} itemProp="image" />
                </div>
                <a href={this.props.detail.amazon_url} className="btn btn-default-corner bg-black btn-buy-amazon"><span className="ficon ficon-amazon"></span>BUY IT ON AMAZON</a>
              </div>
              <div className="right-content">
                <div className="book-info">
                  <h3 className="book-title" itemProp="name">{this.props.detail.title}</h3>
                  <p className="author" itemProp="author" itemscope="" itemtype="http://schema.org/Person">by <span itemProp="name">{this.props.detail.author.name}</span></p>
                  <Rating rate={this.state.rating || this.props.detail.get_average_rating} icon="ficon-star" />
                  {
                    this.props.isAuth
                    ? <div className="group-action-button">
                        <button className="btn btn-default-corner btn-read" onClick={this.handleBook.bind(this, 'already-read-books')}><span className={`ficon ${this.state.alreadyBook ? 'ficon-checked' : 'ficon-bookmark'}`}></span>I'VE READ THIS</button>
                        <button className="btn btn-default-corner btn-want-read" onClick={this.handleBook.bind(this, 'want-to-read-books')}><span className={`ficon ${this.state.wantToReadBook ? 'ficon-checked' : 'ficon-star'}`}></span>I WANT TO READ THIS</button>
                        {
                          this.state.alreadyBook
                          ? <RatingButton rating={this.state.memberRating} id={this.props.detail.id} onChange={this.handleGetBook.bind(this)} />
                          : null
                        }
                      </div>
                    : null
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

BookDetail.propTypes = {
  currentUser: PropTypes.node,
  detail: PropTypes.object,
  isAuth: PropTypes.bool,
};

export default BookDetail;
