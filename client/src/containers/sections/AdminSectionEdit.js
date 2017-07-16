import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'

import ImageForm from '../../components/images/ImageForm'
import SuccessableButton from '../../components/buttons/SuccessableButton'
import renderTextField from '../../components/fields/renderTextField'
import AdminCardItem from '../cards/AdminCardItem'
import AdminContact from '../users/AdminContact'
import AdminProductItem from '../products/AdminProductItem'
import AdminSlideItem from '../slides/AdminSlideItem'
import * as cardActions from '../../actions/cards'
import * as slideActions from '../../actions/slides'
import * as productActions from '../../actions/products'
import { fetchUpdate, fetchDelete } from '../../actions/sections'

class AdminSectionEdit extends Component {
  state = {
    openMenu: false,
    imageEdit: false
  }
  handleOpen = (e) => {
    e.preventDefault()
    this.setState({
      openMenu: true,
      anchorEl: e.currentTarget,
    })
  }
  handleClose = () => this.setState({ openMenu: false })
  handleImageEdit = (bool) => this.setState({ imageEdit: bool })
  deleteImage = (_id, update) => this.props.dispatch(fetchUpdate(_id, update))
  setEditorRef = (editor) => this.editor = editor
  render() {
    const {
      dispatch,
      error,
      handleSubmit,
      page,
      item,
      submitSucceeded,
      submitting,
      open,
      handleOpen,
      handleClose
    } = this.props
    return (
      <Dialog
        actions={
          <div className="button-container">
            <RaisedButton
              onTouchTap={handleSubmit((values) => {
                if (this.state.editing) {
                  const image = this.editor.handleSave()
                  return dispatch(fetchUpdate(item._id, { type: 'UPDATE_IMAGE_AND_VALUES', image, values }))
                }
                return dispatch(fetchUpdate(item._id, { type: 'UPDATE_VALUES', values }))
              })}
              children={submitting ? <CircularProgress key={1} color="#ffffff" size={30} /> : <div key={2} style={{ color: '#ffffff' }}>UPDATE</div>}
              primary={submitSucceeded ? false : true}
              style={{ flex: '1 1 auto', margin: 4 }}
            />
            <RaisedButton
              type="button"
              label="Remove Card"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '1 1 auto', margin: 4 }}
              onTouchTap={() => dispatch(fetchDelete(item._id, item.image))}
            />
          </div>
        }
        modal={false}
        open={open}
        onRequestClose={handleClose}
        autoScrollBodyContent={true}
        bodyStyle={{ padding: 8 }}
      >
        <ImageForm
          image={item.image}
          type="image/jpg"
          _id={item._id}
          onEdit={this.handleImageEdit}
          deleteImage={this.deleteImage}
          ref={this.setEditorRef}
        />
        <form>
          <div className="field-container">
            <Field
              name="height"
              label="Section Height (px)"
              type="number"
              className="field"
              component={renderTextField}
            />
            <Field
              name="backgroundColor"
              label="Section backgroundColor"
              type="text"
              className="field"
              component={renderTextField}
            />
            <Field
              name="flexFlow"
              label="Component flexFlow"
              className="field"
              component={renderTextField}
            />
          </div>
        </form>
        {error && <div className="error">{error}</div>}
        <div className="button-container">
          <RaisedButton
            onTouchTap={this.handleOpen}
            label="Add Components"
            type="button"
            primary={true}
            style={{ flex: '1 1 auto', margin: 8 }}
          />
          <Popover
            open={this.state.openMenu}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleClose}
            animation={PopoverAnimationVertical}
            style={{ flex: '1 1 auto', width: 'auto' }}
          >
            <Menu autoWidth={true}>
              <MenuItem
                primaryText="Add Card"
                onTouchTap={() => {
                  const add = { pageId: page._id, slug: page.slug, sectionId: item._id }
                  dispatch(cardActions.fetchAdd(add))
                  this.setState({ openMenu: false })
                  handleClose()
                }}
              />
              <MenuItem
                primaryText="Add Slide"
                onTouchTap={() => {
                  const add = { pageId: page._id, slug: page.slug, sectionId: item._id }
                  dispatch(slideActions.fetchAdd(add))
                  this.setState({ openMenu: false })
                  handleClose()
                }}
              />
              <MenuItem
                primaryText="Add Product"
                onTouchTap={() => {
                  const add = { pageId: page._id, sectionId: item._id }
                  dispatch(productActions.fetchAdd(add))
                  this.setState({ openMenu: false })
                  handleClose()
                }}
              />
              <MenuItem
                primaryText="Add Contact Form"
                onTouchTap={() => {
                  const add = { type: 'ADD_CONTACT_FORM' }
                  dispatch(fetchUpdate(item._id, add))
                  this.setState({ openMenu: false })
                  handleClose()
                }}
              />
            </Menu>
          </Popover>
        </div>
      </Dialog>
    )
  }
}

AdminSectionEdit = compose(
  connect((state, { item }) => {
    const values = item.values || {}
    return {
      form: `section_${item._id}`,
      initialValues: {
        ...values,
        height: values.height ? values.height.toString() : null,
      }
    }
  }),
  reduxForm({
    destroyOnUnmount: false,
    asyncBlurFields: []
  }))(AdminSectionEdit)

export default AdminSectionEdit
