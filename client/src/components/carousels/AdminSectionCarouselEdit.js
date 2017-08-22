import React, { Component } from 'react'
import PropTypes from 'prop-types'
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

class AdminSectionCarouselEdit extends Component {
  handleRemove = () => {
    const { dispatch, editCarousel } = this.props
    return dispatch(fetchDelete(editCarousel._id))
  }
  handleStopEdit = () => {
    const { dispatch, editCarousel } = this.props
    return dispatch(stopEditCarousel(editCarousel._id))
  }
  render() {
    const {
      dispatch,
      error,
      handleSubmit,
      editCarousel,
      open,
      submitting
    } = this.props
    return (
      <Dialog
        actions={
          <div className="button-container">
            <RaisedButton
              onTouchTap={handleSubmit(values => dispatch(fetchUpdate(editCarousel._id, { values })))}
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
              onTouchTap={this.handleRemove}
            />
            <RaisedButton
              type="button"
              label="Cancel"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '1 1 auto', margin: 4 }}
              onTouchTap={this.handleStopEdit}
            />
          </div>
        }
        modal={false}
        open={open}
        onRequestClose={this.handleStopEdit}
        autoScrollBodyContent={true}
        contentStyle={{ width: '100%', maxWidth: 1000 }}
        bodyStyle={{ padding: 8 }}
      >
        <CardHeader title={`Carousel ${editCarousel._id}`} titleStyle={{ fontSize: 16 }} />
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
  }
}

AdminSectionCarouselEdit.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  editCarousel: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
}

export default reduxForm({})(AdminSectionCarouselEdit)
