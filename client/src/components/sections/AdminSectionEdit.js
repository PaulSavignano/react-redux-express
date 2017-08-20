import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardHeader } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Dialog from 'material-ui/Dialog'
import CircularProgress from 'material-ui/CircularProgress'

import AdminSectionAddComponent from './AdminSectionAddComponent'
import ImageForm from '../images/ImageForm'
import renderTextField from '../fields/renderTextField'
import { fetchAdd as articleAdd } from '../../actions/articles'
import { fetchAdd as buttonAdd } from '../../actions/buttons'
import { fetchAdd as cardAdd } from '../../actions/cards'
import { fetchAdd as carouselAdd } from '../../actions/carousels'
import { fetchAdd as iframeAdd } from '../../actions/iframes'
import { fetchAdd as imageAdd } from '../../actions/images'
import { fetchAdd as productAdd } from '../../actions/products'
import { fetchAdd as textAdd } from '../../actions/texts'
import { fetchAdd as titleAdd } from '../../actions/titles'
import { fetchUpdate, fetchDelete, stopEdit } from '../../actions/sections'

const fields = [
  'backgroundColor',
  'containerMarginTop',
  'flexFlow',
  'justifyContent',
  'alignItems',
  'margin',
  'minHeight',
  'padding',
  'pageLink'
]

const components = [
  { label: 'Article', action: articleAdd },
  { label: 'Button', action: buttonAdd },
  { label: 'Card', action: cardAdd },
  { label: 'Carousel', action: carouselAdd },
  { label: 'Iframe', action: iframeAdd },
  { label: 'Image', action: imageAdd },
  { label: 'Product', action: productAdd },
  { label: 'Text', action: textAdd },
  { label: 'Title', action: titleAdd }
]

class AdminSectionEdit extends Component {
  state = {
    openMenu: false,
    imageEdit: false,
    anchorEl: null
  }
  handleOpenMenu = (e) => {
    e.preventDefault()
    this.setState({
      openMenu: true,
      anchorEl: e.currentTarget,
    })
  }
  handleImageEdit = (bool) => {
    this.setState({ imageEdit: bool })
    setTimeout(() => window.dispatchEvent(new Event('resize')), 10)
  }
  handleImageDelete = (_id, update) => {
    this.setState({ imageEdit: false })
    return this.props.dispatch(fetchUpdate(_id, update))
  }
  handleAddContactForm = () => {
    const { dispatch, item } = this.props
    const add = { type: 'ADD_CONTACT_FORM' }
    dispatch(fetchUpdate(item._id, add))
    this.setState({ openMenu: false })
    dispatch(stopEdit(item._id))
  }
  handleForm = (values) => {
    const { dispatch, item: { _id, image }} = this.props
    if (this.state.imageEdit) {
      const newImage = this.editor.handleSave()
      const remmoveImageSrc = image.src
      return dispatch(fetchUpdate(_id, { type: 'UPDATE_IMAGE_AND_VALUES', image: newImage, remmoveImageSrc, values }))
    } else {
      return dispatch(fetchUpdate(_id, { type: 'UPDATE_VALUES', values }))
    }
  }
  handleStopEdit = () => this.props.dispatch(stopEdit(this.props.item._id))
  handleRemove = () => this.props.dispatch(fetchDelete(this.props.item._id, this.props.item.image))
  setEditorRef = (editor) => this.editor = editor
  render() {
    const {
      dispatch,
      error,
      handleSubmit,
      page,
      item,
      submitting,
    } = this.props
    return (
      <Dialog
        actions={
          <div className="button-container">
            <RaisedButton
              onTouchTap={this.handleOpenMenu}
              label="Add Components"
              type="button"
              primary={true}
              style={{ flex: '1 1 auto', margin: 4 }}
            />
            <Popover
              open={this.state.openMenu}
              anchorEl={this.state.anchorEl}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
              onRequestClose={() => this.setState({ openMenu: false })}
              animation={PopoverAnimationVertical}
              style={{ flex: '1 1 auto', width: 'auto' }}
            >
              <Menu autoWidth={true}>
                {components.map(component => (
                  <AdminSectionAddComponent
                    component={component}
                    dispatch={dispatch}
                    item={item}
                    key={component.label}
                    page={page}
                  />
                ))}
                <MenuItem
                  primaryText="Contact Form"
                  onTouchTap={this.handleAddContactForm}
                />
              </Menu>
            </Popover>
            <RaisedButton
              onTouchTap={handleSubmit(values => this.handleForm(values))}
              label={submitting ? <CircularProgress key={1} color="#ffffff" size={25} style={{ verticalAlign: 'middle' }} /> : 'UPDATE SECTION'}
              primary={true}
              style={{ flex: '0 1 auto', margin: 4 }}
            />
            <RaisedButton
              type="button"
              label="X"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '0 1 auto', margin: 4 }}
              onTouchTap={this.handleRemove}
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
        open={item.editing}
        onRequestClose={this.handleStopEdit}
        autoScrollBodyContent={true}
        contentStyle={{ width: '100%', maxWidth: 1000 }}
        bodyStyle={{ padding: 8 }}
      >
        <Card>
          <CardHeader title={`Section ${item._id}`}/>
          <ImageForm
            image={item.image}
            type="image/jpg"
            _id={item._id}
            onImageEdit={this.handleImageEdit}
            onImageDelete={this.handleImageDelete}
            ref={this.setEditorRef}
          />
          <form className="field-container">
            {fields.map(field => (
              <Field
                key={field}
                name={field}
                label={field}
                className="field"
                component={renderTextField}
              />
            ))}
          </form>
          {error && <div className="error">{error}</div>}
        </Card>
      </Dialog>
    )
  }
}

export default compose(
  connect((state, { item: { _id, values }}) => ({
    form: `section_${_id}`,
    initialValues: values
  })),
  reduxForm({
    destroyOnUnmount: false,
    asyncBlurFields: []
  })
)(AdminSectionEdit)
