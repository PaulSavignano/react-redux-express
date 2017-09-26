import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { Field, reduxForm } from 'redux-form'

import contactFormContainer from '../../containers/contactForms/contactFormContainer'
import SuccessableButton from '../buttons/SuccessableButton'
import renderTextField from '../fields/renderTextField'
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

class ContactForm extends Component {
  state = {
    elevation: 1,
  }
  componentWillReceiveProps({ submitSucceeded }) {
    if (submitSucceeded) {
      this.props.reset()
    }
  }
  handleMouseEnter = () => this.setState({ elevation: 4 })
  handleMouseLeave = () => this.setState({ elevation: 1 })
  handleFormSubmit = (values) => {
    const { dispatch } = this.props
    return dispatch(fetchContact(values))
  }
  render() {
    const { elevation } = this.state
    const {
      error,
      handleSubmit,
      invalid,
      phone,
      pristine,
      reset,
      submitSucceeded,
      submitting,
    } = this.props
    return (
      <Card
        zDepth={elevation}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={{ flex: '1 1 auto', margin: 16 }}
      >
        <CardTitle
          title={
            <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between' }}>
              <div>Contact</div>
              { phone && <a href={`tel:${phone.replace(/\D+/g, '')}`} style={{ textDecoration: 'none', color: 'inherit' }}>{phone}</a>}
            </div>
          }
          subtitle="Enter your information"
        />
        <form onSubmit={handleSubmit(this.handleFormSubmit)} >
          <CardText>
            <Field name="firstName" component={renderTextField} label="First Name" fullWidth={true} />
            <Field name="email" component={renderTextField} label="Email" fullWidth={true} />
            <Field name="message" component={renderTextField} label="Message" fullWidth={true} multiLine={true} rows={2} />
          </CardText>
          <div className="button-container">
            <SuccessableButton
              disabled={pristine || invalid}
              error={error}
              label="Contact"
              reset={null}
              submitSucceeded={submitSucceeded}
              submitting={submitting}
              successLabel="Contact Request Received!"
            />
          </div>
        </form>
      </Card>
    )
  }
}

ContactForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object.isRequired,
  reset: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
}

export default contactFormContainer(reduxForm({
  form: 'contact',
  validate
})(ContactForm))
