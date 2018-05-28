import React from 'react';
import { ImageItem } from 'partials';
import ProfileInfo from 'modules/profile/ProfileInfo.jsx';
import { TextField, FormMessage } from 'partials/forms';
import PropTypes from 'prop-types';
import { SIDE_BAR } from 'constants/config';
import axios from 'axios';
import { API_URL } from 'constants/config';

class AddBook extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      bookName: '',
      notifications: {}
    };
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();

    let notifications = {};

    axios({
      url: `https://bookclubz.com/amazon/?searchTerms=${this.state.bookName}`,
      method: 'GET'
    }).then(response => {
      if (response && response.data) {
        console.log(response);
      }
    });
  }

  componentDidMount() {
    // This is call only at client
  }

  render() {
    return (
      <div className="profile-container add-book-container">
        <div className="container-fluid">
          <div className="row">
            <div className="center">
              <div className="left-container">
                {/*<ProfileInfo currentUser={this.props.currentUser} active={null} />*/}
              </div>
              <div className="right-container">
                <div className="block-container">
                  <div className="add-book-content">
                    <h3 className="title">Add book</h3>
                    <form role="form" className="main-form" onSubmit={this.onSubmit.bind(this)} noValidate>
                      <TextField type="text" name="bookName" value={this.state.bookName} placeholder="Search by title or author" onChange={this.onChange.bind(this)} />
                      <button className="btn btn-default-corner btn-search">Search</button>
                    </form>
                    <div className="search-results">

                    </div>
                  </div>
                </div>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddBook.propTypes = {
  isAuth: PropTypes.bool,
  currentUser: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  userActions: PropTypes.object.isRequired
};

export default AddBook;
