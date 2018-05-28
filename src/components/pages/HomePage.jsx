import React from 'react';
import { MasterLayout } from 'layout';
import { connect } from 'react-redux';
import Home from 'modules/home';
import Promise from 'bluebird';
import { Books } from 'api';
import PropTypes from 'prop-types';

class HomePage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="bg-homepage-fix">
        <MasterLayout classHeader="bg-transparent">
          <Home popularBooks={this.props.popularBooks} featuredBook={this.props.featuredBook} isAuth={this.props.isAuth} />
        </MasterLayout>
      </div>
    );
  }
}

HomePage.fetchData = function(options) {
  const {store} = options;
  const d = new Date();
  let m = d.getMonth() < 10 ? ('0'+(d.getMonth()+1)) : (d.getMonth()+1);
  let y = d.getFullYear();

  return Promise.all([
    store.dispatch(Books.actions.popularBooks({year: y, month: m, num_books: '5'})),
    store.dispatch(Books.actions.featuredBook())
  ]).spread(() => {
    let data = {
      seo: {
        title: 'Bookclubz: Manage your book club online and get reading recommendations from other bookclubs.',
        description: 'Bookclubz is a website to manage your book club events. Get reading recommedations, choose popular books, add members easily, and get meeting reminders and RSVP notifications for upcoming bookclub meetings.',
      }
    };
    return Promise.resolve(data);
  });
}

HomePage.propTypes = {
  popularBooks: PropTypes.array,
  featuredBook: PropTypes.array,
  isAuth: PropTypes.bool
};

const bindStateToProps = state => {
  return {
    popularBooks: state.popularBooks.data.data.results,
    featuredBook: state.featuredBook.data.data.results,
    isAuth: state.auth ? state.auth.isAuth : false
  }
}

export default connect(bindStateToProps)(HomePage);
