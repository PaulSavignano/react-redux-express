import React from 'react'
import RichTextMarkdown from './RichTextMarkdown'

const renderRichField = ({ input, meta: { touched, error } }) => (
  <div style={{ margin: '16px 0 8px 0'}}>
    <label style={{ color: 'rgba(0, 0, 0, 0.3)', fontSize: 12 }}>Text</label>
    <RichTextMarkdown {...input} />
    {touched && (error && <div className="formValidationErrorText">{error}</div>)}
  </div>
)

export default renderRichField
