import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import { Field, reduxForm } from 'redux-form'
import { startReset, startFetchToken } from '../actions/users'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'password', 'passwordConfirm' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
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

class Reset extends Component {
  componentWillMount() {
    this.props.dispatch(startFetchToken(this.props.params.token))
  }
  render() {
    const { error, dispatch, handleSubmit, submitting, params } = this.props
    return (
      <div style={styles.grid}>
        <Card style={styles.item}>
          <CardTitle title="Reset" subtitle="Enter your email to recover your account" />
          <form onSubmit={handleSubmit(values => dispatch(startReset(values, params.token)))} className="">
            <CardText>
              <Field name="password" component={renderTextField} label="Password" fullWidth={true}/>
              <Field name="passwordConfirm" component={renderTextField} label="Password Confirm" fullWidth={true}/>
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
}

Reset = reduxForm({
  form: 'recovery',
  validate
})(Reset)

const mapStateToProps = (state) => {
  return {
    user: state.user
  }

}

Reset = connect(mapStateToProps)(Reset)

export default Reset
