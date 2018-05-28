import React from 'react';
import { ImageItem } from 'partials';
import PropTypes from 'prop-types';
import formatRoute from 'base/helpers/helpers.js';

class BookFilterItem extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      bookList: this.props.data || {},
      removeToggled: false,
    };
    this.toggleRemove = this.toggleRemove.bind(this);
  }

  componentDidMount() {
    // This is call only at client
  }

  toggleRemove () {
    this.setState({ removeToggled: !this.state.removeToggled });
  }

  removeBook (id) {
    this.props.onAfterDeleteBook(id);
  }

  render() {
    return (
      <li className="item">
        <div className="image">
          <a href={`/books/${formatRoute(this.props.title, this.props.id)}`}>
            <ImageItem image={this.props.image} className="image" description={this.props.title} />
          </a>
        </div>
        <div className="content">
          <div className="title-author">
            <h5 className="book-title"><a href={`/books/${formatRoute(this.props.title, this.props.id)}`}>{this.props.title}</a></h5>
            { this.props.author && this.props.author.name ? 
              <p className="author">by {this.props.author.name}</p>
            :
            null 
            }
            { this.props.members
              ? <div className="list-member pt5">
                  <b>Members who selected this book</b>
                  {
                    this.props.members.map(item => {
                      return (
                        <p className="pt5" key={item.id}><ImageItem image={item && item.avatar ? item.avatar : 'avatar.jpg'} className="image" title="" description="" type={!item || !item.avatar ? 'local' : ''} />{item.name ? item.name : item.email}</p>
                      )
                    })
                  }
                </div>
              : null
            }
          </div>
          {
            this.props.onAfterDeleteBook
            ? !this.state.removeToggled
              ? <div onClick={this.toggleRemove} className="remove">
                  <i className="glyphicon glyphicon-minus-sign"></i>
                </div>
              :
                <div className='remove remove-toggled'>
                  <a className="btn btn-default-corner" onClick={this.removeBook.bind(this, this.props.id)}>Remove</a>
                  <a onClick={this.toggleRemove} className="btn btn-default-corner">Cancel</a>
                </div>
            : null
          }
        </div>
      </li>
    );
  }
}

BookFilterItem.propTypes = {
  id: PropTypes.node,
  name: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  author: PropTypes.object,
  isDeleting: PropTypes.bool
};

export default BookFilterItem;
