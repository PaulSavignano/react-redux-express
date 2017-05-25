import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardMedia, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchUpdate, fetchDelete } from '../actions/index'
import ImageForm from '../../images/components/ImageForm'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

class AddressItem extends Component {
  state = {
    zDepth: 1,
    submitted: false,
    editing: false,
  }
  componentWillMount() {
    this.props.submitSucceeded ? this.setState({ submitted: true }) : this.setState({ submitted: false })
  }
  componentWillReceiveProps(nextProps) {
    const { submitSucceeded, dirty, item } = nextProps
    if (submitSucceeded) this.setState({ submitted: true })
    if (dirty) this.setState({ submitted: false })
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  render() {
    const { error, handleSubmit, dispatch, item, user } = this.props
    return (
      <form
        onSubmit={handleSubmit((values) => {
          const update = { type: 'UPDATE_ITEM', values }
          dispatch(fetchUpdate(item._id, update))
        })}
        style={{ flex: '1 1 auto', width: '100%', margin: 20 }}
      >
        <Card
          zDepth={this.state.zDepth}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          containerStyle={{ display: 'flex', flexFlow: 'column', height: '100%' }}
          style={{ height: '100%' }}
        >
          <CardText>
            <Field
              name="fullName"
              label="Full Name"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="address"
              label="Address"
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
          <CardActions style={{ display: 'flex' }}>
            <RaisedButton
              type="submit"
              label={this.state.submitted ? "Updated" : "Update"}
              labelColor="#ffffff"
              primary={this.state.submitted ? false : true}
              backgroundColor={this.state.submitted ? "#4CAF50" : null }
              style={{ flex: '1 1 auto', margin: 8 }}
            />
            <RaisedButton
              type="button"
              label="X"
              primary={true}
              style={{ flex: '1 1 auto', margin: 8 }}
              onTouchTap={() => {
                dispatch(fetchDelete(item._id, item.image))
              }}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

AddressItem = compose(
  connect((state, props) => ({
    form: `address_${props.item._id}`
  })),
  reduxForm({destroyOnUnmount: false, asyncBlurFields: []}))(AddressItem)

export default AddressItem
