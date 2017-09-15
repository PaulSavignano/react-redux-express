import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { Field, reduxForm } from 'redux-form'

import userContainer from '../../containers/user/userContainer'
import SuccessableButton from '../buttons/SuccessableButton'
import renderTextField from '../fields/renderTextField'
import { fetchAdd } from '../../actions/user'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'firstName', 'lastName', 'email', 'password', 'passwordConfirm' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  if (values.email && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }
  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = 'Passwords must match'
  }
  return errors
}

class Signup extends Component {
  state = { open: false }
  handleClose = () => {
    this.setState({ open: false })
    this.props.history.goBack()
  }
  handleFormSubmit = values => this.props.dispatch(fetchAdd(values))
  componentWillReceiveProps({ reset, submitSucceeded }) {
    if (submitSucceeded) {
      this.setState({ open: true })
      reset()
    }
  }
  render() {
    const {
      dirty,
      dispatch,
      error,
      handleSubmit,
      primary1Color,
      pristine,
      reset,
      submitSucceeded,
      submitting,
      user,
      valid
    } = this.props
    return (
      <div className="page">
        <section className="section">
          <Card className="form">
            <CardTitle title="Signup" subtitle="Enter your information" />
            <form onSubmit={handleSubmit(this.handleFormSubmit)} >
              <CardText>
                <Field name="firstName" component={renderTextField} label="First Name" fullWidth={true} />
                <Field name="lastName" component={renderTextField} label="Last Name" fullWidth={true} />
                <Field name="email" component={renderTextField} label="Email" fullWidth={true} />
                <Field name="password" component={renderTextField} label="Password" fullWidth={true} type="password" />
                <Field name="passwordConfirm" component={renderTextField} label="Password Confirm" fullWidth={true} type="password"/>
              </CardText>
              <div className="button-container">
                <SuccessableButton
                  dirty={dirty}
                  error={error}
                  label="Sign Up"
                  reset={null}
                  submitSucceeded={submitSucceeded}
                  submitting={submitting}
                  successLabel={`Welcome ${user.values.firstName}!`}
                  valid={valid}
                />
              </div>
            </form>
            {!this.state.open ? null :
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
              Welcome {user.values.firstName && user.values.firstName}!
            </Dialog>
            }
            <CardActions className="card-actions">
              <p>Already have an account? <Link to="/user/signin" style={{ color: primary1Color }}>Sign In!</Link></p>
              <p>Forgot your password? <Link to="/user/recovery" style={{ color: primary1Color }}>Recover your account!</Link></p>
            </CardActions>
          </Card>
        </section>
      </div>
    )
  }
}

Signup.propTypes = {
  destroy: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
}

export default userContainer(
  reduxForm({
  form: 'signup',
  validate
})(withRouter(Signup)))
