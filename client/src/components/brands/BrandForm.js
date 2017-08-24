import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'

import SuccessableButton from '../../components/buttons/SuccessableButton'
import renderSelectField from '../../components/fields/renderSelectField'
import renderTextField from '../../components/fields/renderTextField'
import { fetchUpdate } from '../../actions/brand'

// TODOS finish refactor to class, add array handlers to BrandAdmin

class BrandForm extends Component {
  render() {
    const {
      _id,
      backgroundColor,
      dispatch,
      error,
      fontFamily,
      handleSubmit,
      submitSucceeded,
      submitting
    } = this.props
    return (
      <Card
        className="card"
        style={{ backgroundColor, fontFamily }}
      >
        <form
          onSubmit={handleSubmit((values) => dispatch(fetchUpdate(`article-style/${_id}`, { values })))}
        >
          <CardTitle title="Article Style" />
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
                  <MenuItem value='left' primaryText="Left" />
                  <MenuItem value='center' primaryText="Center" />
                  <MenuItem value='right' primaryText="Right" />
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
              label="update article"
              successLabel="article updated!"
            />
          </div>
        </form>
      </Card>
    )
  }
}

export default reduxForm({})(BrandForm)
