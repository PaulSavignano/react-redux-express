import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { CardHeader, CardMedia } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import CircularProgress from 'material-ui/CircularProgress'

import renderTextField from '../../components/fields/renderTextField'
import { fetchUpdate, fetchDelete, stopEditCarousel } from '../../actions/carousels'

const fields = [
  'height',
  'width',
]

const AdminCarouselEdit = ({
  dispatch,
  error,
  handleSubmit,
  carousel,
  open,
  submitting
}) => (
  <Dialog
    actions={
      <div className="button-container">
        <RaisedButton
          onTouchTap={handleSubmit((values) => dispatch(fetchUpdate(carousel._id, { values })))}
          label={submitting ? <CircularProgress key={1} color="#ffffff" size={25} style={{ verticalAlign: 'middle' }} /> : 'UPDATE SLIDE'}
          primary={true}
          style={{ flex: '1 1 auto', margin: 4 }}
        />
        <RaisedButton
          type="button"
          label="X"
          className="delete-button"
          labelColor="#ffffff"
          style={{ flex: '1 1 auto', margin: 4 }}
          onTouchTap={() => dispatch(fetchDelete(carousel._id))}
        />
        <RaisedButton
          type="button"
          label="Cancel"
          className="delete-button"
          labelColor="#ffffff"
          style={{ flex: '1 1 auto', margin: 4 }}
          onTouchTap={() => dispatch(stopEditCarousel(carousel._id))}
        />
      </div>
    }
    modal={false}
    open={open}
    onRequestClose={() => dispatch(stopEditCarousel(carousel._id))}
    autoScrollBodyContent={true}
    contentStyle={{ width: '100%', maxWidth: 1000 }}
    bodyStyle={{ padding: 8 }}
  >
    <CardHeader title={`Carousel ${carousel._id}`} titleStyle={{ fontSize: 16 }} />
    <CardMedia>
      <form>
        <div className="field-container">
          {fields.map(field => (
            <Field
              key={field}
              name={field}
              label={field}
              className="field"
              component={renderTextField}
            />
          ))}
        </div>
      </form>
    </CardMedia>
    {error && <div className="error">{error}</div>}
  </Dialog>
)

export default compose(
  connect((state, { carousel: { _id, values }}) => ({
    form: `carousel_${_id}`,
    initialValues: values
  })),
  reduxForm({
    destroyOnUnmount: false,
    asyncBlurFields: []
  })
)(AdminCarouselEdit)
