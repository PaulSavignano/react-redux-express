import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import { Field, reduxForm } from 'redux-form'
import DialogAlert from '../../DialogAlert'
import { startSigninUser } from '../actions/users'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'email', 'password' ]
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

let Signin = (props) => {
  const { dispatch, handleSubmit, submitting, user } = props
  return (
    <div className="section-forms">
      <Card>
        <CardTitle title="Sign in" subtitle="Enter your information" />
        <form onSubmit={handleSubmit(values => dispatch(startSigninUser(values)))} className="">
          <CardText>
            <Field name="email" component={renderTextField} label="Email" fullWidth={true} />
            <Field name="password" component={renderTextField} label="Password" fullWidth={true} type="password" />
          </CardText>
          {user.error ? <DialogAlert message={props.user.error} error={true}/> : ''}
          <CardActions>
            <RaisedButton
              label="Sign In"
              fullWidth={true}
              disabled={submitting}
              type="submit"
              primary={true}
            />
          </CardActions>
        </form>
        <CardActions style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between' }}>
          <p>Don't have an account? <Link to="/signup">Sign up instead!</Link></p>
          <p><Link to="/recover">Forgot your password?</Link></p>
        </CardActions>
      </Card>
    </div>
  )
}


Signin = reduxForm({
  form: 'signup',
  validate
})(Signin)

const mapStateToProps = (state) => ({
  user: state.user
})

Signin = connect(mapStateToProps)(Signin)

export default Signin
