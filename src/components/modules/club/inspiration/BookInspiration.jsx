import React from 'react';
import { ImageItem, BlockHeader } from 'partials';
import ClubInfo from 'modules/club/ClubInfo.jsx';
import PropTypes from 'prop-types';
import { API_URL, SIDE_BAR, SPIN_CFG } from 'constants/config';
import ReadBookFilterList from 'modules/profile/ReadBookFilterList.jsx';
import Spinner from 'react-tiny-spin';
import * as actions from 'actions/inspirations'

class BookInspiration extends React.Component {
  constructor(props, context) {
    super(props, context);
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

  componentDidMount() {
    // This is call only at client
    this.props.dispatch(actions.fetchBookInspirationsIfNeeded(this.props.clubId));
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

    return (
      <div className="profile-container book-list-container">
        <div className="container-fluid">
          <div className="row">
            <div className="center">
              <div className="left-container">
                <ClubInfo clubId={clubId} active={SIDE_BAR.INSPIRATION} currentUserId={currentUser.id} />
              </div>
              <div className="right-container">
                <div className="block-container">
                  <BlockHeader ficon="bookmark-2" title="BOOK INSPIRATION" number={count} type="book" link="javascript:void(0);" addText="" />
                  {
                    books && fetched
                    ? (
                        books.length > 0
                        ? <ReadBookFilterList bookList={books} />
                        : <div className="no-data pt50 pb50 bd0">
                            <ImageItem className="image" image="img-no-books.svg" type="local" />
                            <p>You have no books. <a href={`/profile/${currentUser.id}/want-to-read-books`} className="txt-link">Add books to your "want to read" shelf</a></p>
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

BookInspiration.propTypes = {
  clubId: PropTypes.node,
  currentUser: PropTypes.object,
  bookInspirationList: PropTypes.array,
  count: PropTypes.node
};

export default BookInspiration;
