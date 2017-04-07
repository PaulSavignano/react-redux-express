import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import { Field, reduxForm, SubmissionError  } from 'redux-form'
import { startSignupUser } from '../actions/users'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'firstname', 'lastname', 'email', 'password', 'passwordConfirm' ]
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


const styles = {
  grid: {
    display: 'grid',
    paddingTop: 80,
    paddingBottom: 80,
  },
  item: {
    maxWidth: 840,
    margin: '0 auto'
  }
}

let Signup = (props) => {
  console.log(props)
  const { error, dispatch, handleSubmit, submitting } = props
  return (
    <div style={styles.grid}>
      <Card style={styles.item}>
        <CardTitle title="Signup" subtitle="Enter your information" />
        <form onSubmit={handleSubmit(values => dispatch(startSignupUser(values)))} className="">
          <CardText>
            <Field name="firstname" component={renderTextField} label="First Name" fullWidth={true} />
            <Field name="lastname" component={renderTextField} label="Last Name" fullWidth={true} />
            <Field name="email" component={renderTextField} label="Email" fullWidth={true} />
            <Field name="password" component={renderTextField} label="Password" fullWidth={true} type="password" />
            <Field name="passwordConfirm" component={renderTextField} label="Password Confirm" fullWidth={true} type="password"/>
          </CardText>
          {props.user.error ? <CardText><p>Your token has expired, please try again.</p></CardText> : ''}
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
    </div>
  )
}


Signup = reduxForm({
  form: 'signup',
  validate
})(Signup)

const mapStateToProps = (state) => ({
  user: state.user
})

Signup = connect(mapStateToProps)(Signup)

export default Signup
