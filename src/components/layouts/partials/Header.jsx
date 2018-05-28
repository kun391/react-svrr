import React from 'react';
import Navbar from './Navbar.jsx';

class Header extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  checkScroll() {
    let header = document.getElementsByClassName('header-container')[0] || document.getElementsByClassName('header-container bg-transparent')[0];

    if (header && (document.body.scrollTop >= 55 || window.pageYOffset >= 55)) {
      header.className = 'header-container';
    } else {
      if (this.props.classHeader) {
        header.className = 'header-container bg-transparent';
      }
    }
  }

  componentDidMount() {
    // Scroll to top
    document.body.scrollTop = 0;

    this.checkScroll();

    document.onscroll = () => {
      this.checkScroll();
    };
  }

  render() {
    return (
      <header className={`header-container ${this.props.classHeader}`}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-12">
              <nav className="navbar navbar-default">
                <div className="navbar-header">
                  <h1 className="navbar-brand logo"><a href={`/`}><span className="ficon ficon-logo"></span></a></h1>
                </div>
                <div className="navbar-collapse">
                  <Navbar currentUser={this.props.currentUser} />
                </div>
              </nav>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
export default Header;
