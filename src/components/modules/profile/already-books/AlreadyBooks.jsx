import React from 'react';
import { ImageItem, BlockHeader } from 'partials';
import ProfileInfo from 'modules/profile/ProfileInfo.jsx';
import PropTypes from 'prop-types';
import { API_URL, SIDE_BAR, SPIN_CFG, BOOK_TYPES } from 'constants/config';
import ReadBookFilterList from 'modules/profile/ReadBookFilterList.jsx';
import SearchBox from 'modules/profile/SearchBox.jsx';
import FindBooks from 'modules/profile/FindBooks.jsx';
import Spinner from 'react-tiny-spin';
import * as memberActions from 'actions/members';

class AlreadyBooks extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false,
      searchResults: []
    };
  }

  onChange(e) {
    let value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({
      [e.target.name]: value,
    });
  }

  renderChars() {
    let arr = [];
    for(let i = 65; i < 91; i++) {
      arr.push(String.fromCharCode(i));
    }

    return arr;
  }

  scrollTarget(e) {
    let target = $(e.target).attr('href');
    if ($(target).offset()) {
      $('html, body').animate({
        scrollTop: `${$(target).offset().top - 66}px`
      });
    }
  }

  toggleFindBox() {
    this.setState({
      show: !this.state.show
    })
  }

  handleAfterAddBook(data) {
    this.props.dispatch(memberActions.fetchBooks(this.props.currentUser.id, BOOK_TYPES.ALREADY_READ));
  }

  searchList(keyword) {
    let tmpList = [];

    this.props.alreadyReadBookList.map(item => {
      if (item.book.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1 || item.book.author.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
        tmpList.push(item);
      }
    });

    if (keyword) {
      this.setState({
        alreadyBooks: tmpList
      });
    } else {
      this.setState({
        alreadyBooks: this.props.alreadyReadBookList
      });
    }
  }

  componentDidMount() {
    // This is call only at client
    this.props.dispatch(memberActions.fetchBooksIfNeeded(this.props.currentUser.id, BOOK_TYPES.ALREADY_READ));
  }

  render() {
    let list = this.renderChars().map(item => {
      return (
        <li key={item} className="item"><a href={`#title-${item}`} className="txt-link" onClick={this.scrollTarget.bind(this)}>{item}</a></li>
      );
    });

    const { currentUser, books, count, fetched } = this.props;
    const alreadyReadBooksEndpoint = `${API_URL}/members/${currentUser.id}/already-read-books/`;

    return (
      <div className="profile-container book-list-container">
        <div className="container-fluid">
          <div className="row">
            <div className="center">
              <div className="left-container">
                <ProfileInfo currentUser={currentUser} active={SIDE_BAR.ALREADY_READ} />
              </div>
              <div className="right-container">
                <div className="block-container">
                  <BlockHeader ficon="bookmark-2" title="BOOKS I'VE READ" number={count} type="book" link="javascript:void(0);" addText="ADD A BOOK YOU'VE READ" onToggle={this.toggleFindBox.bind(this)} />
                  {
                    this.state.show
                    ? <FindBooks
                        endpoint={alreadyReadBooksEndpoint}
                        currentUserId={currentUser.id}
                        onAfterAddBook={this.handleAfterAddBook.bind(this)}
                        onToggle={this.toggleFindBox.bind(this)}
                        type="already-read-books"
                        already_read={true}
                        want_to_read={false} />
                    : null
                  }
                  {
                    books && (count > 0 || books.length > 0)
                    ? <SearchBox list={list} onSearch={this.searchList.bind(this)} />
                    : null
                  }
                  {
                    books && fetched
                    ? books.length > 0
                      ? <ReadBookFilterList bookList={books} />
                      : <div className='no-data pt50 pb50 bd0'>
                        <ImageItem className='image' image='img-no-books.svg' type='local' />
                        <p>You have no books. <a href='javascript:void(0);' className='txt-link' onClick={this.toggleFindBox.bind(this)}>Add A Book You've Read</a></p>
                      </div>
                    : <Spinner config={SPIN_CFG} />
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

AlreadyBooks.propTypes = {
  currentUser: PropTypes.object,
  fetched: PropTypes.bool,
  count: PropTypes.number,
  books: PropTypes.array
};

export default AlreadyBooks;
