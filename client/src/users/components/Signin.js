import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push, goBack } from 'react-router-redux'
import { Link } from 'react-router'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import { Field, reduxForm } from 'redux-form'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import { fetchSignin } from '../actions/index'

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

class Signin extends Component {
  state = { open: false }
  handleClose = () => this.setState({open: false})
  componentWillReceiveProps(nextProps) {
    this.props.submitSucceeded === nextProps.submitSucceeded ? null : nextProps.submitSucceeded ? this.setState({ open: true }) : null
  }
  render() {
    console.log(this.props)
    const { error, dispatch, handleSubmit, submitting, user } = this.props
    return (
      <main>
        <section>
          <Card style={{ flex: '1 1 auto', width: 300, margin: 20 }}>
            <CardTitle title="Sign in" subtitle="Enter your information" />
            <form onSubmit={handleSubmit(values => dispatch(fetchSignin(values)))}>
              <CardText>
                <Field name="email" component={renderTextField} label="Email" fullWidth={true} />
                <Field name="password" component={renderTextField} label="Password" fullWidth={true} type="password" />
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </CardText>
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
                Welcome back {user.values ? user.values.firstname : null}
              </Dialog>
            }
            <CardActions style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between' }}>
              <p>Don't have an account? <Link to="/signup">Sign up instead!</Link></p>
              <p><Link to="/recover">Forgot your password?</Link></p>
            </CardActions>
          </Card>
        </section>
      </main>
    )
  }

}




Signin = reduxForm({
  form: 'signup',
  validate
})(Signin)

const mapStateToProps = (state, nextProps) => {

  return {
    user: state.user,
  }
}

Signin = connect(mapStateToProps)(Signin)

export default Signin
