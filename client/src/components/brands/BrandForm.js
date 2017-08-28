import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'

import ImageForm from '../images/ImageForm'
import SuccessableButton from '../../components/buttons/SuccessableButton'
import renderSelectField from '../../components/fields/renderSelectField'
import renderTextField from '../../components/fields/renderTextField'
import { fetchUpdate } from '../../actions/brand'

class BrandForm extends Component {
  state = {
    imageEdit: false,
  }
  handleImageEdit = (bool) => {
    this.setState({ imageEdit: bool })
    setTimeout(() => window.dispatchEvent(new Event('resize')), 10)
  }
  handleImageRemove = (image) => {
    const { dispatch, fetchUpdate, editItem: { item: { _id }}} = this.props
    this.setState({ imageEdit: false })
    return dispatch(fetchUpdate(_id, { type: 'DELETE_IMAGE', image }))
  }
  handleFormSubmit = (values) => {
    const { imageEdit } = this.state
    const { _id, dispatch, form, image } = this.props
    const path = `${form.toLowerCase()}/${_id}`
    const oldImageSrc = image && image.src ? image.src : null
    const newImage = imageEdit ? this.imageEditor.handleSave() : null
    if (imageEdit) {
      return dispatch(fetchUpdate(path, {
        type: 'UPDATE_IMAGE_AND_VALUES',
        image: newImage,
        oldImageSrc,
        values
      }))
    }
    return dispatch(fetchUpdate(path, { type: 'UPDATE_VALUES', values }))
  }
  handleNumberToString = value => {
    if (value) return value.toString()
  }
  setImageFormRef = (imageEditor) => this.imageEditor = imageEditor
  render() {
    const {
      _id,
      backgroundColor,
      dispatch,
      error,
      fields,
      fontFamily,
      form,
      handleSubmit,
      image,
      submitSucceeded,
      submitting
    } = this.props
    return (
      <Card
        className="card"
        style={{ backgroundColor, fontFamily, margin: '48px 0' }}
      >
        <form
          onSubmit={handleSubmit(values => this.handleFormSubmit(values))}
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
          <div className="field-container">
            {fields.map(({ name, type, options }) => {
              const normalizeNumber = type === 'number' ? { normalize: this.handleNumberToString() } : null
              return (
                type === 'select' ?
                  <Field
                    key={name}
                    name={name}
                    component={renderSelectField}
                    label={name}
                    className="field"
                  >
                    {options.map(option => (
                      <MenuItem
                        key={option}
                        value={option}
                        primaryText={option}
                      />
                    ))}
                  </Field>
                :
                <Field
                  key={name}
                  name={name}
                  label={name}
                  type={type}
                  component={renderTextField}
                  className="field"
                  style={{ fontFamily }}
                  {...normalizeNumber}
                />
              )
            })}
          </div>
          {error && <div className="error">{error}</div>}
          <div className="button-container">
            <SuccessableButton
              submitSucceeded={submitSucceeded}
              submitting={submitting}
              label={`update ${form}`}
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
  dispatch: PropTypes.func.isRequired,
  fields: PropTypes.array.isRequired,
  fontFamily: PropTypes.string.isRequired,
  form: PropTypes.string.isRequired,
  image: PropTypes.object,
  initialValues: PropTypes.object,
}

export default reduxForm({})(BrandForm)
