import React, { Component } from 'react'
import { Field } from 'redux-form'
import MenuItem from 'material-ui/MenuItem'

import renderSelectField from '../fields/renderSelectField'
import renderTextField from '../fields/renderTextField'
import normalizePhone from '../../utils/normalizePhone'

class BrandFormField extends Component {
  handleNumberToString = value => {
    if (value) return value.toString()
  }
  render() {
    const { fontFamily, name, options, type } = this.props
    switch(type) {
      case 'number':
        return (
          <Field
            key={name}
            name={name}
            label={name}
            type={type}
            component={renderTextField}
            className="field"
            style={{ fontFamily }}
            normalize={this.handleNumberToString()}
          />
        )
      case 'phone':
        return (
          <Field
            key={name}
            name={name}
            label={name}
            type={type}
            component={renderTextField}
            className="field"
            style={{ fontFamily }}
            normalize={normalizePhone}
          />
        )
      case 'select':
        return (
          <Field
            key={name}
            name={name}
            component={renderSelectField}
            label={name}
            className="field"
          >
            {options.map(option => (
              <MenuItem
                key={option}
                value={option}
                primaryText={option}
              />
            ))}
          </Field>
        )
      case 'text':
        return (
          <Field
            key={name}
            name={name}
            label={name}
            component={renderTextField}
            className="field"
            style={{ fontFamily }}
          />
        )
      default:
        return null
    }
  }
}

export default BrandFormField
