import React from 'react';
import PropTypes from 'prop-types';
import SidebarMenuItem from './SidebarMenuItem.jsx';

class SidebarMenu extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    // This is call only at client
  }

  render() {
    return (
      <div className="list-user-menu">
        <ul className="list">
          {
            this.props.sidebar.map(item => {
              return (
                <SidebarMenuItem key={item.title} title={item.title} link={item.link} activeClass={item.activeClass} number={item.number} />
              )
            })
          }
        </ul>
      </div>
    );
  }
}

SidebarMenu.propTypes = {
  sidebar: PropTypes.array
};

export default SidebarMenu;
