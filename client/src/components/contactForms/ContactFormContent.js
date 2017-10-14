import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Field, reduxForm } from 'redux-form'
import renderHTML from 'react-render-html'

import './contactForm.css'
import H3 from '../typography/H3'
import P from '../typography/P'
import SuccessableButton from '../buttons/SuccessableButton'
import renderTextField from '../fields/renderTextField'
import normalizePhone from '../../utils/normalizePhone'
import { fetchContact } from '../../actions/user'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'firstName', 'email', 'message' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  return errors
}

class ContactFormContent extends Component {
  handleFormSubmit = (values) => {
    const { dispatch } = this.props
    return dispatch(fetchContact(values))
  }
  render() {
    const {
      error,
      handleSubmit,
      invalid,
      item: {
        values: {
          button1Text,
          h3Text,
          pText
        }
      },
      phone,
      pristine,
      submitSucceeded,
      submitting,
    } = this.props
    return (
      <div>
        <div className="contact-form-title">
          <div className="contact-form-heading">
            <H3>{h3Text}</H3>
            {phone && <H3><a href={`tel:${phone.replace(/\D+/g, '')}`}>{phone}</a></H3>}
          </div>
          <P>{renderHTML(pText)}</P>
        </div>
        <form onSubmit={handleSubmit(this.handleFormSubmit)} >
          <div className="field-container">
            <Field
              className="field"
              name="firstName"
              component={renderTextField}
              label="First Name"
            />
            <Field
              className="field"
              name="phone"
              component={renderTextField}
              normalize={normalizePhone}
              label="Phone"
            />
            <Field
              className="field"
              name="email"
              component={renderTextField}
              label="Email"
            />
            <Field
              className="field"
              name="message"
              component={renderTextField}
              label="Message"
              fullWidth={true}
              multiLine={true}
              rows={2}
            />
          </div>
          <div className="button-container">
            <SuccessableButton
              disabled={pristine || invalid}
              error={error}
              label={button1Text}
              reset={null}
              submitSucceeded={submitSucceeded}
              submitting={submitting}
              successLabel={`${button1Text} Request Received!`}
            />
          </div>
        </form>
      </div>
    )
  }
}

ContactFormContent.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  item: PropTypes.object.isRequired,
  reset: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

export default reduxForm({
  form: 'contact',
  validate
})(ContactFormContent)
