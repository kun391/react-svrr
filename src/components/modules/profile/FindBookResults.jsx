import React from 'react';
import { FormMessage } from 'partials/forms';
import PropTypes from 'prop-types';
import ReadBookItem from 'modules/profile/ReadBookItem.jsx';

class FindBookResults extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  handleAddBook(item) {
    this.props.onAfterAddBook(item);
  }

  render() {
    let searchResults = this.props.searchResults.map((item, index) => {
      return (
        <ReadBookItem 
          key={index} 
          id={null} 
          image={item.image_url} 
          title={item.title} 
          author={item.author} 
          onClick={this.handleAddBook.bind(this, item)} />
      );
    });

    return (
      <div className="search-results">
        <div className="block-list-book">
          <div className="main-form">
            <div className="form-group">
              <FormMessage type="success" error={this.props.success} />
            </div>
          </div>
          <div className="popular-book">
            <div className="slider-container">
              <div className="slider-content">
                { searchResults }
              </div>
            </div>
            <div className="clearfix"></div>
          </div>
        </div>
      </div>
    );
  }
}

FindBookResults.propTypes = {
  searchResults: PropTypes.array,
  onAfterAddBook: PropTypes.func
};

export default FindBookResults;
