import React from 'react';
import { ImageItem, FixedBanner } from 'partials';
import TeamList from './TeamList.jsx';
import ContactForm from 'modules/contact';

class About extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {

    return (
      <div className="about-container">
        <div className="container-fluid">
          <div className="row">
            <div className="block-container about-content">
              <div className="center">
                <div className="about-info">
                  <div className="col-xs-12">
                    <h4 className="block-title">About Us</h4>
                    <p className="text-bold">Bookclubz is a simple site to better organize your book club, intuitively designed by book clubs for book clubs.</p>
                    <p className="description">Bookclubz was created to help one book club in Philadelphia manage their email list. It can now help many book clubs stay organized, so that they can focus on reading and discussing great books!</p>
                    <p className="description">Use Bookclubz to coordinate membership, schedule meetings, track RSVPs, send messages, rate books, create a library, and get inspiration for your next book club read. If you have any comments or suggestions, don't hesitate to <a href="mailto:help@bookclubz.com"><b>contact us</b></a>.</p>
                    <div className="team-member">
                      <h4 className="block-title">Team members</h4>
                      <TeamList />
                    </div>
                  </div>
                  <div className="clearfix" />
                </div>
                <div className="gallery-content">
                  <div className="line">
                    <div className="wrap-galery-image">
                      <ImageItem image="img-about-1.5.jpg" className="image" description="" type="local" />
                    </div>
                  </div>
                  <div className="clearfix" />
                </div>
              </div>
              <div className="clearfix" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
