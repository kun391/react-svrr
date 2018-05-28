import React from 'react';
import { connect } from 'react-redux';
import { MasterLayout } from 'layout';
import BookDetail from 'modules/book-detail';
import Promise from 'bluebird';
import { Books } from 'api';
import PropTypes from 'prop-types';

class BookDetailPage extends React.Component {
  render() {
    return (
      <MasterLayout>
        <div className="book-detail-container">
          <BookDetail currentUser={this.props.currentUser} detail={this.props.detail} isAuth={this.props.isAuth} />
        </div>
      </MasterLayout>
    );
  }
}

BookDetailPage.fetchData = function(options) {
  const {store, params} = options;

  let strId = params.id;
  let arrId = strId.split('-');
  let id = arrId[arrId.length - 1];

  return Promise.all([
    store.dispatch(Books.actions.bookDetail({id: id})),
    store.dispatch(Books.actions.featuredBook())
  ]).spread((detail) => {
    let data = {
      seo: {
        title: detail.data.title + ' by ' + detail.data.author.name,
        description: detail.data.title + ' by ' + detail.data.author.name + ' on Bookclubz, the website for organizing a bookclub',
        image: detail.data.image_url
      }
    };
    return Promise.resolve(data);
  });
}

BookDetailPage.propTypes = {
  detail: PropTypes.object,
  currentUser: PropTypes.node,
  isAuth: PropTypes.bool
};

const bindStateToProps = state => {
  return {
    detail: state.bookDetail.data.data,
    currentUser: state.auth ? state.auth.userInfo : null,
    isAuth: state.auth ? state.auth.isAuth : false
  }
}

export default connect(bindStateToProps)(BookDetailPage);
