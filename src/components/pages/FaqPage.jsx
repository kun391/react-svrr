import React from 'react';
import {connect} from 'react-redux';
import { MasterLayout } from 'layout';
import Faq from 'modules/faq';
import Promise from 'bluebird';
import { Books, FAQs } from 'api';
import PropTypes from 'prop-types';

class FaqPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <MasterLayout classHeader="bg-transparent">
        <Faq faqs={this.props.faqs} />
      </MasterLayout>
    );
  }
}

FaqPage.fetchData = function(options) {
  const {store} = options;

  return Promise.all([
    store.dispatch(FAQs.actions.faqs()),
    store.dispatch(Books.actions.featuredBook())
  ]).spread(() => {
    let data = {
      seo: {
        title: 'Frequently asked questions about Bookclubz, the best way to organize your book club events.',
        description: 'See the most frequenly asked questions about Bookclubz here. Don\'t hesitate to contact us if your book club has additional questions or needs a custom feature.',
      }
    };
    return Promise.resolve(data);
  });
}

FaqPage.propTypes = {
  faqs: PropTypes.array
};

const bindStateToProps = state => {
  return {
    faqs: state.faqs.data.data.results
  }
}

export default connect(bindStateToProps)(FaqPage);
