import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import { Field, reduxForm } from 'redux-form'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import muiThemeable from 'material-ui/styles/muiThemeable'

import renderTextField from '../../components/fields/renderTextField'
import { fetchSignin } from '../../actions/users'

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


class Signin extends Component {
  state = {
    open: false,
    message: null
  }
  handleClose = () => this.setState({open: false})
  componentWillReceiveProps(nextProps) {
    const { submitSucceeded, user } = nextProps
    submitSucceeded && this.setState({ message: `Welcome back ${user.values.firstName}!`})
  }
  render() {
    const { dispatch, error, handleSubmit, submitting, muiTheme, reset } = this.props
    const { primary1Color } = muiTheme.palette
    return (
      <section>
        <Card className="cards">
          <CardTitle title="Sign in" subtitle="Enter your information" />
          <form onSubmit={handleSubmit(values => {
            return dispatch(fetchSignin(values))
            .then(() => {
              reset()
              this.setState({ open: true })
            })
          })}>
            <CardText>
              <Field name="email" component={renderTextField} label="Email" fullWidth={true} />
              <Field name="password" component={renderTextField} label="Password" fullWidth={true} type="password" />
            </CardText>
            {error && <div className="error">{error}</div>}
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
              {this.state.message}
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

const mapStateToProps = ({ user }) => ({
  user
})

Signin = compose(connect(mapStateToProps), muiThemeable())(Signin)

export default Signin
