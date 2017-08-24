import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'

import SuccessableButton from '../../components/buttons/SuccessableButton'
import renderSelectField from '../../components/fields/renderSelectField'
import renderTextField from '../../components/fields/renderTextField'
import { fetchUpdate } from '../../actions/brand'

const fields = [
  { name: 'buttonColor', type: 'text' },
  { name: 'mediaBorder', type: 'text' },
  { name: 'mediaElevation', type: 'number' },
  { name: 'h1Align', type: 'select' },
  { name: 'h1Color', type: 'text' },
  { name: 'h1TextShadow', type: 'text' },
  { name: 'h2Align', type: 'select' },
  { name: 'h2Color', type: 'text' },
  { name: 'h2TextShadow', type: 'text' },
  { name: 'h3Align', type: 'select' },
  { name: 'h3Color', type: 'text' },
  { name: 'h3TextShadow', type: 'text' },
]

const ProductStyleAdmin = ({
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
        const path = `product-style/${_id}`
        return dispatch(fetchUpdate(path, { values }))
      })}
    >
      <CardTitle title="Product Style" />
      <div className="field-container">
        {fields.map(({ name, type }) => (
          type === 'select' ?
            <Field
              key={name}
              name={name}
              component={renderSelectField}
              label={name}
              className="field"
            >
              <MenuItem value='right' primaryText="Right" />
              <MenuItem value='center' primaryText="Center" />
              <MenuItem value='left' primaryText="Left" />
            </Field>
          :
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
      </div>
      {error && <div className="error">{error}</div>}
      <div className="button-container">
        <SuccessableButton
          submitSucceeded={submitSucceeded}
          submitting={submitting}
          label="update card"
          successLabel="card updated!"
        />
      </div>
    </form>
  </Card>
)

export default reduxForm({ form: 'productStyle' })(ProductStyleAdmin)
