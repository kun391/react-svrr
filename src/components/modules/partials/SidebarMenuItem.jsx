import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';

class SidebarMenuItem extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    // This is call only at client
  }

  render() {
    return (
      <li className="item">
        <Link to={this.props.link} className={this.props.activeClass}>{this.props.title}</Link>
        {
          this.props.number
          ? <span className="text-gray">{this.props.number < 2 ? `${this.props.number} book` : `${this.props.number} books`}</span>
          : null
        }
      </li>
    );
  }
}

SidebarMenuItem.propTypes = {
  activeClass: PropTypes.string,
  title: PropTypes.string,
  number: PropTypes.number,
  link: PropTypes.string
};

export default SidebarMenuItem;
