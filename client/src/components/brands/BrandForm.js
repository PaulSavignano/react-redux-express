import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'

import SuccessableButton from '../../components/buttons/SuccessableButton'
import renderSelectField from '../../components/fields/renderSelectField'
import renderTextField from '../../components/fields/renderTextField'
import { fetchUpdate } from '../../actions/brand'

class BrandForm extends Component {
  render() {
    const {
      _id,
      backgroundColor,
      dispatch,
      error,
      fields,
      fontFamily,
      form,
      handleSubmit,
      submitSucceeded,
      submitting
    } = this.props
    return (
      <Card
        className="card"
        style={{ backgroundColor, fontFamily, margin: '32px 0' }}
      >
        <form
          onSubmit={handleSubmit((values) => dispatch(fetchUpdate(`${form.name.toLowerCase()}/${_id}`, { values })))}
        >
          <CardTitle title={`${form.name}`} />
          <div className="field-container">
            {fields.map(({ name, type, options }) => {
              const numberToString = value => value && value.toString()
              const normalizeNumber = type === 'number' ? { normalize: numberToString } : null
              return (
                type === 'select' ?
                  <Field
                    key={name}
                    name={name}
                    component={renderSelectField}
                    label={name}
                    className="field"
                  >
                    {options.map(option => (
                      <MenuItem
                        value={option}
                        primaryText={option}
                      />
                    ))}
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
                  {...normalizeNumber}
                />
              )
            })}
          </div>
          {error && <div className="error">{error}</div>}
          <div className="button-container">
            <SuccessableButton
              submitSucceeded={submitSucceeded}
              submitting={submitting}
              label={`update ${form.name}`}
              successLabel={`${form.name} updated!`}
            />
          </div>
        </form>
      </Card>
    )
  }
}

export default reduxForm({})(BrandForm)
