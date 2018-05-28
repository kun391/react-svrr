import * as types from 'constants/ActionTypes';

const initialState = {
  isFetching: false,
  fetched: false,
  count: 0,
  results: []
};

function clubAlreadyReadBooks(state = initialState, action = {}) {
  switch (action.type) {
    case types.REQUEST_ALREADY_READ_BOOKS:
      return Object.assign({}, state, {
        isFetching: true
      })
    case types.RECEIVE_ALREADY_READ_BOOKS:
      let books = [];
      for (let i = 0; i < action.books.length; i++) {
        let book = action.books[i];
        book.isDeleting = false;
        books.push({ book: book })
      }
      return Object.assign({}, state, {
        isFetching: false,
        fetched: true,
        count: action.count,
        results: books
      })
    case types.DELETE_ALREADY_READ_BOOK:
      return Object.assign({}, state, {results: state.results.map(bookObj =>
        bookObj.book.id === action.bookId
        ? Object.assign({}, bookObj, {book: Object.assign({}, bookObj.book, {isDeleting: true})})
        : bookObj
      )})
    case types.DELETE_ALREADY_READ_BOOK_SUCCESS:
      return Object.assign({}, state, {
        results: state.results.filter(obj => obj.book.id !== action.bookId)
      })
    case types.DELETE_ALREADY_READ_BOOK_FAILURE:
      return Object.assign({}, state, {results: state.results.map(bookObj =>
        bookObj.book.id === action.bookId
        ? Object.assign({}, bookObj, {book: Object.assign({}, bookObj.book, {isDeleting: false})})
        : bookObj
      )})
    default:
      return state
  }
}

function alreadyBooksByClubId(state = {}, action) {
  switch (action.type) {
    case types.REQUEST_ALREADY_READ_BOOKS:
      return Object.assign({}, state, {
        [action.clubId]: clubAlreadyReadBooks(state[action.clubId], action)
      })
    default:
      return state
  }
}

export { clubAlreadyReadBooks, alreadyBooksByClubId };
