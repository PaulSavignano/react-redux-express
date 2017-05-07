import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { fetchUpdateCard } from '../actions/card'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

let CardWidth = ({ handleSubmit, submitSucceeded, dispatch, page, card }) => (
  <form
    onBlur={handleSubmit((values) => {
      const update = {
        type: 'UPDATE_WIDTH',
        pageId: page._id,
        cardId: card._id,
        update: {
          width: values.width
        }
      }
      dispatch(fetchUpdateCard(update))
    })}
  >
    <Field
      name="width"
      label="Card Width"
      type="text"
      component={renderTextField}
      fullWidth={true}
      underlineStyle={submitSucceeded ? { borderColor: "#4CAF50" } : null }
    />
  </form>
)

CardWidth = compose(
  connect((state, props) => ({form: `${props.card._id}width`})),
  reduxForm({destroyOnUnmount: false, asyncBlurFields: []}))(CardWidth)

export default CardWidth
