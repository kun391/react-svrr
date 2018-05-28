import React from 'react';
import { MasterLayout } from 'layout';
import About from 'modules/about';
import Promise from 'bluebird';

class AboutPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <MasterLayout>
        <About />
      </MasterLayout>
    );
  }
}

AboutPage.fetchData = function(options) {
  let data = {
    seo: {
      title: 'About Bookclubz, the best way to manage and organize your book club events.',
      description: 'Bookclubz is an online tool to manage and organize your book club events. Join other bookclubs on the best online tool for making your club\'s experience unbeatable.',
    }
  };
  return Promise.resolve(data);
}

export default AboutPage;
