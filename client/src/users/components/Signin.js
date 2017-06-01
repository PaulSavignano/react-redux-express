import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import { Field, reduxForm } from 'redux-form'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import muiThemeable from 'material-ui/styles/muiThemeable'

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
  render() {
    const { dispatch, error, handleSubmit, submitting, user, muiTheme, reset } = this.props
    const { primary1Color } = muiTheme.palette
    return (
      <section>
        <Card className="cards">
          <CardTitle title="Sign in" subtitle="Enter your information" />
          <form onSubmit={handleSubmit(values => {
            reset()
            dispatch(fetchSignin(values))
            .then(() => this.setState({ open: true }))
          })}>
            <CardText>
              <Field name="email" component={renderTextField} label="Email" fullWidth={true} />
              <Field name="password" component={renderTextField} label="Password" fullWidth={true} type="password" />
              {error && <strong style={{ color: 'rgb(244, 67, 54)' }}>{error}</strong>}
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
              Welcome back {user.values.firstName || null}!
            </Dialog>
          }
          <CardActions style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between' }}>
            <p>Don't have an account? <Link to="/user/signup" style={{ color: primary1Color }}>Sign up instead!</Link></p>
            <p><Link to="/user/recovery" style={{ color: primary1Color }}>Forgot your password?</Link></p>
          </CardActions>
        </Card>
      </section>
    )
  }
}

Signin = reduxForm({
  form: 'signin',
  validate
})(Signin)

const mapStateToProps = (state, nextProps) => ({
  user: state.user
})

Signin = compose(connect(mapStateToProps), muiThemeable())(Signin)

export default Signin
