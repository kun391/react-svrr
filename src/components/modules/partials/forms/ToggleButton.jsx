import React  from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const ToggleButton = ({label, value, name, className, onChange, forName}) => {
  return (
    <div className={`toggle-button ${className}`}>
      <input id={forName || name} type="checkbox" name={name} value={value} checked={value} className="tgl tgl-ios" onChange={onChange} />
      <label className="tgl-btn" htmlFor={forName || name}></label>
    </div>
  );
};

ToggleButton.propTypes = {
  label: PropTypes.string,
  value: PropTypes.bool,
  name: PropTypes.string,
  className: PropTypes.string,
  forName: PropTypes.string,
  onChange: PropTypes.func
};

export default ToggleButton;