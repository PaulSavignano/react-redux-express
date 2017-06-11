import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

const adaptFileEventToValue = delegate => e => delegate(e.target.files[0])

const renderFileInput = ({
  input: {
    value: omitValue,
    onChange,
    onBlur,
    ...input
  },
  meta: { omitMeta },
  ...custom,
  label
}) => (
  <RaisedButton
    label={label}
    labelPosition="before"
    containerElement="label"
    style={{ flex: '1 1 auto', margin: 8 }}
    primary={true}
  >
    <input
      style={{ cursor: 'pointer', position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, width: '100%', opacity: 0 }}
      onChange={onChange}
      onBlur={adaptFileEventToValue(onBlur)}
      type="file"
      {...input}
      {...custom}
    />
  </RaisedButton>
)

export default renderFileInput
