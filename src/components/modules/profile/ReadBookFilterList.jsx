import React from 'react';
import { ImageItem } from 'partials';
import PropTypes from 'prop-types';
import BookFilterGroup from './BookFilterGroup.jsx';

class ReadBookFilterList extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      bookList: this.props.bookList,
      filterList: []
    };
  }

  handleData() {
    let array = [];
    this.state.bookList.map(item => {
      let title = item.book.title.toLowerCase();
      const words = title.split(" ");

      if (words.length > 1) {
        if (words[0] == 'a' || words[0] == 'the' || words[0] == 'an') {
          title = words.splice(1).join("");
        }
      }

      const char = title.charAt(0).toUpperCase();

      if (array.length <= 0) {
        array.push({
          title: char,
          books: [item]
        });
      } else {
        let check = false;

        array.map(arrItem => {
          if (arrItem.title === char) {
            let tmpArr = arrItem.books;
            tmpArr.push(item);
            arrItem.books = tmpArr;
            check = true;
          }
        });
        if (!check) {
          array.push({
            title: char,
            books: [item]
          });
        }
      }
    });

    return array;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      bookList: nextProps.bookList
    })
  }

  render() {
    let bookList = this.handleData();

    let renderBookList = bookList.sort((a, b) => {return a.title < b.title ? -1 : (a.title > b.title ? 1 : 0)}).map(item => {
      return (
        <BookFilterGroup 
          key={item.title} 
          data={item} 
          onAfterDeleteBook={this.props.onAfterDeleteBook}
          members={item.members || null} />
      );
    });

    return (
      <div className="book-list-content">
        { renderBookList }
      </div>
    );
  }
}

ReadBookFilterList.propTypes = {
  bookList: PropTypes.array
};

export default ReadBookFilterList;
