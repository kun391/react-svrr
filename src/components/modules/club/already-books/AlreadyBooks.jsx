import React from 'react';
import { ImageItem, BlockHeader } from 'partials';
import ClubInfo from 'modules/club/ClubInfo.jsx';
import PropTypes from 'prop-types';
import { SIDE_BAR, API_URL, SPIN_CFG } from 'constants/config';
import ReadBookFilterList from 'modules/profile/ReadBookFilterList.jsx';
import SearchBox from 'modules/profile/SearchBox.jsx';
import FindBooks from 'modules/profile/FindBooks.jsx';
import Spinner from 'react-tiny-spin';
import * as actions from 'actions/clubs';

class AlreadyBooks extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false
    };
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
    this.props.dispatch(actions.fetchAlreadyBooks(this.props.clubId));
  }

  handleAfterDeleteBook(bookId) {
    this.props.dispatch(actions.deleteAlreadyReadBook(this.props.clubId, bookId));
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
    this.props.dispatch(actions.fetchAlreadyBooksIfNeeded(this.props.clubId));
  }

  render() {
    let spinCfg = Object.assign({}, SPIN_CFG);
    spinCfg.lines = 12;
    spinCfg.length = 15;
    spinCfg.width = 4;
    spinCfg.radius = 15;

    let list = this.renderChars().map(item => {
      return (
        <li key={item} className="item"><a href={`#title-${item}`} className="txt-link" onClick={this.scrollTarget.bind(this)}>{item}</a></li>
      );
    });

    const { currentUser, clubId, books, count, fetched } = this.props;
    const alreadyReadBooksEndpoint = `${API_URL}/clubs/${clubId}/meetings/`

    return (
      <div className="profile-container book-list-container">
        <div className="container-fluid">
          <div className="row">
            <div className="center">
              <div className="left-container">
                <ClubInfo clubId={clubId} active={SIDE_BAR.ALREADY_READ} currentUserId={currentUser.id} />
              </div>
              <div className="right-container">
                <div className="block-container">
                  <BlockHeader ficon="bookmark-2" title="BOOKS WE'VE READ" number={count} type="book" link="javascript:void(0);" addText="ADD A BOOK WE'VE READ" onToggle={this.toggleFindBox.bind(this)} />
                  {
                    this.state.show
                    ? <FindBooks
                      endpoint={alreadyReadBooksEndpoint}
                      currentUserId={currentUser.id}
                      currentClubId={clubId}
                      onAfterAddBook={this.handleAfterAddBook.bind(this)}
                      onToggle={this.toggleFindBox.bind(this)}
                      keyParam="clubs"
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
                    ? (
                        books.length > 0
                        ? <ReadBookFilterList
                          bookList={books}
                          onAfterDeleteBook={
                            this.handleAfterDeleteBook.bind(this)} />
                        : <div className="no-data pt50 pb50 bd0">
                            <ImageItem className="image" image="img-no-books.svg" type="local" />
                            <p>You have no books. <a href="#" className="txt-link" onClick={this.toggleFindBox.bind(this)}>Add A Book We've Read</a></p>
                          </div>
                      )
                    : <Spinner config={spinCfg} />
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
  clubId: PropTypes.node,
  currentUser: PropTypes.object,
  fetched: PropTypes.bool,
  count: PropTypes.number,
  books: PropTypes.array
};

export default AlreadyBooks;
