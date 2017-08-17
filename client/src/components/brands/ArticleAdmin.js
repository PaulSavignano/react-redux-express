import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle } from 'material-ui/Card'

import SuccessableButton from '../../components/buttons/SuccessableButton'
import renderTextField from '../../components/fields/renderTextField'
import { fetchUpdate } from '../../actions/brand'

const fields = [
  'textColor',
  'textFontFamily',
  'textFontSize',
  'textFontWeight',
  'textLetterSpacing',
  'textTextShadow',
  'titleColor',
  'titleFontFamily',
  'titleFontSize',
  'titleFontWeight',
  'titleLetterSpacing',
  'titleTextShadow',
  'subtitleColor',
  'subtitleFontFamily',
  'subtitleFontSize',
  'subtitleFontWeight',
  'subtitleLetterSpacing',
  'subtitleTextShadow',
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

export default reduxForm({ form: 'articleAdmin' })(ArticleAdmin)
