import React from 'react';

class Footer extends React.Component {
 
  render() {
    return (
      <footer className="footer-container">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3">
              <a href="/" className="logo-footer"><span className="ficon ficon-logo"></span></a>
            </div>
            <div className="col-md-6">
              <ul className="navbar-footer">
                <li className="item"><a href="/books" className="link">BOOKS</a></li>
                <li className="item"><a href="/about" className="link">ABOUT</a></li>
                <li className="item"><a href="/faqs" className="link">FAQS</a></li>
                <li className="item"><a href="/faqs#contact-us" className="link">CONTACT US</a></li>
              </ul>
            </div>
            <div className="col-md-3">
              <ul className="social-list">
                <li className="item"><a href="https://www.facebook.com/Bookclubz-955972977760143/" target="_blank" className="link"><span className="ficon ficon-facebook"></span></a></li>
                <li className="item"><a href="https://twitter.com/bookclubz1" target="_blank" className="link"><span className="ficon ficon-twitter"></span></a></li>
                <li className="item"><a href="https://www.instagram.com/bookclubz1/" target="_blank" className="link"><span className="ficon ficon-instagram"></span></a></li>
              </ul>
            </div>
          </div>
          <div className="row">
            <div className="copyright">
              <p>&copy; 2017 Bookclubz. All rights reserved</p>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}
export default Footer;