import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'
import { Card, CardTitle } from 'material-ui/Card'

import './brand.css'
import ImageForm from '../images/ImageForm'
import BrandFormField from './BrandFormField'
import SuccessableButton from '../../components/buttons/SuccessableButton'

import { fetchUpdate } from '../../actions/brand'

class BrandForm extends Component {
  state = {
    backgroundImageEdit: false,
    backgroundImageTimeoutId: null,
    deleteBackgroundImage: false,
    deleteImage: false,
    disabled: true,
    imageEdit: false,
    imageTimeoutId: null,
  }
  handleImageEdit = (bool) => {
    const imageTimeoutId = setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
      clearTimeout(this.state.imageTimeoutId)
    }, 9)
    this.setState({
      disabled: false,
      imageEdit: bool,
      imageTimeoutId
    })
  }
  handleBackgroundImageEdit = (bool) => {
    const backgroundImageTimeoutId = setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
      clearTimeout(this.state.backgroundTimeoutId)
    }, 9)
    this.setState({
      backgroundImageEdit: bool,
      backgroundImageTimeoutId,
      disabled: false
    })
  }
  handleImageRemove = () => {
    const { image } = this.props
    const deleteImage = image.src ? true : false
    this.setState({
      imageEdit: false,
      deleteImage,
      disabled: false
    })
  }
  handleBackgroundImageRemove = () => {
    const { backgroundImage } = this.props
    const deleteBackgroundImage = backgroundImage.src ? true : false
    this.setState({
      imageEdit: false,
      deleteBackgroundImage,
      disabled: false
    })
  }
  handleFormSubmit = (values) => {
    const {
      backgroundImageEdit,
      deleteBackgroundImage,
      deleteImage,
      imageEdit,
      path
    } = this.state
    const {
      _id,
      backgroundImage,
      dispatch,
      form,
      image,
    } = this.props
    const newBackgroundImage = backgroundImageEdit ? this.backgroundImageEditor.handleSave() : null
    const newImage = imageEdit ? this.imageEditor.handleSave() : null
    const oldBackgroundImageSrc = backgroundImage && backgroundImage.src ? backgroundImage.src : null
    const oldImageSrc = image && image.src ? image.src : null
    switch(true) {
      case (imageEdit && backgroundImageEdit):
        return dispatch(fetchUpdate({
          path: `${_id}/${form.toLowerCase()}/update-with-image-and-background-image`,
          update: {
            newImage,
            newBackgroundImage,
            oldImageSrc,
            oldBackgroundImageSrc,
            values
          }
        }))
      case (imageEdit && deleteBackgroundImage):
        return dispatch(fetchUpdate({
          path: `${_id}/${form.toLowerCase()}/update-with-image-and-delete-background-image`,
          update: {
            newImage,
            oldImageSrc,
            oldBackgroundImageSrc,
            values,
          }
        }))
      case (backgroundImageEdit && deleteImage):
        return dispatch(fetchUpdate({
          path: `${_id}/${form.toLowerCase()}/update-with-background-image-and-delete-image`,
          update: {
            newBackgroundImage,
            oldImageSrc,
            oldBackgroundImageSrc,
            values
          }
        }))
      case (deleteImage && deleteBackgroundImage):
        return dispatch(fetchUpdate({
          path: `${_id}/${form.toLowerCase()}/update-with-delete-image-and-delete-background-image`,
          update: {
            oldImageSrc,
            oldBackgroundImageSrc,
            values
          }
        }))
      case (imageEdit):
        return dispatch(fetchUpdate({
          path: `${_id}/${form.toLowerCase()}/update-with-image`,
          update: {
            newImage,
            oldImageSrc,
            values
          }
        }))
      case (backgroundImageEdit):
      console.log('hasBackgroundImage')
      console.log(`${_id}/${form.toLowerCase()}/update-with-background-image`)
        return dispatch(fetchUpdate({
          path: `${_id}/${form.toLowerCase()}/update-with-background-image`,
          update: {
            newBackgroundImage,
            oldBackgroundImageSrc,
            values
          }
        }))
      case (deleteImage):
        return dispatch(fetchUpdate({
          path: `${_id}/${form.toLowerCase()}/update-with-delete-image`,
          update: {
            oldImageSrc,
            values
          }
        }))
      case (deleteBackgroundImage):
        return dispatch(fetchUpdate({
          path: `${_id}/${form.toLowerCase()}/update-with-delete-background-image`,
          update: {
            oldBackgroundImageSrc,
            values
          }
        }))
      default:
        return dispatch(fetchUpdate({
          path: `${_id}/${form.toLowerCase()}/update-values`,
          update: {
            values
          }
        }))
    }
  }
  componentWillReceiveProps({ pristine }) {
    if (pristine !== this.props.pristine) this.setState({ disabled: pristine })
  }
  setImageFormRef = (imageEditor) => this.imageEditor = imageEditor
  setBackgroundImageFormRef = (backgroundImageEditor) => this.backgroundImageEditor = backgroundImageEditor
  render() {
    const { disabled } = this.state
    const {
      _id,
      backgroundColor,
      backgroundImage,
      error,
      fields,
      fontFamily,
      form,
      handleSubmit,
      image,
      reset,
      submitSucceeded,
      submitting,
    } = this.props
    console.log('inside brand form')
    return (
      <Card
        className="brand-form"
        style={{ backgroundColor, fontFamily }}
      >
        <form
          onSubmit={handleSubmit(this.handleFormSubmit)}
        >
          <CardTitle title={`${form}`} />
          {image &&
            <ImageForm
              key={1}
              image={image}
              label="image"
              type="image/jpg"
              onImageEdit={this.handleImageEdit}
              onImageRemove={this.handleImageRemove}
              ref={this.setImageFormRef}
            />
          }
          {backgroundImage &&
            <ImageForm
              key={2}
              image={backgroundImage}
              label="backgroundImage"
              type="image/jpg"
              onImageEdit={this.handleBackgroundImageEdit}
              onImageRemove={this.handleBackgroundImageRemove}
              ref={this.setBackgroundImageFormRef}
            />
          }
          <div className="field-container">
            {fields.map(({ max, min, name, options, type }) => (
              <BrandFormField
                fontFamily={fontFamily}
                key={name}
                max={max}
                min={min}
                name={name}
                options={options}
                type={type}
              />
            ))}
          </div>
          {error && <div className="error">{error}</div>}
          <div className="button-container">
            <SuccessableButton
              disabled={disabled}
              error={error}
              imageEdit={this.state.imageEdit}
              label={`update ${form}`}
              reset={reset}
              submitSucceeded={submitSucceeded}
              submitting={submitting}
              successLabel={`${form} updated!`}
            />
          </div>
        </form>
      </Card>
    )
  }
}

BrandForm.propTypes = {
  _id: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  backgroundImage: PropTypes.object,
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
  fields: PropTypes.array.isRequired,
  fontFamily: PropTypes.string.isRequired,
  form: PropTypes.string.isRequired,
  image: PropTypes.object,
}

export default reduxForm({ enableReinitialize: true })(BrandForm)
