import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
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
    open: false,
    elevation: 1,
  }
  handleClose = () => this.setState({open: false})
  componentWillReceiveProps({ submitSucceeded }) {
    if (submitSucceeded) {
      this.setState({ open: true })
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
    const { open, elevation } = this.state
    const { dispatch, error, handleSubmit, submitSucceeded, submitting } = this.props
    return (
      <Card
        zDepth={elevation}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={{ flex: '1 1 auto', margin: 16 }}
      >
        <CardTitle title="Contact" subtitle="Enter your information" />
        <form onSubmit={handleSubmit(this.handleFormSubmit)} >
          <CardText>
            <Field name="firstName" component={renderTextField} label="First Name" fullWidth={true} />
            <Field name="email" component={renderTextField} label="Email" fullWidth={true} />
            <Field name="message" component={renderTextField} label="Message" fullWidth={true} multiLine={true} rows={2} />
          </CardText>
          {open &&
            <Dialog
              actions={
                <FlatButton
                  label="Close"
                  primary={true}
                  onTouchTap={this.handleClose}
                />
              }
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              Email was successfully sent!
            </Dialog>
          }
          {error && <div className="error">{error}</div>}
          <div className="button-container">
            <SuccessableButton
              submitSucceeded={submitSucceeded}
              submitting={submitting}
              label="submit"
              successLabel="submitted!"
            />
          </div>
        </form>
      </Card>
    )
  }
}


ContactForm = reduxForm({
  form: 'contact',
  validate
})(ContactForm)

const mapStateToProps = ({ user }) => ({
  initialValues: user.values,
  user
})

ContactForm = connect(mapStateToProps)(ContactForm)

export default contactFormContainer(ContactForm)
