import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'

import SuccessableButton from '../../components/buttons/SuccessableButton'
import renderSelectField from '../../components/fields/renderSelectField'
import renderTextField from '../../components/fields/renderTextField'
import { fetchUpdate } from '../../actions/brand'

const fields = [
  { name: 'imageElevation', type: 'number' },
  { name: 'textColor', type: 'text' },
  { name: 'textFontFamily', type: 'text' },
  { name: 'textFontSize', type: 'text' },
  { name: 'textFontWeight', type: 'text' },
  { name: 'textLetterSpacing', type: 'text' },
  { name: 'textTextShadow', type: 'text' },
  { name: 'titleColor', type: 'text' },
  { name: 'titleFontFamily', type: 'text' },
  { name: 'titleFontSize', type: 'text' },
  { name: 'titleFontWeight', type: 'text' },
  { name: 'titleLetterSpacing', type: 'text' },
  { name: 'titleTextShadow', type: 'text' },
  { name: 'subtitleColor', type: 'text' },
  { name: 'subtitleFontFamily', type: 'text' },
  { name: 'subtitleFontSize', type: 'text' },
  { name: 'subtitleFontWeight', type: 'text' },
  { name: 'subtitleLetterSpacing', type: 'text' },
  { name: 'subtitleTextShadow', type: 'text' }
]

const ArticleAdmin = ({
  _id,
  backgroundColor,
  dispatch,
  error,
  fontFamily,
  handleSubmit,
  submitSucceeded,
  submitting
}) => (
  <Card
    className="card"
    style={{ backgroundColor, fontFamily }}
  >
    <form
      onSubmit={handleSubmit((values) => {
        const path = `article/${_id}`
        return dispatch(fetchUpdate(path, { values }))
      })}
    >
      <CardTitle title="Article" />
      <div className="field-container">
        {fields.map(({ name, type }) => (
          <Field
            key={name}
            name={name}
            label={name}
            type={type}
            component={renderTextField}
            className="field"
            style={{ fontFamily }}
          />
        ))}
        <Field
          name="titleAlign"
          component={renderSelectField}
          label="titleAlign"
          className="field"
        >
          <MenuItem value={1} primaryText="Right" />
          <MenuItem value={2} primaryText="Center" />
          <MenuItem value={3} primaryText="Left" />
        </Field>
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

export default reduxForm({ form: 'articleAdmin' })(ArticleAdmin)
