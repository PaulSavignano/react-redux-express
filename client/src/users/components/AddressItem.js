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
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className="cards"
      >
        <form
          onSubmit={handleSubmit((values) => {
            const update = { type: 'UPDATE_ADDRESS', _id: item._id, values }
            dispatch(fetchUpdate(item._id, update))
          })}
          style={{ flex: '1 1 auto' }}
        >
          <CardText>
            <Field
              name="name"
              label="Name"
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
            <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between' }}>
              <Field
                name="city"
                label="City"
                type="text"
                component={renderTextField}
                style={{ flex: '1 1 auto' }}
              />
              <Field
                name="state"
                label="State"
                type="text"
                component={renderTextField}
                style={{ flex: '1 1 auto' }}
              />
              <Field
                name="zip"
                label="Zip"
                type="text"
                component={renderTextField}
                style={{ flex: '1 1 auto' }}
              />
            </div>
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
                const update = { type: 'DELETE_ADDRESS', _id: item._id }
                dispatch(fetchUpdate(update))
              }}
            />
          </CardActions>
        </form>
      </Card>
    )
  }
}

AddressItem = compose(
  connect((state, props) => ({
    form: `address_${props.item._id}`
  })),
  reduxForm({destroyOnUnmount: false, asyncBlurFields: []}))(AddressItem)

export default AddressItem
