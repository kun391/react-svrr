import React from 'react';
import { MasterLayout } from 'layout';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Members } from 'api';
import Promise from 'bluebird';
import { CreateClubSuccess } from 'modules/club';
import PropTypes from 'prop-types';

class ClubPage extends React.Component {
  render() {
    return (
      <MasterLayout>
        <CreateClubSuccess clubId={this.props.params.id} />
      </MasterLayout>
    );
  }
}

ClubPage.fetchData = function(options) {
  const { store, params, at } = options;

  let data = {
    seo: {
      title: 'My Clubs',
      description: '',
    }
  };

  return Promise.resolve(data);
}

ClubPage.propTypes = {
  currentUserId: PropTypes.object
};

const bindStateToProps = state => {
  return {
    currentUserId: state.auth ? state.auth.userInfo.id : null
  }
}

export default connect(bindStateToProps)(ClubPage);
