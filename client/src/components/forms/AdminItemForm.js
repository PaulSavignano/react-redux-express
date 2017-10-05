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
    deleteBackgroundImage: false,
    backgroundTimeoutId: null,
    disabled: true,
    imageEdit: false,
    deleteImage: false,
    imageTimeoutId: null,
    itemForm: null
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
    const backgroundTimeoutId = setTimeout(() => {
      window.dispatchEvent(new Event('resize'))
      clearTimeout(this.state.backgroundTimeoutId)
    }, 9)
    this.setState({
      backgroundImageEdit: bool,
      backgroundTimeoutId,
      disabled: false
    })
  }
  handleImageRemove = () => {
    const { dispatch, editItem: { item: { _id, image }}} = this.props
    const deleteImage = image.src ? true : false
    this.setState({
      disabled: false,
      imageEdit: false,
      deleteImage
    })
  }
  handleBackgroundImageRemove = () => {
    const { dispatch, editItem: { item: { _id, backgroundImage }}} = this.props
    const deleteBackgroundImage = backgroundImage.src ? true : false
    this.setState({
      disabled: false,
      backgroundImageEdit: false,
      deleteBackgroundImage: true
    })
  }
  handleFormSubmit = (values) => {
    const {
      backgroundImageEdit,
      deleteBackgroundImage,
      imageEdit,
      deleteImage,
    } = this.state
    const {
      dispatch,
      editItem: {
        item: {
          _id,
          image,
          backgroundImage,
          pageSlug
        }
      }
    } = this.props
    const oldImageSrc = image && image.src ? image.src : null
    const oldBackgroundImageSrc = backgroundImage && backgroundImage.src ? backgroundImage.src : null
    const newImage = imageEdit ? this.imageEditor.handleSave() : null
    const newBackgroundImage = backgroundImageEdit ? this.backgroundImageEditor.handleSave() : null
    const fetchUpdate = this.state.itemForm.update
    switch(true) {
      case (imageEdit && backgroundImageEdit):
        return dispatch(fetchUpdate({
          _id,
          path: 'update-with-image-and-background-image',
          update: {
            newImage,
            newBackgroundImage,
            oldImageSrc,
            oldBackgroundImageSrc,
            pageSlug,
            values
          }
        }))
      case (imageEdit && deleteBackgroundImage):
        return dispatch(fetchUpdate({
          _id,
          path: 'update-with-image-and-delete-background-image',
          update: {
            newImage,
            oldImageSrc,
            oldBackgroundImageSrc,
            pageSlug,
            values
          }
        }))
      case (backgroundImageEdit && deleteImage):
        return dispatch(fetchUpdate({
          _id,
          path: 'update-with-background-image-and-delete-image',
          update: {
            newBackgroundImage,
            oldImageSrc,
            oldBackgroundImageSrc,
            pageSlug,
            values
          }
        }))
      case (deleteImage && deleteBackgroundImage):
        return dispatch(fetchUpdate({
          _id,
          path: 'update-with-delete-image-and-delete-background-image',
          update: {
            oldImageSrc,
            oldBackgroundImageSrc,
            pageSlug,
            values
          }
        }))
      case (imageEdit):
        return dispatch(fetchUpdate({
          _id,
          path: 'update-with-image',
          update: {
            newImage,
            oldImageSrc,
            pageSlug,
            values
          }
        }))
      case (backgroundImageEdit):
        return dispatch(fetchUpdate({
          _id,
          path: 'update-with-background-image',
          update: {
            newBackgroundImage,
            oldBackgroundImageSrc,
            pageSlug,
            values
          }
        }))
      case (deleteImage):
        return dispatch(fetchUpdate({
          _id,
          path: 'update-with-delete-image',
          update: {
            oldImageSrc,
            values
          }
        }))
      case (deleteBackgroundImage):
        return dispatch(fetchUpdate({
          _id,
          path: 'update-with-delete-background-image',
          update: {
            oldBackgroundImageSrc,
            values
          }
        }))
      default:
        return dispatch(fetchUpdate({
          _id,
          path: 'update-values',
          update: {
            values,
          }
        }))
    }
  }
  handleDelete = () => {
    const { dispatch, editItem: { item: { _id }, kind }} = this.props
    if (window.confirm(`Are you sure you want to delete ${kind.toLowerCase()}?`)) {
      return dispatch(this.state.itemForm.delete(_id))
    }
  }
  handleStopEdit = () => this.props.dispatch(stopEdit())
  componentWillMount() {
    const { editItem: { kind }} = this.props
    const itemForm = adminItemForms.find(form => form.name === kind)
    this.setState({ itemForm })
  }
  componentWillReceiveProps({
    invalid,
    pristine,
  }) {
    if (invalid !== this.props.invalid) this.setState({ disabled: invalid })
    if (pristine !== this.props.pristine) this.setState({ disabled: pristine })
  }
  setImageFormRef = (imageEditor) => this.imageEditor = imageEditor
  setBackgroundImageFormRef = (backgroundImageEditor) => this.backgroundImageEditor = backgroundImageEditor
  render() {
    const {
      backgroundImageEdit,
      disabled,
      imageEdit
    } = this.state
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
              disabled={disabled}
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
              const format = value => value === undefined ? undefined : value.toString()
              switch(type) {
                case 'select':
                  return <Field
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
                case 'wysiwgy':
                  return <Field
                    className="field"
                    component={renderWysiwgyField}
                    key={name}
                    label={name}
                    name={name}
                    type={type}
                         />
                case 'number':
                  return <Field
                    className="field"
                    component={renderTextField}
                    key={name}
                    label={name}
                    name={name}
                    type={type}
                    format={format}
                         />
                default:
                  return <Field
                    className="field"
                    component={renderTextField}
                    key={name}
                    label={name}
                    name={name}
                    type={type}
                         />
              }
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
