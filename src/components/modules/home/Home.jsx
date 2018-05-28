import React from 'react';
import Banner from './Banner.jsx';
import MediaItem from './MediaItem.jsx';
import PopularBookItem from './PopularBookItem.jsx';
import SignupFooter from './SignupFooter.jsx';
import FeaturedBook from './FeaturedBook.jsx';
import PropTypes from 'prop-types';

class Home extends React.Component {
  constructor(props, context) {
    super(props, context);

    let _this = this;
  }

  componentDidMount() {
    // This is call only at client
  }

  render() {
    let list;
    list = (
      this.props.popularBooks && this.props.popularBooks.length > 0 && this.props.popularBooks.map(item => {
        return (
          <div className="slider-item" key={item.id}>
            <PopularBookItem 
              id={item.id} 
              image={item.image_url} 
              title={item.title} 
              author={item.author} />
          </div>
        );
      })
    );

    return (
      <div className="home-container">
        <div className="container-fluid">
          <div className="row">
            <Banner />
          </div>
          <div className="row">
            <div className="block-container how-it-work">
              <div className="center">
                <h4 className="block-title">HOW IT WORKS</h4>
                <ul className="list">
                  <li className="col-sm-4">
                    <MediaItem image="img-hiw-create-club.svg" description="Create Your Club - it's  easy!" />
                  </li>
                  <li className="col-sm-4">
                    <MediaItem image="img-hiw-invite-link.svg" description="Email the unique club invite link to your members" />
                  </li>
                  <li className="col-sm-4">
                    <MediaItem image="img-hiw-create-meeting.svg" description="Create a meeting to send invites and collect RSVPs" />
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="block-container popular-book">
              <div className="center">
                <h4 className="block-title">MOST POPULAR BOOKS ON BOOKCLUBZ</h4>
                <div className="slider-container">
                  <div className="slider-content">
                    {list}
                  </div>
                </div>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
          <div className="row">
            <div className="block-container block-features">
              <div className="center">
                <h4 className="block-title">BOOKCLUBZ FEATURES</h4>
                <ul className="list">
                  <li className="col-sm-4">
                    <MediaItem image="img-feature-1.svg" description="View all the books your club has read in one place" />
                  </li>
                  <li className="col-sm-4">
                    <MediaItem image="img-feature-2.svg" description="Manage your club membership online - no more email chains!" />
                  </li>
                  <li className="col-sm-4">
                    <MediaItem image="img-feature-3.svg" description="See what other book clubs are reading" />
                  </li>
                </ul>
                <ul className="list">
                  <li className="col-sm-2">
                  </li>
                  <li className="col-sm-4">
                    <MediaItem image="img-feature-4.svg" description="Poll your members to select books and meeting dates" />
                  </li>
                  <li className="col-sm-4">
                    <MediaItem image="img-feature-5.svg" description="Rate each book you read and save ratings" />
                  </li>
                  <li className="col-sm-2">
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="row">
            {
              this.props.featuredBook && this.props.featuredBook[0]
              ? <FeaturedBook book={this.props.featuredBook && this.props.featuredBook[0] ? this.props.featuredBook[0] : {}} />
              : null
            }
          </div>
          {
            <div className="row">
              <SignupFooter isAuth={this.props.isAuth} />
            </div>
          }
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  popularBooks: PropTypes.array,
  featuredBook: PropTypes.array,
  isAuth: PropTypes.bool
};

export default Home;
