import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import { Field, reduxForm } from 'redux-form'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import userContainer from '../../containers/user/userContainer'
import SuccessableButton from '../buttons/SuccessableButton'
import renderTextField from '../../components/fields/renderTextField'
import { fetchRecovery } from '../../actions/user'

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

class Recovery extends Component {
  state = {
    open: false,
    email: null
  }
  handleClose = () => this.setState({open: false})
  componentWillReceiveProps(nextProps) {
    if (nextProps.submitSucceeded) this.setState({ open: true })
  }
  handleFormSubmit = values => {
    const { dispatch } = this.props
    this.setState({ email: values.email })
    return dispatch(fetchRecovery(values))
  }
  render() {
    const {
      dirty,
      dispatch,
      error,
      handleSubmit,
      primary1Color,
      submitSucceeded,
      submitting,
      user,
      valid,
    } = this.props
    return (
      <div className="page">
        <section className="section-margin">
          <Card>
            <CardTitle title="Recovery" subtitle="Enter your email to recover your account" />
            <form onSubmit={handleSubmit(this.handleFormSubmit)}>
              <CardText>
                <Field name="email" component={renderTextField} label="Email" fullWidth={true} />
              </CardText>
              <div className="card-actions">
                <SuccessableButton
                  dirty={dirty}
                  error={error}
                  label="Request Estimage"
                  reset={null}
                  submitSucceeded={submitSucceeded}
                  submitting={submitting}
                  successLabel="Estimate Requested!"
                  valid={valid}
                />
              </div>
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
              An email has been sent to {this.state.email}
            </Dialog>
            }
            <CardActions className="card-actions">
              <p>Don't have an account? <Link to="/user/signup" style={{ color: primary1Color }}>Sign Up!</Link></p>
              <p>Forgot your password? <Link to="/user/recovery" style={{ color: primary1Color }}>Recover your account!</Link></p>
            </CardActions>
          </Card>
        </section>
      </div>
    )
  }
}

Recovery.propTypes = {
  destroy: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  submitSucceeded: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  user: PropTypes.object
}

export default userContainer(reduxForm({
  form: 'recovery',
  validate
})(Recovery))
