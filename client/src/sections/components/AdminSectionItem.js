import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

import ImageForm from '../../images/components/ImageForm'
import renderTextField from '../../modules/renderTextField'
import renderSelectField from '../../modules/renderSelectField'
import renderWysiwgyField from '../../modules/renderWysiwgyField'
import AdminCardItem from '../../cards/components/AdminCardItem'
import AdminCarouselItem from '../../carousels/components/AdminCarouselItem'
import AdminProductItem from '../../products/components/AdminProductItem'
import * as cardActions from '../../cards/actions'
import * as carouselActions from '../../carousels/actions'
import * as productActions from '../../products/actions'
import { fetchUpdate, fetchDelete } from '../actions/index'


class AdminSectionItem extends Component {
  state = {
    expanded: false,
    submitted: false,
    openMenu: false,
    editing: false
  }
  componentWillReceiveProps(nextProps) {
    const { submitSucceeded, dirty } = nextProps
    if (submitSucceeded) this.setState({ submitted: true })
    if (dirty) this.setState({ submitted: false })
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
  deleteImage = (_id, update) => {
    this.props.dispatch(fetchUpdate(_id, update))
  }
  setEditorRef = (editor) => this.editor = editor
  renderComponents = (components) => {
    const componentList = (component) => {
      const { componentId } = component
      switch(component.type) {
        case 'Card':
          return (
            <AdminCardItem
              key={component._id}
              componentId={componentId}
              imageSpec={{ type: 'image/jpg', width: 1012, height: 675 }}
            />
          )
        case 'Carousel':
          return (
            <AdminCarouselItem
              key={component._id}
              componentId={componentId}
              imageSpec={{ type: 'image/jpg', width: 300, height: 200 }}
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
        default:
          return
      }
    }
    return components.map(component => componentList(component))
  }
  render() {
    const { error, handleSubmit, dispatch, section, imageSpec } = this.props
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
          style={{ margin: '0 0 64px 0'}}
        >

          <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
            <Field
              name="height"
              label="Section Height (px)"
              type="number"
              style={{ flex: '1 1 auto', margin: '0 16px' }}
              component={renderTextField}
            />
            <Field
              name="backgroundColor"
              label="Section backgroundColor"
              type="text"
              style={{ flex: '1 1 auto', margin: '0 16px' }}
              component={renderTextField}
            />
            <Field
              name="backgroundAttachment"
              component={renderSelectField}
              label="Section backgroundAttachment"
              style={{ flex: '1 1 auto', margin: '0 16px' }}
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
            item={section}
            editing={this.editing}
            deleteImage={this.deleteImage}
            ref={this.setEditorRef}
          />
          <div style={{ margin: '0 16px'}}>
            <Field
              name="text"
              label="Text"
              type="text"
              fullWidth={true}
              component={renderWysiwgyField}
            />
          </div>
          <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
            <Field
              name="margin"
              label="Text Container Margin (px)"
              type="text"
              style={{ flex: '1 1 auto', margin: '0px 16px' }}
              component={renderTextField}
            />
            <Field
              name="padding"
              label="Text Container Padding (px)"
              type="text"
              style={{ flex: '1 1 auto', margin: '0px 16px' }}
              component={renderTextField}
            />
            {error && <strong style={{ color: 'rgb(244, 67, 54)' }}>{error}</strong>}
          </div>
          <div style={{ display: 'flex', flexFlow: 'row wrap', margin: '16px 4px 0 4px' }}>
            <RaisedButton
              type="submit"
              label={this.state.submitted ? "Section Updated" : "Update Section"}
              labelColor="#ffffff"
              primary={this.state.submitted ? false : true}
              backgroundColor={this.state.submitted ? "#4CAF50" : null }
              style={{ flex: '1 1 auto', margin: 4 }}
            />
            <RaisedButton
              type="button"
              label="Remove Section"
              className="delete-button"
              labelColor="#ffffff"
              onTouchTap={() => {
                dispatch(fetchDelete(section._id, section.image))
              }}
              style={{ flex: '1 1 auto', margin: 4 }}
            />
          </div>
        </form>
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
                  const add = { sectionId: section._id }
                  dispatch(cardActions.fetchAdd(add))
                  this.setState({ openMenu: false })
                }}
              />
              <MenuItem
                primaryText="Add Slide"
                onTouchTap={() => {
                  const add = { sectionId: section._id }
                  dispatch(carouselActions.fetchAdd(add))
                  this.setState({ openMenu: false })
                }}
              />
              <MenuItem
                primaryText="Add Product"
                onTouchTap={() => {
                  const add = { sectionId: section._id }
                  dispatch(productActions.fetchAdd(add))
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
