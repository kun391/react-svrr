import React from 'react';
import { BlockHeader } from 'partials';
import NoClub from './NoClub.jsx';
import ClubList from 'modules/profile/ClubList.jsx';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { API_URL } from 'constants/config';
import axios from 'axios';

class Club extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      currentUserId: this.props.currentUserId,
      reqSuccess: false,
      clubs: []
    }
  }

  getClubs() {
    axios({
      url: `${API_URL}/clubs/`,
      method: 'GET'
    }).then(response => {
      if (response && response.data) {
        this.setState({
          clubs: response.data.results,
          reqSuccess: true
        });
      }
    }).catch(error => {
      this.setState({
        reqSuccess: true
      });
    });
  }

  componentDidMount() {
    // This is call only at client
    this.getClubs();
  }

  render() {
    return (
      <div className="club-list-container">
        <div className="container-fluid">
          <div className="row">
            <div className={classnames('center', {'bg-transparent': this.state.clubs.length <= 0})}>
              <div className="block-container">
                {
                  this.state.reqSuccess && this.state.clubs && this.state.clubs.length > 0
                  ? <div className="block-content block-my-clubs">
                      <BlockHeader ficon="people" title="My clubs" number={this.state.clubs.length} type="club" link="/create-club" addText="CREATE NEW CLUB" />
                      <div className="list-club">
                        <ClubList clubs={this.state.clubs} edit={true} />
                      </div>
                    </div>
                  : null
                }
                {
                  this.state.reqSuccess && this.state.clubs && this.state.clubs.length <= 0
                  ? <NoClub />
                  : null
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Club.propTypes = {
  currentUserId: PropTypes.node
};

export default Club;
