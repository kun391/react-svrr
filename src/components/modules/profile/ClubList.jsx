import React from 'react';
import PropTypes from 'prop-types';
import ClubItem from './ClubItem.jsx';

class ClubList extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    // This is call only at client
  }

  render() {
    let clubs = this.props.clubs.map(item => {
      return (
        <ClubItem currentUserId={this.props.currentUserId} key={item.id} image={item.avatar || 'club-avatar.jpg'} type={!item.avatar ? 'local' : ''} id={item.id} name={item.name} code={item.code} member={item.number_members} invitationLink={item.get_join_url} edit={this.props.edit} />
      );
    })
    return (
      <ul className="list">
        {clubs}
      </ul>
    );
  }
}

ClubList.propTypes = {
  clubs: PropTypes.array,
  currentUserId: PropTypes.node,
  edit: PropTypes.bool
};

export default ClubList;
