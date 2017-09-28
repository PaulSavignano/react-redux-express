import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { CardHeader } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import MenuItem from 'material-ui/MenuItem'
import CircularProgress from 'material-ui/CircularProgress'

import ImageForm from '../images/ImageForm'
import { stopEdit } from '../../actions/editItem'
import adminItemFormContainer from '../../containers/forms/adminItemFormContainer'

import renderSelectField from '../../components/fields/renderSelectField'
import renderTextField from '../fields/renderTextField'
import renderWysiwgyField from '../fields/renderWysiwgyField'

import adminItemForms from './adminItemForms'

class AdminItemForm extends Component {
  state = {
    backgroundImageEdit: false,
    imageEdit: false,
    itemForm: null
  }
  handleImageEdit = (bool) => {
    this.setState({ imageEdit: bool })
    setTimeout(() => window.dispatchEvent(new Event('resize')), 10)
  }
  handleBackgroundImageEdit = (bool) => {
    this.setState({ backgroundImageEdit: bool })
    setTimeout(() => window.dispatchEvent(new Event('resize')), 10)
  }
  handleImageRemove = (image) => {
    const { dispatch, editItem: { item: { _id }}} = this.props
    if (window.confirm('Are you sure you want to delete this image?')) {
      this.setState({ imageEdit: false })
      return dispatch(this.state.itemForm.update(_id, { type: 'DELETE_IMAGE', image }))
    }
  }
  handleBackgroundImageRemove = (image) => {
    const { dispatch, editItem: { item: { _id }}} = this.props
    if (window.confirm('Are you sure you want to delete this image?')) {
      this.setState({ backgroundImageEdit: false })
      return dispatch(this.state.itemForm.update(_id, { type: 'DELETE_BACKGROUND_IMAGE', image }))
    }
  }
  handleFormSubmit = (values) => {
    const { imageEdit, backgroundImageEdit } = this.state
    const { dispatch, editItem: { item: { _id, pageSlug }}, image, backgroundImage } = this.props
    const oldImageSrc = image && image.src ? image.src : null
    const oldBackgroundImageSrc = backgroundImage && backgroundImage.src ? backgroundImage.src : null
    const newImage = imageEdit ? this.imageEditor.handleSave() : null
    const newBackgroundImage = backgroundImageEdit ? this.backgroundImageEditor.handleSave() : null
    const fetchUpdate = this.state.itemForm.update
    if (imageEdit && backgroundImageEdit) {
      return dispatch(fetchUpdate(_id, {
        type: 'UPDATE_IMAGE_AND_BACKGROUND_IMAGE_AND_VALUES',
        image: newImage,
        backgroundImage: newBackgroundImage,
        oldImageSrc,
        oldBackgroundImageSrc,
        pageSlug,
        values
      }))
    }
    if (imageEdit) {
      return dispatch(fetchUpdate(_id, {
        type: 'UPDATE_IMAGE_AND_VALUES',
        image: newImage,
        oldImageSrc,
        pageSlug,
        values
      }))
    }
    if (backgroundImageEdit) {
      return dispatch(fetchUpdate(_id, {
        type: 'UPDATE_BACKGROUND_IMAGE_AND_VALUES',
        backgroundImage: newBackgroundImage,
        oldBackgroundImageSrc,
        pageSlug,
        values
      }))
    }
    return dispatch(fetchUpdate(_id, { type: 'UPDATE_VALUES', values, pageSlug }))
  }
  handleDelete = () => {
    const { dispatch, editItem: { item: { _id }, kind }} = this.props
    if (window.confirm(`Are you sure you want to delete ${kind.toLowerCase()}?`)) {
      return dispatch(this.state.itemForm.delete(_id))
    }
  }
  handleStopEdit = () => this.props.dispatch(stopEdit())
  handleNumberToString = value => {
    if (value) return value.toString()
  }
  componentWillMount() {
    const { editItem: { kind }} = this.props
    const itemForm = adminItemForms.find(form => form.name === kind)
    this.setState({ itemForm })
  }
  setImageFormRef = (imageEditor) => this.imageEditor = imageEditor
  setBackgroundImageFormRef = (backgroundImageEditor) => this.backgroundImageEditor = backgroundImageEditor
  render() {
    const { imageEdit } = this.state
    const {
      error,
      handleSubmit,
      editItem: {
        editing,
        item: { _id, backgroundImage, image },
        kind,
      },
      invalid,
      pristine,
      submitting
    } = this.props
    return (
      !editing ? null :
      <Dialog
        actions={
          <div className="button-container">
            <RaisedButton
              disabled={imageEdit ? !imageEdit : pristine || invalid}
              onTouchTap={handleSubmit(this.handleFormSubmit)}
              label={submitting ?
                <CircularProgress key={1} color="#ffffff" size={25} style={{ verticalAlign: 'middle' }} />
              :
                `UPDATE ${kind}`
              }
              primary={true}
              style={{ flex: '1 1 auto', margin: 4 }}
            />
            <RaisedButton
              type="button"
              label="X"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '0 1 auto', margin: 4 }}
              onTouchTap={this.handleDelete}
            />
            <RaisedButton
              type="button"
              label="Cancel"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '0 1 auto', margin: 4 }}
              onTouchTap={this.handleStopEdit}
            />
          </div>
        }
        modal={false}
        open={editing}
        onRequestClose={this.handleStopEdit}
        autoScrollBodyContent={true}
        contentStyle={{ width: '100%', maxWidth: 1000 }}
        bodyStyle={{ padding: 8 }}
      >
        <CardHeader title={`${kind} ${_id}`}/>
        <form>
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
          <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
            {this.state.itemForm.fields.map(({ name, type, options }) => {
              const normalizeNumber = type === 'number' ? { normalize: this.handleNumberToString() } : null
              return (
                type === 'select' ?
                  <Field
                    key={name}
                    className="field"
                    component={renderSelectField}
                    label={name}
                    name={name}
                  >
                    {options.map(option => (
                      <MenuItem
                        key={option}
                        value={option}
                        primaryText={option}
                      />
                    ))}
                  </Field>
                : type === 'wysiwgy' ?
                  <Field
                    className="field"
                    component={renderWysiwgyField}
                    key={name}
                    label={name}
                    name={name}
                    type={type}
                  />
                :
                <Field
                  className="field"
                  component={renderTextField}
                  key={name}
                  label={name}
                  name={name}
                  type={type}
                  {...normalizeNumber}
                />
              )
            })}
          </div>
        </form>
        {error && <div className="error">{error}</div>}
      </Dialog>
    )
  }
}

AdminItemForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editItem: PropTypes.object.isRequired,
  error: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  initialValues: PropTypes.object,
  submitting: PropTypes.bool.isRequired,
}

export default adminItemFormContainer(compose(
  connect(( state, { editItem }) => ({
    editItem,
    form: `${editItem.kind}_${editItem.item._id}`,
    initialValues: editItem.item.values
  })),
  reduxForm({
    destroyOnUnmount: false,
    asyncBlurFields: []
  })
)(AdminItemForm))
