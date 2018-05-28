import React from 'react';
import { TextField, FormMessage } from 'partials/forms';
import PropTypes from 'prop-types';
import axios from 'axios';
import { API_URL } from 'constants/config';
import FindBookResults from 'modules/profile/FindBookResults.jsx';

class FindBooks extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      bookName: '',
      notifications: {},
      searchResults: []
    };
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  searchBook(e) {
    e.preventDefault();

    let notifications = {};

    let keyword = this.state.bookName;

    if (keyword.length < 2) {
      notifications.error = 'You must enter more than two characters to search for a book.';

      this.setState({notifications});

      return;
    } else {
      notifications.error = '';

      this.setState({notifications});
    }

    axios({
      url: `${API_URL}/books/search/?searchTerms=${keyword}`,
      method: 'GET'
    }).then(response => {
      if (response && response.data) {
        this.setState({
          searchResults: response.data
        })
      }
    }).catch(error => {
      let notifications = {};
      notifications.error = 'Your search was too specific and didn\'t return any results. Please try a simpler set of search terms.';
      this.setState({
        searchResults: [],
        notifications
      });
    })
  }

  handleAddBook(item) {
    let params = {
      book: {
        author: item.author,
        image_url: item.image_url,
        title: item.title,
        url: item.url
      }
    };


    if (this.props.keyParam) {
      // Adding a book to a club means creating a meeting with book_only=True.
      params.include_in_already_read = true;
      params.book_only = true;
    } else {
      // Otherwise, add a book to a user's profile.
      if (this.props.type === 'already-read-books') {
        params.already_read = true;
      }
      if (this.props.type === 'want-to-read-books') {
        params.want_to_read = true;
      }
    }

    axios({
      url: this.props.endpoint,
      method: 'POST',
      data: params
    }).then(response => {
      let notifications = {};
      notifications.success = 'You have added the book successfully.';
      this.setState({notifications});

      if (this.props.keyParam) {
        this.props.onAfterAddBook({book: response.data.book});
      } else {
        this.props.onAfterAddBook({book: response.data});
      }

      // TODO: This needs to be removed.
      setTimeout(() => {
        notifications.success = '';
        this.setState({notifications});
      }, 3000);
    });
  }

  handleToggle() {
    this.props.onToggle();
  }

  render() {
    return (
      <div className="search-book-container">
        <button className="btn btn-close-find-book" onClick={this.handleToggle.bind(this)} />
        <div className="search-book-form">
          <form role="form" className="main-form" onSubmit={this.searchBook.bind(this)} noValidate>
            <TextField type="text" name="bookName" value={this.state.bookName} placeholder="Search by title or author" onChange={this.onChange.bind(this)} />
            <button className="btn btn-default-corner btn-search">Search</button>
          </form>
        </div>
        {
          this.state.searchResults && this.state.searchResults.length > 0
          ? <FindBookResults onAfterAddBook={this.handleAddBook.bind(this)} searchResults={this.state.searchResults} success={this.state.notifications.success} />
          : <FormMessage type="error" error={this.state.notifications.error} />
        }
      </div>
    );
  }
}

FindBooks.propTypes = {
  currentUserId: PropTypes.node,
  handleToggle: PropTypes.func,
  onAddBook: PropTypes.func,
  type: PropTypes.string,
  keyParam: PropTypes.string
};

export default FindBooks;
