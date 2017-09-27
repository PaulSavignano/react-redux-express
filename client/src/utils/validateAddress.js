const validateAddress = values => {
  const errors = {}
  const requiredFields = [ 'name', 'phone', 'street', 'city', 'state', 'zip' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
  if (values.phone && values.phone.length < 14) {
    errors.phone = 'Phone number must be 10 digits'
  }
  if (values.state && values.state.length < 2) {
    errors.state = 'State must be 2 characters'
  }
  if (values.zip && values.zip.length < 5) {
    errors.zip = 'Zip must be 5 characters'
  }
  return errors
}

export default validateAddress
