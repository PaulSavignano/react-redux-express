import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import TextField from 'material-ui/TextField'

import { fetchUpdateCarousel } from '../../actions/carousel'


const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

let AdminCarouselText = ({ handleSubmit, submitSucceeded, dispatch, page, carousel, item }) => (
  <CardText
    onBlur={handleSubmit((values) => {
      const update = {
        type: 'UPDATE_CAROUSEL_TEXT',
        pageId: page._id,
        carouselId: carousel._id,
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

AdminCarouselText = compose(
  connect((state, props) => ({form: `carousel${props.carousel._id}item${props.item._id}`})),
  reduxForm({destroyOnUnmount: false, asyncBlurFields: []}))(AdminCarouselText)

export default AdminCarouselText
