import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'

const TextArea = ({label, value, name, error, placeholder, className, maxLength = 255, onChange, readOnly, icon}) => {
  return (
    <div className={`form-group ${className}`}>
      {
        label
        ? <label className='form-label-control'>{label}</label>
        : null
      }
      {
        icon
        ? <span className={`ficon ficon-${icon}`} />
        : null
      }
      <textarea name={name} value={value} className={classnames('form-control', { error: !!error })} placeholder={placeholder} maxLength={maxLength} onChange={onChange} readOnly={readOnly} />
      <span className={classnames('notification-message error', { show: !!error })}>{error}</span>
    </div>
  )
}

TextArea.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  name: PropTypes.string,
  error: PropTypes.string,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  maxLength: PropTypes.string,
  icon: PropTypes.string,
  readOnly: PropTypes.bool,
  onChange: PropTypes.func
}

TextArea.defaultProps = {
  readOnly: false
}

export default TextArea
