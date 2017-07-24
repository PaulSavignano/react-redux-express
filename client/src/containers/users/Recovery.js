import React, { Component } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import { Field, reduxForm } from 'redux-form'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'

import renderTextField from '../../components/fields/renderTextField'
import { fetchRecovery } from '../../actions/users'

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
  render() {
    const { dispatch, error, handleSubmit, submitting, isFetching } = this.props
    return (
      isFetching ? null :
      <section className="page">
        <Card>
          <CardTitle title="Recovery" subtitle="Enter your email to recover your account" />
          <form onSubmit={handleSubmit(values => {
            this.setState({ email: values.email })
            return dispatch(fetchRecovery(values))
          })} className="">
            <CardText>
              <Field name="email" component={renderTextField} label="Email" fullWidth={true} />
            </CardText>
            {error && <div className="error">{error}</div>}
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
            <CardActions>
              <RaisedButton
                label="Recovery"
                fullWidth={true}
                disabled={submitting}
                type="submit"
                primary={true}
              />
            </CardActions>
          </form>
        </Card>
      </section>
    )
  }
}


Recovery = reduxForm({
  form: 'recovery',
  validate
})(Recovery)

const mapStateToProps = ({ user }) => ({
  isFetching: user.isFetching,
  user
})

Recovery = connect(mapStateToProps)(Recovery)

export default Recovery
