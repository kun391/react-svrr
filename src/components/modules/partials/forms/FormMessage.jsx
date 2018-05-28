import React  from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const FormMessage = ({type, error}) => {
  return (
    <div className={classnames('form-group', { hidden: !error }) }>
      <span className={`notification-message ${type} show`}>{error}</span>
    </div>
  );
};

FormMessage.propTypes = {
  type: PropTypes.string,
  error: PropTypes.string
};

FormMessage.defaultProps = {
  type: 'error'
};

export default FormMessage;