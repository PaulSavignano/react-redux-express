import React from 'react'
import { Field, reduxForm } from 'redux-form'
import TextField from 'material-ui/TextField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import Checkbox from 'material-ui/Checkbox'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'firstName', 'lastName', 'email' ]
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
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)


const styles = {
  container: {
    margin: 16
  },
  field: {
    width: '100%'
  }
}

const Checkout = props => {
  const { handleSubmit, pristine, reset, submitting } = props
  return (
    <div style={styles.container}>
      <div>
        <Field name="firstName" component={renderTextField} label="First Name" style={styles.field}/>
      </div>
      <div>
        <Field name="lastName" component={renderTextField} label="Last Name" style={styles.field}/>
      </div>
      <div>
        <Field name="email" component={renderTextField} label="Email" style={styles.field}/>
      </div>
      <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values
        </button>
      </div>
    </div>
  )
}

export default reduxForm({
  form: 'CheckoutForm',  // a unique identifier for this form
  validate,
})(Checkout)
