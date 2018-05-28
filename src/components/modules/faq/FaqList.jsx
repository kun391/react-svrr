import React from 'react';
import FaqItem from './FaqItem.jsx';
import PropTypes from 'prop-types';

class FaqList extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    let faqList = this.props.faqs && this.props.faqs.map(item => {
      return (
        <FaqItem key={item.id} id={item.id} title={item.question} description={item.answer} />
      );
    });
    return (
      <ul className="list-faq">
        {faqList}
      </ul>
    );
  }
}

FaqList.propTypes = {
  faqs: PropTypes.array
};

export default FaqList;
