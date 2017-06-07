import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardText, CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchUpdate } from '../actions/index'

const validate = values => {
  const errors = {}
  const requiredFields = [ 'name', 'street', 'city', 'state', 'zip' ]
  requiredFields.forEach(field => {
    if (!values[ field ]) {
      errors[ field ] = 'Required'
    }
  })
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

class AddressAdd extends Component {
  state = {
    expanded: false,
  }
  render() {
    const { dispatch, error, handleSubmit } = this.props
    return (
      <form
        onSubmit={handleSubmit((values) => {
          const update = { type: 'ADD_ADDRESS', values }
          dispatch(fetchUpdate(update))
          this.setState({ expanded: false })
        })}
      >
        <Card
          zDepth={1}
          expanded={this.state.expanded}
          className="cards"
        >
          <CardActions>
            <RaisedButton
              onTouchTap={() => this.setState({ expanded: !this.state.expanded })}
              type="button"
              label={this.state.expanded ? "Remove Address" : "Add Address"}
              labelColor="#ffffff"
              backgroundColor={this.state.expanded ? "#D50000" : "#4CAF50" }
              fullWidth={true}/>
          </CardActions>

          <CardText expandable={true}>
            <Field
              name="name"
              label="Full Name"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="street"
              label="Street"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="city"
              label="City"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="state"
              label="State"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="zip"
              label="Zip"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            {error && <strong style={{ color: 'rgb(244, 67, 54)' }}>{error}</strong>}
          </CardText>
          <CardActions expandable={true}>
            <RaisedButton
              type="submit"
              label="Add"
              labelColor="#ffffff"
              primary={true}
              fullWidth={true}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}


export default reduxForm({
  form: 'productAdminAdd',
  validate
})(AddressAdd)
