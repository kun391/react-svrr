import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import moment from 'moment';

class SortBy extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.options = [
      {value: '/books', label: 'Most popular books of all time'},
      {value: '/top-rated-books', label: 'Top rated books of all time'}
    ]

    this.createObject(this.options);
  }

  changeRoute(opt) {
    window.location = opt.value;
  }

  createObject(array) {
    let today = new Date();
    let endDay = new Date('01/01/2016');

    for (var i = today.getFullYear(); i >= endDay.getFullYear(); i--) {
      for (var j = 12; j >= 1; j--) {
        if (i < today.getFullYear() || j <= today.getMonth() + 1) {
          array.push({
            value: `/most-popular-books/${j}/${i}`,
            label: `Most popular books from ${moment(j + '/01/' + i).format('MMMM')} ${i}`
          });
        }
      }
    }
  }

  render() {
    return (
      <div className="featured-books-sort-group">
        <div className="center">
          <div className="select-group-picker">
            <Select
              name="select-picker"
              value={this.props.link}
              options={this.options}
              onChange={this.changeRoute.bind(this)}
              clearable={false}
              searchable={false}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SortBy;
