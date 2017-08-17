import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle } from 'material-ui/Card'

import SuccessableButton from '../../components/buttons/SuccessableButton'
import renderTextField from '../../components/fields/renderTextField'
import { fetchUpdate } from '../../actions/brand'

const fields = [
  'fontFamily',
  'primary1Color',
  'primary2Color',
  'primary3Color',
  'accent1Color',
  'accent2Color',
  'accent3Color',
  'textColor',
  'secondaryTextColor',
  'alternateTextColor',
  'canvasColor',
  'borderColor',
  'disabledColor',
  'pickerHeaderColor',
  'shadowColor',
]

const ThemeAdmin = ({
  _id,
  backgroundColor,
  dispatch,
  error,
  fontFamily,
  handleSubmit,
  submitSucceeded,
  submitting,
}) => (
  <Card
    className="card"
    style={{ backgroundColor, fontFamily }}
  >
    <form
      onSubmit={handleSubmit((values) => {
        const path = `theme/${_id}`
        return dispatch(fetchUpdate(path, { values }))
      })}
    >
      <CardTitle title="Theme" />
      <div className="field-container">
        {fields.map(field => (
          <Field
            key={field}
            name={field}
            label={field}
            component={renderTextField}
            className="field"
            style={{ fontFamily }}
          />
        ))}
      </div>
      {error && <div className="error">{error}</div>}
      <div className="button-container">
        <SuccessableButton
          submitSucceeded={submitSucceeded}
          submitting={submitting}
          label="update theme"
          successLabel="theme updated!"
        />
      </div>
    </form>
  </Card>
)


export default reduxForm({
  form: 'theme'
})(ThemeAdmin)
