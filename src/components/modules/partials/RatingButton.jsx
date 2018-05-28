import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import axios from 'axios';
import { API_URL } from 'constants/config';

class RatingButton extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      rating: this.props.rating || 0
    };

    this.options = [
      {value: 1, label: '1'},
      {value: 2, label: '2'},
      {value: 3, label: '3'},
      {value: 4, label: '4'},
      {value: 5, label: '5'},
      {value: 6, label: '6'},
      {value: 7, label: '7'},
      {value: 8, label: '8'},
      {value: 9, label: '9'},
      {value: 10, label: '10'}
    ];
  }

  ratingBook(data) {
    this.setState({
      rating: data.value
    });

    let params = {
      rating: data.value
    };

    axios({
      url: `${API_URL}/books/${this.props.id}/votes/`,
      method: 'PUT',
      data: params
    }).then(response => {
      alert('Rating successful.');

      if (typeof this.props.onChange === 'function') {
        this.props.onChange();
      }
    });
  }

  render() {
    return (
      <div className="rating-button">
        <div className="select-content rating">
          <span className="s-label">My rating:</span>
          <div className="select">
            <Select
              name="select-picker"
              value={this.state.rating}
              options={this.options}
              onChange={this.ratingBook.bind(this)}
              clearable={false}
              searchable={false}
              placeholder="---"
            />
          </div>
          <div className="clearfix"></div>
        </div>
      </div>
    );
  }
}

RatingButton.propTypes = {
  id: PropTypes.node,
  rating: PropTypes.number,
  onChange: PropTypes.func
};

export default RatingButton;
