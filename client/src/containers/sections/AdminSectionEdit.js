import React, { Component } from 'react'
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

import ImageForm from '../../components/images/ImageForm'
import renderTextField from '../../components/fields/renderTextField'
import * as buttonActions from '../../actions/buttons'
import * as cardActions from '../../actions/cards'
import * as iframeActions from '../../actions/iframes'
import * as imageActions from '../../actions/images'
import * as productActions from '../../actions/products'
import * as textActions from '../../actions/texts'
import * as titleActions from '../../actions/titles'
import { fetchUpdate, fetchDelete, stopEdit } from '../../actions/sections'

class AdminSectionEdit extends Component {
  state = {
    openMenu: false,
    imageEdit: false,
    imageDelete: false,
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
    this.setState({ imageEdit: false, imageDelete: true })
  }
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
                <MenuItem
                  primaryText="Button"
                  onTouchTap={() => {
                    const add = { pageId: page._id, slug: page.slug, sectionId: item._id }
                    dispatch(buttonActions.fetchAdd(add))
                    this.setState({ openMenu: false })
                    dispatch(stopEdit(item._id))
                  }}
                />
                <MenuItem
                  primaryText="Card"
                  onTouchTap={() => {
                    const add = { pageId: page._id, slug: page.slug, sectionId: item._id }
                    dispatch(cardActions.fetchAdd(add))
                    this.setState({ openMenu: false })
                    dispatch(stopEdit(item._id))
                  }}
                />
                <MenuItem
                  primaryText="Contact Form"
                  onTouchTap={() => {
                    const add = { type: 'ADD_CONTACT_FORM' }
                    dispatch(fetchUpdate(item._id, add))
                    this.setState({ openMenu: false })
                    dispatch(stopEdit(item._id))
                  }}
                />
                <MenuItem
                  primaryText="Iframe"
                  onTouchTap={() => {
                    const add = { pageId: page._id, sectionId: item._id }
                    dispatch(iframeActions.fetchAdd(add))
                    this.setState({ openMenu: false })
                    dispatch(stopEdit(item._id))
                  }}
                />
                <MenuItem
                  primaryText="Image"
                  onTouchTap={() => {
                    const add = { pageId: page._id, sectionId: item._id }
                    dispatch(imageActions.fetchAdd(add))
                    this.setState({ openMenu: false })
                    dispatch(stopEdit(item._id))
                  }}
                />
                <MenuItem
                  primaryText="Product"
                  onTouchTap={() => {
                    const add = { pageId: page._id, sectionId: item._id }
                    dispatch(productActions.fetchAdd(add))
                    this.setState({ openMenu: false })
                    dispatch(stopEdit(item._id))
                  }}
                />
                <MenuItem
                  primaryText="Text"
                  onTouchTap={() => {
                    const add = { pageId: page._id, sectionId: item._id }
                    dispatch(textActions.fetchAdd(add))
                    this.setState({ openMenu: false })
                    dispatch(stopEdit(item._id))
                  }}
                />
                <MenuItem
                  primaryText="Title"
                  onTouchTap={() => {
                    const add = { pageId: page._id, sectionId: item._id }
                    dispatch(titleActions.fetchAdd(add))
                    this.setState({ openMenu: false })
                    dispatch(stopEdit(item._id))
                  }}
                />
              </Menu>
            </Popover>
            <RaisedButton
              onTouchTap={handleSubmit((values) => {
                if (this.state.imageEdit) {
                  const image = this.editor.handleSave()
                  return dispatch(fetchUpdate(item._id, { type: 'UPDATE_IMAGE_AND_VALUES', image, values }))
                } else if (this.state.imageDelete) {
                  return dispatch(fetchUpdate(item._id, { type: 'DELETE_IMAGE_UPDATE_VALUES', values }))
                } else {
                  return dispatch(fetchUpdate(item._id, { type: 'UPDATE_VALUES', values }))
                }
              })}
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
              onTouchTap={() => dispatch(fetchDelete(item._id, item.image))}
            />
            <RaisedButton
              type="button"
              label="Cancel"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '0 1 auto', margin: 4 }}
              onTouchTap={() => dispatch(stopEdit(item._id))}
            />
          </div>
        }
        modal={false}
        open={item.editing}
        onRequestClose={() => dispatch(stopEdit(item._id))}
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
            <Field
              name="backgroundColor"
              label="backgroundColor"
              className="field"
              component={renderTextField}
            />
            <Field
              name="flexFlow"
              label="flexFlow"
              className="field"
              component={renderTextField}
            />
            <Field
              name="justifyContent"
              label="justifyContent"
              className="field"
              component={renderTextField}
            />
            <Field
              name="alignItems"
              label="alignItems"
              className="field"
              component={renderTextField}
            />
            <Field
              name="margin"
              label="margin"
              className="field"
              component={renderTextField}
            />
            <Field
              name="minHeight"
              label="minHeight"
              className="field"
              component={renderTextField}
            />
            <Field
              name="padding"
              label="padding"
              className="field"
              component={renderTextField}
            />
          </form>
          {error && <div className="error">{error}</div>}
        </Card>
      </Dialog>
    )
  }
}

AdminSectionEdit = compose(
  connect((state, { item }) => {
    const values = item.values || {}
    return {
      form: `section_${item._id}`,
      initialValues: values
    }
  }),
  reduxForm({
    destroyOnUnmount: false,
    asyncBlurFields: []
  }))(AdminSectionEdit)

export default AdminSectionEdit
