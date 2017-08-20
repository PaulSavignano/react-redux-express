import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle } from 'material-ui/Card'

import SuccessableButton from '../../components/buttons/SuccessableButton'
import renderTextField from '../../components/fields/renderTextField'
import normalizePhone from '../../utils/normalizePhone'
import normalizeZip from '../../utils/normalizeZip'
import { fetchUpdate } from '../../actions/brand'

const fields = [
  'name',
  'description',
  'phone',
  'email',
  'street',
  'city',
  'state',
  'zip',
  'facebook',
  'github',
  'google',
  'instagram',
  'linkedin',
  'twitter',
  'yelp',
  'youtube'
]

const BusinessAdmin = ({
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
        const path = `business/${_id}`
        return dispatch(fetchUpdate(path, values))
      })}
    >
      <CardTitle title="Business" />
      <div className="field-container">
        {fields.map(field => (
          <Field
            key={field}
            name={field}
            label={field}
            component={renderTextField}
            normalize={field === 'phone' ? normalizePhone : field === 'zip' ? normalizeZip : null}
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
          label="update business"
          successLabel="business updated!"
        />
      </div>
    </form>
  </Card>
)

export default reduxForm({
  form: 'business'
})(BusinessAdmin)
