import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { DatePicker } from 'redux-form-material-ui'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardTitle, CardText} from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'

import SuccessableButton from '../buttons/SuccessableButton'
import renderTextField from '../../components/fields/renderTextField'
import renderSelectField from '../../components/fields/renderSelectField'
import { fetchRequestEstimate } from '../../actions/user'

const validate = values => {
  const errors = {}
  const requiredFields = [
    'date',
    'firstName',
    'lastName',
    'phone',
    'email',
    'note',
    'size',
    'from',
    'to'
  ]
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

class RequestEstimate extends Component {
  state = {
    open: false,
  }
  handleClose = () => this.setState({open: false})
  componentWillReceiveProps(nextProps) {
    if (nextProps.submitSucceeded) this.setState({ open: true })
  }
  render() {
    const {
      dispatch,
      error,
      handleSubmit,
      invalid,
      pristine,
      reset,
      submitSucceeded,
      submitting,
    } = this.props
    return (
      <div className="page">
        <section className="section-margin">
          <Card>
            <CardTitle title="Request Estimate" subtitle="Enter your information" />
            <form onSubmit={handleSubmit(values => dispatch(fetchRequestEstimate(values)))} >
              <CardText>
                <Field name="firstName" component={renderTextField} label="First Name" fullWidth={true} />
                <Field name="lastName" component={renderTextField} label="Last Name" fullWidth={true} />
                <Field name="phone" component={renderTextField} label="Phone" fullWidth={true} />
                <Field name="email" component={renderTextField} label="Email" fullWidth={true} />
                <br/><br/>
                <Field name="date" component={DatePicker} autoOk={true} format={null} floatingLabelText="Move Date" hintText="Move Date" fullWidth={true} />
                <Field name="from" component={renderTextField} label="From" fullWidth={true} />
                <Field name="to" component={renderTextField} label="To" fullWidth={true} />
                <Field
                  name="Size"
                  component={renderSelectField}
                  label="Select Move Size"
                  fullWidth={true}
                >
                  <MenuItem value="Small Studio" primaryText="Small Studio" />
                  <MenuItem value="Large Studio" primaryText="Large Studio" />
                  <MenuItem value="1 Bedroom Apt" primaryText="1 Bedroom Apt" />
                  <MenuItem value="1 Bedroom Apt Large" primaryText="1 Bedroom Apt Large" />
                  <MenuItem value="2 Bedroom Apt" primaryText="2 Bedroom Apt" />
                  <MenuItem value="2 Bedroom Apt Large" primaryText="2 Bedroom Apt Large" />
                  <MenuItem value="3 Bedroom Apt" primaryText="3 Bedroom Apt" />
                  <MenuItem value="4+ Bedroom Apt" primaryText="4+ Bedroom Apt" />
                  <MenuItem value="2 Bedroom House" primaryText="2 Bedroom House" />
                  <MenuItem value="3 Bedroom House" primaryText="3 Bedroom House" />
                  <MenuItem value="4+ Bedroom House" primaryText="4+ Bedroom House" />
                  <MenuItem value="Small Office" primaryText="Small Office" />
                  <MenuItem value="Large Office" primaryText="Large Office" />
                </Field>
                <Field name="note" component={renderTextField} label="Note" fullWidth={true} multiLine={true} rows={2} />
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
                Email was successfully sent!
              </Dialog>
              }
              <div className="button-container">
                <SuccessableButton
                  disabled={pristine || invalid}
                  error={error}
                  label="Request Estimage"
                  reset={reset}
                  submitSucceeded={submitSucceeded}
                  submitting={submitting}
                  successLabel="Estimate Requested!"
                />
              </div>
            </form>
          </Card>
        </section>
      </div>

    )
  }
}

RequestEstimate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool.isRequired,
}

RequestEstimate = reduxForm({
  enableReinitialize: true,
  form: 'contact',
  validate
})(RequestEstimate)

const mapStateToProps = (state) => ({
  user: state.user,
  initialValues: state.user.values
})

RequestEstimate = connect(mapStateToProps)(RequestEstimate)

export default RequestEstimate
