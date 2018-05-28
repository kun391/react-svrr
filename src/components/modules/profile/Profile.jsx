import React from 'react';
import { ImageItem, BlockHeader } from 'partials';
import ProfileInfo from './ProfileInfo.jsx';
import ClubList from './ClubList.jsx';
import PropTypes from 'prop-types';
import ReadBookList from './ReadBookList.jsx'
import { SIDE_BAR, SPIN_CFG, BOOK_TYPES } from 'constants/config';
import Spinner from 'react-tiny-spin';
import * as memberActions from 'actions/members';
import * as clubActions from 'actions/clubs';

class Profile extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  handleBook(type) {
    this.props.dispatch(memberActions.fetchBooks(this.props.currentUser.id, BOOK_TYPES.ALREADY_READ));
    this.props.dispatch(memberActions.fetchBooks(this.props.currentUser.id, BOOK_TYPES.WANT_TO_READ));
  }

  componentDidMount() {
    // This is call only at client
    this.props.dispatch(clubActions.fetchClubsIfNeeded(this.props.currentUser.id));
    this.props.dispatch(memberActions.fetchBooksIfNeeded(this.props.currentUser.id, BOOK_TYPES.ALREADY_READ));
    this.props.dispatch(memberActions.fetchBooksIfNeeded(this.props.currentUser.id, BOOK_TYPES.WANT_TO_READ));
  }

  render() {
    const { currentUser, clubs, alreadyReadBooks, wantToReadBooks } = this.props;

    return (
      <div className="profile-container">
        <div className="container-fluid">
          <div className="row">
            <div className="center">
              <div className="left-container">
                <ProfileInfo currentUser={this.props.currentUser} active={SIDE_BAR.OVERVIEW} />
              </div>
              <div className="right-container">
                <div className="block-container">
                  <div className="block-content block-my-clubs">
                    <BlockHeader ficon="people" title="My clubs" number={clubs.count} type="club" link="/create-club" addText="ADD NEW CLUB" />
                    {
                      clubs && clubs.fetched
                      ? (
                          clubs.results.length > 0
                          ? <div className="list-club">
                              <ClubList clubs={clubs.results} currentUserId={this.props.currentUser.id} />
                              <div className="block-footer pt20">
                                <a href="/clubs" className="view-all-link">VIEW ALL CLUBS</a>
                              </div>
                            </div>
                          : <div className="no-data">
                              <ImageItem className="image" image="img-no-clubs-2.svg" type="local" />
                              <p>You haven't created clubs. <a href="/create-club" className="txt-link">Add New Club</a></p>
                            </div>
                        )
                      : <Spinner config={SPIN_CFG} />
                    }
                  </div>
                  <ReadBookList
                    readBookList={alreadyReadBooks}
                    title="BOOKS I'VE READ"
                    ficon="bookmark-2"
                    type="book"
                    createLink={`/profile/${currentUser.id}/already-read-books`}
                    addText="ADD A BOOK YOU'VE READ"
                    viewLink=""
                    currentUserId={currentUser.id}
                    showRating={true}
                    showActions={true}
                    onAfterHandleBook={this.handleBook.bind(this)}
                  />
                  <ReadBookList
                    readBookList={wantToReadBooks}
                    title="BOOKS I WANT TO READ"
                    ficon="star"
                    type="book"
                    createLink={`/profile/${currentUser.id}/want-to-read-books`}
                    addText="ADD A BOOK YOU WANT TO READ"
                    viewLink=""
                    currentUserId={currentUser.id}
                    noBookText="Add A Book You Want To Read"
                    showRating={false}
                    showActions={true}
                    onAfterHandleBook={this.handleBook.bind(this)}
                  />
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

Profile.propTypes = {
  currentUser: PropTypes.object,
  clubs: PropTypes.object,
  alreadyReadBooks: PropTypes.object,
  wantToReadBooks: PropTypes.object
};

export default Profile;
