import React from 'react';
import { MasterLayout } from 'layout';
import AddBook from 'modules/profile/add-book';
import Promise from 'bluebird';

class AddBookPage extends React.Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <MasterLayout>
        <AddBook />
      </MasterLayout>
    );
  }
}

AddBookPage.fetchData = function(options) {
  let data = {
    seo: {
      title: 'Add a book',
      description: '',
    }
  };
  return Promise.resolve(data);
}

export default AddBookPage;
