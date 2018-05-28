import React from 'react';
import { ImageItem, BlockHeader } from 'partials';
import ReadBookItem from './ReadBookItem.jsx';
import PropTypes from 'prop-types';
import { SPIN_CFG } from 'constants/config';
import Spinner from 'react-tiny-spin';

class ReadBookList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      readBookList: this.props.readBookList || {}
    }
  }

  componentDidMount() {
    // This is call only at client
  }

  render() {
    let readBookList = this.props.readBookList && this.props.readBookList.results && this.props.readBookList.results.slice(0, 4).map(item => {
      return (
        <ReadBookItem
          key={ item.id }
          id={ item.book.id }
          currentUserId={ this.props.currentUserId }
          image={ item.book.image_url }
          url={ item.book.url }
          title={ item.book.title }
          author={ item.book.author }
          memberRating={ item.member_rating }
          showRating={ this.props.showRating }
          showActions={ this.props.showActions }
          wantToRead={ item.want_to_read }
          alreadyRead={ item.already_read }
          onAfterHandleBook={ this.props.onAfterHandleBook }
        />
      );
    });

    return (
      <div className="block-content block-my-clubs block-list-book pt30">
        <BlockHeader ficon={ this.props.ficon } title={ this.props.title } number={ this.state.readBookList.count } type={ this.props.type } link={ this.props.createLink } addText={ this.props.addText } />
        {
          this.props.readBookList.fetched
          ? (
              this.props.readBookList && this.props.readBookList.results && this.props.readBookList.results.length > 0
              ? <div className="popular-book-content">
                  <div className="popular-book">
                    <div className="slider-container">
                      <div className="slider-content">
                        { readBookList }
                      </div>
                    </div>
                    <div className="clearfix"></div>
                  </div>
                  <div className="block-footer pt20">
                    <a href={ this.props.createLink } className="view-all-link">VIEW ALL BOOKS</a>
                  </div>
                </div>
              : <div className="no-data">
                  <ImageItem className="image" image="img-no-books.svg" type="local" />
                  <p>You have no books. <a href={ this.props.createLink } className="txt-link">{ this.props.noBookText }</a></p>
                </div>
            )
          : <Spinner config={SPIN_CFG} />
        }
      </div>
    );
  }
}

ReadBookList.propTypes = {
  currentUserId: PropTypes.node,
  readBookList: PropTypes.object,
  title: PropTypes.string,
  ficon: PropTypes.string,
  type: PropTypes.string,
  createLink: PropTypes.string,
  addText: PropTypes.string,
  viewLink: PropTypes.string,
  noBookText: PropTypes.string,
  showRating: PropTypes.bool,
  showActions: PropTypes.bool,
  onAfterHandleBook: PropTypes.func
};

export default ReadBookList;
