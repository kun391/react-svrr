import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import cookie from 'react-cookie';
import PropTypes from 'prop-types';
import { Members } from 'api';
import * as actions from 'actions/clubs';
import { Link } from 'react-router';

class Navbar extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      show: false
    }
  }

  toggleMenu() {
    this.setState({
      show: !this.state.show
    });

    let home = document.getElementsByTagName('body')[0];
    if (home.className === 'is-opend') {
      home.className = '';
    } else {
      home.className = 'is-opend';
    }
  }

  logout() {
    cookie.remove('accessToken', {path: '/'});
    cookie.remove('userInfo', {path: '/'});

    if (typeof window != "undefined") {
      if (window.location.pathname === '/') {
        location.reload();
      } else {
        window.location = '/';
      }
    }
  }

  componentDidMount() {
    // get club list
    if (this.props.isAuth) {
      this.props.dispatch(actions.fetchClubsIfNeeded(this.props.userInfo.id))
    }
  }

  render() {
    const { isAuth, userInfo, clubs } = this.props;

    return (
      <div className="nav-wrapper">
        <div className="header-group-button">
          <button id="bt-open-menu" className={`btn btn-open-menu lines-button x ${this.state.show ? `is-opend` : ''}`} onClick={this.toggleMenu.bind(this)}>
            <span className="lines" />
          </button>
        </div>
        {
          !isAuth
          ? <Link to="/signin" className={`btn-signin-rw ${this.state.show ? `is-opend` : ''}`}>Sign in</Link>
          : null
        }
        <div className={`nav-container ${this.state.show ? `is-opend` : ''}`}>
          {
            isAuth
            ? <ul className="nav navbar-nav navbar-user">
                <li className="m-item"><Link to={`/profile/${userInfo && userInfo.id ? userInfo.id : ''}`} className="m-link">My Profile</Link></li>
                {
                  clubs && clubs.length === 0
                  ? <li className="m-item">
                      <Link to={`/clubs`} className="m-link">My Clubs</Link>
                    </li>
                  : null
                }
                {
                  clubs && clubs.length === 1
                  ? <li className="m-item">
                      <Link to={`/clubs/${clubs[0].id}/meetings`} className="m-link">My Clubs</Link>
                    </li>
                  : null
                }
                {
                  clubs && clubs.length > 1
                  ? <li className="m-item">
                      <a href="javascript:void(0);" className="m-link">My Clubs <span className="ficon ficon-arrow-down"></span></a>
                      <ul className="sub-menu">
                        {
                          clubs.map(item => {
                            return (
                              <li key={item.id} className="m-sub-item"><a href={`/clubs/${item.id}/meetings`} className="m-link">{item.name}</a></li>
                            )
                          })
                        }
                        <li className="m-sub-item"><Link to="/create-club" className="m-link"><b>Create a club</b></Link></li>
                      </ul>
                    </li>
                  : null
                }
              </ul>
            : null
          }
          <ul className="nav navbar-nav navbar-right">
            <li className="m-item"><a href="/books" className="m-link"><span className="ficon ficon-bookmark"></span> Books</a></li>
            <li className="m-item"><a href="/about" className="m-link">About</a></li>
            <li className="m-item"><a href="/faqs" className="m-link">FAQS</a></li>
            {
              !isAuth
              ? <li className="m-item"><Link to="/signin" className="btn btn-default-corner bg-transparent btn-signin visible-md visible-lg">Sign in</Link></li>
              : <li className="m-item">
                  {
                    userInfo && userInfo.name
                    ? <a href="javascript:void(0);" className="m-link txt-user-name">{userInfo.name} <span className="ficon ficon-arrow-down"></span></a>
                    : null
                  }
                  {
                    userInfo && !userInfo.name && userInfo.email
                    ? <a href="javascript:void(0);" className="m-link txt-user-name">{userInfo.email} <span className="ficon ficon-arrow-down"></span></a>
                    : null
                  }
                  <ul className="sub-menu sub-menu-user">
                    <li className="m-sub-item"><Link to={`/profile/${userInfo && userInfo.id ? userInfo.id : ''}`} className="m-link">My Profile</Link></li>
                    {
                      clubs && clubs.length === 0
                      ? <li className='m-sub-item'><Link to={`/clubs`} className="m-link">My Clubs</Link></li>
                      : null
                    }
                    {
                      clubs && clubs.length === 1
                      ? <li className='m-sub-item'><Link to={`/clubs/${clubs[0].id}/meetings`} className="m-link">My Clubs</Link></li>
                      : null
                    }
                    {
                      clubs && clubs.length > 1
                      ? <li className="m-sub-item"><Link to={`/clubs`} className="m-link">My Clubs</Link></li>
                      : null
                    }
                    {
                      clubs && clubs.length > 1
                      ? clubs.map(item => {
                        return (
                          <li key={item.id} className='m-sub-item'><Link to={`/clubs/${item.id}/meetings`} className='m-link'>{item.name}</Link></li>
                        )
                      })
                      : null
                    }
                    <li className="m-sub-item"><Link to={`/profile/${userInfo && userInfo.id ? userInfo.id : ''}/settings`} className="m-link">Settings</Link></li>
                    <li className="m-sub-item"><a href="javascript:void(0);" className="m-link" onClick={this.logout.bind(this)}>Log out</a></li>
                  </ul>
                </li>
            }
            <li className="m-item text-center hidden-md hidden-lg">
            <h4 className="mb-title">The best website for organizing <br /> your book club</h4>
              {
                isAuth
                ? <Link to="/create-club" className="btn btn-default-corner bg-transparent btn-create-club">Create a club</Link>
                : <Link to="/signup" className="btn btn-default-corner bg-transparent btn-create-club">Create a club</Link>
              }
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  isAuth: PropTypes.bool,
  userInfo: PropTypes.object
};

const bindStateToProps = state => {
  return {
    isAuth: state.auth ? state.auth.isAuth : false,
    userInfo: state.auth.userInfo,
    clubs: state.clubReducers.results || []
  };
};

const bindDispatchToProps = dispatch => ({
  dispatch
});

export default connect(bindStateToProps, bindDispatchToProps)(Navbar);
