import React from 'react';
import { ImageItem } from 'partials';
import PropTypes from 'prop-types';

class NoClub extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="no-clubs">
        <div className="no-clubs-content">
          <ImageItem image="img-no-clubs.svg" className="image" type="local" />
          <h4 className="title">MY CLUBS</h4>
          <p className="description">You haven't created clubs.</p>
          <div className="form-group button-group">
            <a href="/create-club" className="btn btn-default-corner btn-create-new-club">Create a club</a>
          </div>
        </div>
      </div>
    );
  }
}

NoClub.propTypes = {
  currentUserId: PropTypes.node
};

export default NoClub;
