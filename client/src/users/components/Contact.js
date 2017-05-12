import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import { Field, reduxForm } from 'redux-form'
import { fetchContact } from '../actions/index'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'firstname', 'email', 'message' ]
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


const ContactForm = (props) => {
  const { dispatch, handleSubmit, submitting, user } = props
  return (
    <main>
      <section>
        <Card>
          <CardTitle title="Contact" subtitle="Enter your information" />
          <form onSubmit={handleSubmit(values => dispatch(fetchContact(values)))} >
            <CardText>
              <Field name="firstname" component={renderTextField} label="First Name" fullWidth={true} />
              <Field name="email" component={renderTextField} label="Email" fullWidth={true} />
              <Field name="message" component={renderTextField} label="Message" fullWidth={true} multiLine={true} rows={2} />
            </CardText>
            {user.error ? <CardText><p>{user.error}</p></CardText> : ''}
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
    </main>

  )
}

const ContactSuccess = (props) => {
  const { message } = props
  return (
    <main>
      <section>
        <Card>
          <CardTitle title="Success!" subtitle={message} />
        </Card>
      </section>
    </main>
  )
}

let Contact = (props) => {
  const { submitSucceeded } = props
  return (
    submitSucceeded ? <ContactSuccess {...props} /> : <ContactForm {...props} />
  )
}


Contact = reduxForm({
  form: 'contact',
  validate
})(Contact)

const mapStateToProps = (state) => ({
  user: state.user
})

Contact = connect(mapStateToProps)(Contact)

export default Contact
