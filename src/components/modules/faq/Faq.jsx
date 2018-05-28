import React from 'react';
import { FixedBanner } from 'partials';
import FaqList from './FaqList.jsx';
import ContactForm from 'modules/contact';
import PropTypes from 'prop-types';

class Faq extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {

    return (
      <div className="faq-container">
        <div className="container-fluid">
          <div className="row">
            <FixedBanner image="bg-faq.jpeg" className="faq-banner" title="Questions? Look here" description="" />
          </div>
          <div className="row">
            <div className="block-container faq-content">
              <div className="center">
                <div className="faq-info">
                  <FaqList faqs={this.props.faqs} />
                </div>
                <div id="contact-us" className="contact-us">
                  <h4 className="block-title">Contact us</h4>
                  <div className="col-xs-12">
                    <ContactForm />
                  </div>
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

Faq.propTypes = {
  faqs: PropTypes.array
};

export default Faq;
