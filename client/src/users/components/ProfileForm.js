import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardText, CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'

import renderTextField from '../../modules/renderTextField'
import normalizePhone from '../../modules/normalizePhone'
import { fetchUpdate, fetchDelete } from '../actions/index'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'firstName', 'lastName', 'email' ]
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

class ProfileForm extends Component {
  state = {
    submitted: false,
    open: false
  }
  componentWillReceiveProps(nextProps) {
    const { submitSucceeded, dirty } = nextProps
    if (submitSucceeded) this.setState({ submitted: true })
    if (dirty) this.setState({ submitted: false })
  }
  render() {
    const { dispatch, handleSubmit, submitting, user, error } = this.props
    return (
      <Card className="cards">
        <form onSubmit={handleSubmit(values => {
          const update = { type: 'UPDATE_VALUES', values}
          dispatch(fetchUpdate(update))
        })}
        >
          <CardText>
            <Field name="firstName" component={renderTextField} label="First Name" fullWidth={true} />
            <Field name="lastName" component={renderTextField} label="Last Name" fullWidth={true} />
            <Field name="email" component={renderTextField} label="Email" fullWidth={true} />
            <Field name="phone" component={renderTextField} label="Phone" normalize={normalizePhone} fullWidth={true} />
            <Field name="password" component={renderTextField} label="Password" fullWidth={true} type="password" />
            <Field name="passwordConfirm" component={renderTextField} label="Password Confirm" fullWidth={true} type="password"/>
            {error && <strong style={{ color: 'rgb(244, 67, 54)' }}>{error}</strong>}
          </CardText>
          <CardText>
            {!this.state.open ? null :
            <Dialog
              actions={
                <FlatButton label="Close" primary={true} onTouchTap={() => this.setState({ open: false }) }/>
              }
              modal={false}
              open={this.state.open}
              onRequestClose={this.handleClose}
            >
              An email has been sent to {user.values.email}
            </Dialog>
            }
          </CardText>
          <CardActions style={{ display: 'flex', flexFlow: 'row wrap' }}>
            <RaisedButton
              type="submit"
              children={submitting && <CircularProgress size={80} thickness={5} />}
              label={this.state.submitted ? "Updated" : "Update"}
              labelColor="#ffffff"
              primary={this.state.submitted ? false : true}
              backgroundColor={this.state.submitted ? "#4CAF50" : null }
              style={{ flex: '1 1 auto', marginRight: 16 }}
            />
            <RaisedButton
              type="button"
              label="Delete Account"
              primary={true}
              style={{ flex: '1 1 auto', marginRight: 0 }}
              onTouchTap={() => dispatch(fetchDelete())}
            />
          </CardActions>
        </form>
      </Card>
    )
  }
}


ProfileForm = reduxForm({
  form: 'profile',
  validate
})(ProfileForm)

ProfileForm = connect()(ProfileForm)

export default ProfileForm
