import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

import ImageForm from '../../components/images/ImageForm'
import SuccessableButton from '../../components/buttons/SuccessableButton'
import renderTextField from '../../components/fields/renderTextField'
import renderSelectField from '../../components/fields/renderSelectField'
import renderWysiwgyField from '../../components/fields/renderWysiwgyField'
import AdminCardItem from '../cards/AdminCardItem'
import AdminContact from '../users/AdminContact'
import AdminProductItem from '../products/AdminProductItem'
import AdminSlideItem from '../slides/AdminSlideItem'
import * as cardActions from '../../actions/cards'
import * as slideActions from '../../actions/slides'
import * as productActions from '../../actions/products'
import { fetchUpdate, fetchDelete } from '../../actions/sections'

class AdminSectionItem extends Component {
  state = {
    expanded: false,
    openMenu: false,
    editing: false
  }
  handleOpen = (e) => {
    e.preventDefault()
    this.setState({
      openMenu: true,
      anchorEl: e.currentTarget,
    })
  }
  handleClose = () => this.setState({ openMenu: false })
  editing = (bool) => this.setState({ editing: bool })
  deleteImage = (_id, update) => this.props.dispatch(fetchUpdate(_id, update))
  setEditorRef = (editor) => this.editor = editor
  renderComponents = (components) => {
    const componentList = (component) => {
      const { componentId } = component
      switch(component.type) {
        case 'Contact':
          return (
            <AdminContact
              key={component._id}
              sectionId={this.props.section._id}
              componentId={componentId}
            />
          )
        case 'Card':
          return (
            <AdminCardItem
              key={component._id}
              componentId={componentId}
              imageSpec={{ type: 'image/jpg', width: 1012, height: 675 }}
            />
          )
        case 'Product':
          return (
            <AdminProductItem
              key={component._id}
              componentId={componentId}
              imageSpec={{ type: 'image/jpg', width: 1012, height: 675 }}
            />
          )
        case 'Slide':
          return (
            <AdminSlideItem
              key={component._id}
              componentId={componentId}
              imageSpec={{ type: 'image/jpg', width: 300, height: 200 }}
            />
          )
        default:
          return
      }
    }
    return components.map(component => componentList(component))
  }
  render() {
    const { dispatch, error, handleSubmit, page, section, imageSpec, submitSucceeded, submitting } = this.props
    return (
      <Card
        expanded={this.state.expanded}
        zDepth={3}
        containerStyle={{ margin: '0 0 64px 0' }}
      >
        <form
          onSubmit={handleSubmit((values) => {
            if (this.state.editing) {
              const image = this.editor.handleSave()
              return dispatch(fetchUpdate(section._id, { type: 'UPDATE_IMAGE_AND_VALUES', image, values }))
            }
            return dispatch(fetchUpdate(section._id, { type: 'UPDATE_VALUES', values }))
          })}
        >

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
              name="backgroundAttachment"
              component={renderSelectField}
              label="Section backgroundAttachment"
              className="field"
            >
              <MenuItem value={null} primaryText="" />
              <MenuItem value="scroll" primaryText="scroll" />
              <MenuItem value="fixed" primaryText="fixed" />
              <MenuItem value="local" primaryText="local" />
              <MenuItem value="inherit" primaryText="inherit" />
            </Field>
          </div>
          <ImageForm
            imageSpec={imageSpec}
            image={section.image}
            _id={section._id}
            editing={this.editing}
            deleteImage={this.deleteImage}
            ref={this.setEditorRef}
          />
          <div>
            <Field
              name="text"
              component={renderWysiwgyField}
            />
          </div>
          <div className="field-container">
            <Field
              name="margin"
              label="Text Container Margin (px)"
              type="text"
              className="field"
              component={renderTextField}
            />
            <Field
              name="padding"
              label="Text Container Padding (px)"
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
          {error && <div className="error">{error}</div>}
          <div className="button-container">
            <SuccessableButton
              submitSucceeded={submitSucceeded}
              submitting={submitting}
              label="SECTION"
            />
            <RaisedButton
              type="button"
              label="Remove Section"
              className="button delete-button"
              labelColor="#ffffff"
              onTouchTap={() => {
                dispatch(fetchDelete(section._id, section.image))
              }}
              style={{ flex: '1 1 auto', margin: 4 }}
            />
          </div>
        </form>
        <br/>
        <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
          {this.renderComponents(section.components)}
        </div>

        <div style={{ display: 'flex' }}>
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
                  const add = { pageId: page._id, slug: page.slug, sectionId: section._id }
                  dispatch(cardActions.fetchAdd(add))
                  this.setState({ openMenu: false })
                }}
              />
              <MenuItem
                primaryText="Add Slide"
                onTouchTap={() => {
                  const add = { pageId: page._id, slug: page.slug, sectionId: section._id }
                  dispatch(slideActions.fetchAdd(add))
                  this.setState({ openMenu: false })
                }}
              />
              <MenuItem
                primaryText="Add Product"
                onTouchTap={() => {
                  const add = { pageId: page._id, sectionId: section._id }
                  dispatch(productActions.fetchAdd(add))
                  this.setState({ openMenu: false })
                }}
              />
              <MenuItem
                primaryText="Add Contact Form"
                onTouchTap={() => {
                  const add = { type: 'ADD_CONTACT_FORM' }
                  dispatch(fetchUpdate(section._id, add))
                  this.setState({ openMenu: false })
                }}
              />
            </Menu>
          </Popover>
        </div>
      </Card>
    )
  }
}

AdminSectionItem = compose(
  connect((state, { section }) => {
    const values = section.values || {}
    return {
      form: `section_${section._id}`,
      section,
      initialValues: {
        ...values,
        height: values.height ? values.height.toString() : null,
      }
    }
  }),
  reduxForm({
    destroyOnUnmount: false,
    asyncBlurFields: []
  }))(AdminSectionItem)

export default AdminSectionItem
