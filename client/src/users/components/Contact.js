import React, { Component } from 'react'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import { Field, reduxForm } from 'redux-form'

import { fetchContact } from '../actions/index'

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

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)


class Contact extends Component {
  state = {
    open: false,
  }
  handleClose = () => this.setState({open: false})
  componentWillReceiveProps(nextProps) {
    if (nextProps.submitSucceeded) this.setState({ open: true })
  }
  render() {
    const { dispatch, error, handleSubmit, submitting } = this.props
    return (
      <section>
        <Card className="cards">
          <CardTitle title="Contact" subtitle="Enter your information" />
          <form onSubmit={handleSubmit(values => dispatch(fetchContact(values)))} >
            <CardText>
              <Field name="firstName" component={renderTextField} label="First Name" fullWidth={true} />
              <Field name="email" component={renderTextField} label="Email" fullWidth={true} />
              <Field name="message" component={renderTextField} label="Message" fullWidth={true} multiLine={true} rows={2} />
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
                Email was successfully sent!
              </Dialog>
            }
            {error && <strong style={{ color: 'rgb(244, 67, 54)' }}>{error}</strong>}
            <CardActions>
              <RaisedButton
                label="Contact"
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


Contact = reduxForm({
  form: 'contact',
  validate
})(Contact)

const mapStateToProps = ({ user }) => ({
  initialValues: user.values,
  user
})

Contact = connect(mapStateToProps)(Contact)

export default Contact
