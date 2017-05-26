import React, { Component } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { Field, reduxForm } from 'redux-form'

import { fetchAdd } from '../actions/index'

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

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

class Signup extends Component {
  state = { open: false }
  handleClose = () => this.setState({open: false})
  componentWillReceiveProps(nextProps) {
    if (nextProps.submitSucceeded) this.setState({ open: true })
  }
  render() {
    const { dispatch, error, handleSubmit, submitting, signup } = this.props
    return (
      <section>
        <Card className="cards">
          <CardTitle title="Signup" subtitle="Enter your information" />
          <form onSubmit={handleSubmit(values => dispatch(fetchAdd(values)))} >
            <CardText>
              <Field name="firstName" component={renderTextField} label="First Name" fullWidth={true} />
              <Field name="lastName" component={renderTextField} label="Last Name" fullWidth={true} />
              <Field name="email" component={renderTextField} label="Email" fullWidth={true} />
              <Field name="password" component={renderTextField} label="Password" fullWidth={true} type="password" />
              <Field name="passwordConfirm" component={renderTextField} label="Password Confirm" fullWidth={true} type="password"/>
              {error && <strong style={{ color: 'rgb(244, 67, 54)' }}>{error}</strong>}
            </CardText>
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
                Welcome {signup.values ? signup.values.firstName : null}!
              </Dialog>
            }
            <CardActions>
              <RaisedButton
                label="Sign Up"
                fullWidth={true}
                disabled={submitting}
                type="submit"
                primary={true}
              />
            </CardActions>
          </form>
        </Card>
      </section>
    )
  }
}


Signup = reduxForm({
  form: 'signup',
  validate
})(Signup)

const mapStateToProps = (state) => ({
  signup: state.form.signup || {}
})

Signup = connect(mapStateToProps)(Signup)

export default Signup
