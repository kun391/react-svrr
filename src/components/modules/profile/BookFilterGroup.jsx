import React from 'react';
import PropTypes from 'prop-types';
import BookFilterItem from './BookFilterItem.jsx';

class BookFilterGroup extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    // This is call only at client
  }

  render() {
    let bookItem = this.props.data.books.map(item => {
      return (
        <BookFilterItem 
          key={item.book.id} 
          id={item.book.id} 
          isDeleting={item.book.isDeleting}
          title={item.book.title} 
          image={item.book.image_url} 
          author={item.book.author} 
          onAfterDeleteBook={this.props.onAfterDeleteBook}
          members={item.members || null} />
      );
    });

    return (
      <div className="book-group-name">
        <h4 className="block-title" id={`title-${this.props.data.title}`}>{this.props.data.title}</h4>
        <ul className="list">
          { bookItem }
        </ul>
      </div>
    );
  }
}

BookFilterGroup.propTypes = {
  data: PropTypes.object
};

export default BookFilterGroup;
