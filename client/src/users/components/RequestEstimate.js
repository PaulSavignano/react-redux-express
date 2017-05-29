import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { DatePicker } from 'redux-form-material-ui'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import FlatButton from 'material-ui/FlatButton'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'



import { fetchRequestEstimate } from '../actions/index'

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

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)


const renderSelectField = ({
  input,
  label,
  meta: {touched, error},
  children,
  ...custom
}) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
)


class RequestEstimate extends Component {
  state = {
    open: false,
  }
  handleClose = () => this.setState({open: false})
  componentWillReceiveProps(nextProps) {
    if (nextProps.submitSucceeded) this.setState({ open: true })
  }
  render() {
    const { dispatch, error, handleSubmit, submitting } = this.props
    return (
      <main>
        <section>
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
              {error && <strong style={{ color: 'rgb(244, 67, 54)' }}>{error}</strong>}
              <CardActions>
                <RaisedButton
                  label="Request Estimate"
                  fullWidth={true}
                  disabled={submitting}
                  type="submit"
                  primary={true}
                />
              </CardActions>
            </form>
          </Card>
        </section>
      </main>
    )
  }
}


RequestEstimate = reduxForm({
  form: 'contact',
  validate
})(RequestEstimate)

const mapStateToProps = (state) => ({
  user: state.user,
  initialValues: state.user.values
})

RequestEstimate = connect(mapStateToProps)(RequestEstimate)

export default RequestEstimate
