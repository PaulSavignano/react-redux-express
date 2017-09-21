import React from 'react'
import Checkbox from 'material-ui/Checkbox'

const renderCheckbox = ({ input, label, className }) =>
  <Checkbox
    label={label}
    checked={input.value ? true : false}
    onCheck={input.onChange}
    className={className}
  />

export default renderCheckbox
