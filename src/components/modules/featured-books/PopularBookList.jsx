import React from 'react';
import BookItem from './BookItem.jsx';
import PropTypes from 'prop-types';

class PopularBookList extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let bookItem = this.props.books && this.props.books.map((item, index) => {
      return (
        <BookItem key={item.id} data={item} index={index} />
      );
    });
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="center">
            <div className="book-list-content">
              <ul className="list">
                {bookItem}
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

PopularBookList.propTypes = {
  books: PropTypes.array
};

export default PopularBookList;
