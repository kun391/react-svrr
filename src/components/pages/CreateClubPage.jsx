import React from 'react';
import { MasterLayout } from 'layout';
import { connect } from 'react-redux';
import { CreateClub } from 'modules/club';
import Promise from 'bluebird';
import PropTypes from 'prop-types';

class CreateClubPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      currentUser: this.props.currentUser
    };
  }

  handleUpdateState(currentUser) {
    this.setState({
      currentUser
    })
  }

  render() {
    return (
      <MasterLayout currentUser={this.state.currentUser}>
        <CreateClub currentUser={this.props.currentUser} onUpdateState={this.handleUpdateState.bind(this)} />
      </MasterLayout>
    );
  }
}

CreateClubPage.fetchData = function(options) {
  let data = {
    seo: {
      title: 'Create new club',
      description: '',
    }
  };
  return Promise.resolve(data);
}

CreateClubPage.propTypes = {
  currentUser: PropTypes.object
};

const bindStateToProps = state => {
  return {
    currentUser: state.auth ? state.auth.userInfo : null
  };
};

export default connect(bindStateToProps)(CreateClubPage);
