import React from 'react'
import WysiwgyEditor from './WysiwgyEditor'

const renderWysiwgyField = ({ input, meta: { touched, error } }) => (
  <div style={{ margin: 8 }} onBlur={input.onBlur}>
    <label style={{ color: 'rgba(0, 0, 0, 0.3)', fontSize: 12 }}>Text</label>
    <WysiwgyEditor {...input} />
    {touched && error && <div className="formValidationErrorText">{error}</div>}
  </div>
)

export default renderWysiwgyField
