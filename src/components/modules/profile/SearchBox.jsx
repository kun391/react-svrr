import React from 'react';
import { ImageItem, BlockHeader } from 'partials';
import ProfileInfo from 'modules/profile/ProfileInfo.jsx';
import { TextField, ToggleButton, FormMessage } from 'partials/forms';
import PropTypes from 'prop-types';
import cookie from 'react-cookie';
import { SIDE_BAR } from 'constants/config';
import axios from 'axios';
import { API_URL } from 'constants/config';
import ReadBookFilterList from 'modules/profile/ReadBookFilterList.jsx';

class AlreadyBooks extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      keyword: ''
    };
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    }, () => {
      this.props.onSearch(this.state.keyword);
    });

  }

  onSubmit(e) {
    e.preventDefault();
  }

  componentDidMount() {
    // This is call only at client
  }

  render() {
    return (
      <div className="header-toolbar">
        {/*<div className="top">
          <button className="btn btn-transparent btn-default-corner btn-download-list"><span className="ficon-download"></span>DOWNLOAD FULL LIST OF BOOKS</button>
          <div className="search-form">
            <form onSubmit={this.onSubmit.bind(this)} noValidate>
              <div className="input-search">
                <label className="ficon"><span className="ficon-search"></span></label>
                <input type="text" name="keyword" value={this.state.keyword} className="form-control" placeholder="SEARCH BOOKS BY TITLE OR AUTHOR" onChange={this.onChange.bind(this)} />
              </div>
            </form>
          </div>
        </div>*/}
        <div className="list-char-filter">
          <ul className="list">
            { this.props.list }
          </ul>
        </div>
      </div>
    );
  }
}

AlreadyBooks.propTypes = {
  currentUser: PropTypes.object,
  alreadyReadBooks: PropTypes.object
};

export default AlreadyBooks;
