import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import { Field, reduxForm, SubmissionError  } from 'redux-form'
import { startRecovery } from '../actions/users'

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

const RecoverForm = (props) => {
  const { error, dispatch, handleSubmit, submitting } = props
  props.dirty ? dispatch({ type: 'AUTH_ERROR', error: false }) : ''
  return (
    <div style={styles.grid}>
      <Card style={styles.item}>
        <CardTitle title="Recovery" subtitle="Enter your email to recover your account" />
        {props.user.error ? <CardText><p>Your token has expired, please try again.</p></CardText> : ''}
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
    </div>
  )
}

const RecoverSuccess = (props) => {
  const { error, dispatch, handleSubmit, submitting, recover } = props
  return (
    <div style={styles.grid}>
      <Card style={styles.item}>
        <CardTitle title="Success!" subtitle={recover.message} />
      </Card>
    </div>
  )
}

let Recover = (props) => {
  const { error, dispatch, handleSubmit, submitting, submitSucceeded } = props
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
