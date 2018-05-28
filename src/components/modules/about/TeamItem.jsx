import React from 'react';
import { ImageItem } from 'partials';
import PropTypes from 'prop-types';

class TeamItem extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <li className="item">
        <div className="content">
          <ImageItem image={this.props.image} className="image" description={this.props.name} type="local" />
          <h5 className="name">{this.props.name}</h5>
          <p className="position">{this.props.position}</p>
          <div className="description">
            <div className="text" dangerouslySetInnerHTML={{__html: this.props.description}} />
            <span className="arrow-box bottom"></span>
          </div>
        </div>
      </li>
    );
  }
}

TeamItem.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  position: PropTypes.string,
  description: PropTypes.string
};

export default TeamItem;