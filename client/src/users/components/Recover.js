import React from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import { Field, reduxForm } from 'redux-form'

import { startRecovery } from '../actions/index'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'email' ]
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


const RecoverForm = (props) => {
  const { dispatch, handleSubmit, submitting, user } = props
  if (props.dirty) { return dispatch({ type: 'AUTH_ERROR', error: false })}
  return (
    <main>
      <section>
        <Card>
          <CardTitle title="Recovery" subtitle="Enter your email to recover your account" />
          {user.error ? <CardText><p>Your token has expired, please try again.</p></CardText> : ''}
          <form onSubmit={handleSubmit(values => dispatch(startRecovery(values)))} className="">
            <CardText>
              <Field name="email" component={renderTextField} label="Email" fullWidth={true} />
            </CardText>
            <CardActions>
              <RaisedButton
                label="Recover"
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

const RecoverSuccess = (props) => {
  const { recover } = props
  return (
    <main>
      <section>
        <Card>
          <CardTitle title="Success!" subtitle={recover.message} />
        </Card>
      </section>
    </main>
  )
}

let Recover = (props) => {
  const { submitSucceeded } = props
  return (
    submitSucceeded ? <RecoverSuccess {...props} /> : <RecoverForm {...props} />
  )
}

Recover = reduxForm({
  form: 'recover',
  validate
})(Recover)

const mapStateToProps = (state) => ({
  user: state.user
})

Recover = connect(mapStateToProps)(Recover)

export default Recover
