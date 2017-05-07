import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import TextField from 'material-ui/TextField'
import { fetchUpdateCard } from '../../actions/card'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

let CarouselText = ({ handleSubmit, submitSucceeded, dispatch, page, card, item }) => (
  <CardText
    onBlur={handleSubmit((values) => {
      const update = {
        type: 'UPDATE_CAROUSEL_TEXT',
        pageId: page._id,
        cardId: card._id,
        update: {
          itemId: item._id,
          text: values.text
        }
      }
      dispatch(fetchUpdateCard(update))
    })}
  >
    <Field
      name="text"
      label="Carousel Text"
      type="text"
      component={renderTextField}
      fullWidth={true}
      underlineStyle={submitSucceeded ? { borderColor: "#4CAF50" } : null }
    />
  </CardText>
)

CarouselText = compose(
  connect((state, props) => ({form: `card${props.card._id}carousel${props.item._id}`})),
  reduxForm({destroyOnUnmount: false, asyncBlurFields: []}))(CarouselText)

export default CarouselText
