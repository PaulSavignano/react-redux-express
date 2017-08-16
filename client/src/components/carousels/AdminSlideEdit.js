import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { CardHeader, CardMedia } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import CircularProgress from 'material-ui/CircularProgress'

import renderTextField from '../../components/fields/renderTextField'
import ImageForm from '../../components/images/ImageForm'
import { fetchUpdateSub, fetchDeleteSub, stopEditSlide } from '../../actions/carousels'

const fields = [
  'color',
  'mediaBackgroundColor',
  'contentBackgroundColor',
  'title',
  'subtitle'
]

class AdminSlideEdit extends Component {
  state = {
    imageEdit: false
  }
  handleImageEdit = (bool) => {
    this.setState({ imageEdit: bool })
    setTimeout(() => window.dispatchEvent(new Event('resize')), 10)
  }
  handleImageDelete = (_id, update) => {
    const { carouselId } = this.props
    this.setState({ imageEdit: false })
    return this.props.dispatch(fetchUpdateSub(carouselId, _id, update))
  }
  setEditorRef = (editor) => this.editor = editor
  render() {
    const {
      carouselId,
      dispatch,
      error,
      handleSubmit,
      open,
      slide,
      submitting
    } = this.props
    return (
      <Dialog
        actions={
          <div className="button-container">
            <RaisedButton
              onTouchTap={handleSubmit((values) => {
                if (this.state.imageEdit) {
                  const image = this.editor.handleSave()
                  const removeImageSrc = image.src
                  return dispatch(fetchUpdateSub(carouselId, slide._id, { type: 'UPDATE_IMAGE_AND_VALUES', image, removeImageSrc, values }))
                } else {
                  return dispatch(fetchUpdateSub(carouselId, slide._id, { type: 'UPDATE_VALUES', values }))
                }
              })}
              label={submitting ? <CircularProgress key={1} color="#ffffff" size={25} style={{ verticalAlign: 'middle' }} /> : 'UPDATE SLIDE'}
              primary={true}
              style={{ flex: '1 1 auto', margin: 4 }}
            />
            <RaisedButton
              type="button"
              label="Remove Slide"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '1 1 auto', margin: 4 }}
              onTouchTap={() => dispatch(fetchDeleteSub(carouselId, slide._id, slide.image))}
            />
            <RaisedButton
              type="button"
              label="Cancel"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '1 1 auto', margin: 4 }}
              onTouchTap={() => dispatch(stopEditSlide(slide._id))}
            />
          </div>
        }
        modal={false}
        open={open}
        onRequestClose={() => dispatch(stopEditSlide(slide._id))}
        autoScrollBodyContent={true}
        contentStyle={{ width: '100%', maxWidth: 1000 }}
        bodyStyle={{ padding: 8 }}
      >
        <CardHeader title={`Slide ${slide._id}`} titleStyle={{ fontSize: 16 }} />
        <CardMedia>
          <form>
            <ImageForm
              image={slide.image}
              type="image/jpg"
              _id={slide._id}
              onImageEdit={this.handleImageEdit}
              onImageDelete={this.handleImageDelete}
              ref={this.setEditorRef}
            />
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

export default compose(
  connect((state, { slide: { _id, values }}) => ({
    form: `slide_${_id}`,
    initialValues: values
  })),
  reduxForm({
    destroyOnUnmount: false,
    asyncBlurFields: []
  })
)(AdminSlideEdit)
