import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field, submit } from 'redux-form'
import { Card, CardActions, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Popover, { PopoverAnimationVertical } from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

import * as cardActions from '../../cards/actions'
import * as carouselActions from '../../carousels/actions'
import * as productActions from '../../products/actions'
import AdminCards from '../../cards/containers/AdminCards'
import AdminCarousels from '../../carousels/containers/AdminCarousels'
import AdminProducts from '../../products/containers/AdminProducts'
import { fetchUpdate, fetchDelete } from '../actions/index'
import ImageForm from '../../images/components/ImageForm'
import renderTextField from '../../modules/renderTextField'
import renderRichField from '../../modules/renderRichField'
import renderSelectField from '../../modules/renderSelectField'

class AdminSectionItem extends Component {
  state = {
    expanded: false,
    submitted: false,
    openMenu: false,
    component: null,
    action: null
  }
  componentWillMount() {
    const { cards, carousels, products } = this.props
    console.log(this.props)
    if (cards.length) return this.setState({ component: 'Card', action: cardActions.fetchAdd })
    if (carousels.length) return this.setState({ component: 'Carousel Slide', action: carouselActions.fetchAdd })
    if (products.length) return this.setState({ component: 'Product', action: productActions.fetchAdd })
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
  render() {
    const { error, handleSubmit, dispatch, submit, page, section, imageSize, cards, carousels, products } = this.props
    const hasComponents = cards.length || carousels.length || products.length ? true : false
    return (
      <Card
        expanded={this.state.expanded}
        zDepth={3}
        style={{ margin: '64px 0'}}
        containerStyle={{ display: 'flex', flexFlow: 'column', height: '100%' }}
        className="cards"
      >
        <ImageForm
          type="image/jpg"
          handleUpdate={fetchUpdate}
          width={imageSize.width}
          height={imageSize.height}
          ref={this.setEditorRef}
          item={section}
        />
        <form
          onSubmit={handleSubmit((values) => {
            const type = 'UPDATE_VALUES'
            const update = { type, values }
            dispatch(fetchUpdate(section._id, { type: 'UPDATE_VALUES', values}))
          })}
        >
          <CardText>
            <Field
              name="height"
              label="Height px"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="backgroundColor"
              label="Background Color Hexadecimal"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="backgroundAttachment"
              component={renderSelectField}
              label="Select backgroundAttachment"
              fullWidth={true}
            >
              <MenuItem value={null} primaryText="" />
              <MenuItem value="scroll" primaryText="scroll" />
              <MenuItem value="fixed" primaryText="fixed" />
              <MenuItem value="local" primaryText="local" />
              <MenuItem value="inherit" primaryText="inherit" />
            </Field>
            <Field
              name="title"
              label="Title"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="titleAlign"
              component={renderSelectField}
              label="Title Align"
              fullWidth={true}
            >
              <MenuItem value={null} primaryText="" />
              <MenuItem value="left" primaryText="left" />
              <MenuItem value="center" primaryText="center" />
              <MenuItem value="right" primaryText="right" />
            </Field>
            <Field
              name="text"
              label="Text"
              type="text"
              fullWidth={true}
              component={renderRichField}
            />
            <Field
              name="textAlign"
              component={renderSelectField}
              label="Text Align"
              fullWidth={true}
            >
              <MenuItem value={null} primaryText="" />
              <MenuItem value="left" primaryText="left" />
              <MenuItem value="center" primaryText="center" />
              <MenuItem value="right" primaryText="right" />
            </Field>
            <Field
              name="margin"
              label="Title and Text Margin px"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="padding"
              label="Title and Text Padding px"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="color"
              label="Text Color"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            {error && <strong style={{ color: 'rgb(244, 67, 54)' }}>{error}</strong>}
          </CardText>

        </form>
        {cards.length ? <AdminCards cards={cards} section={section} /> : null}
        {carousels.length ? <AdminCarousels carousels={carousels} section={section} /> : null}
        {products.length ? <AdminProducts products={products} section={section} /> : null}
        <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'flex-end' }}>
          <RaisedButton
            type="submit"
            label={this.state.submitted ? "Section Updated" : "Update Section"}
            labelColor="#ffffff"
            primary={this.state.submitted ? false : true}
            backgroundColor={this.state.submitted ? "#4CAF50" : null }
            style={{ margin: '0 4px 8px' }}
            onTouchTap={handleSubmit((values) => {
              const type = 'UPDATE_VALUES'
              const update = { type, values }
              dispatch(fetchUpdate(section._id, { type: 'UPDATE_VALUES', values}))
            })}
          />
          {hasComponents ?
            <RaisedButton
              onTouchTap={this.handleOpen}
              label={`Add New ${this.state.component}`}
              type="button"
              style={{ margin: '0 4px 8px' }}
              onTouchTap={() => {
                const add = { sectionId: section._id }
                dispatch(this.state.action(add))
              }}
            />
            :
            <div>
              <RaisedButton
                onTouchTap={this.handleOpen}
                label="Add Component"
                type="button"
                style={{ margin: '0 4px 8px' }}
              />
              <Popover
                open={this.state.openMenu}
                anchorEl={this.state.anchorEl}
                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                onRequestClose={this.handleClose}
                animation={PopoverAnimationVertical}
              >
                <Menu autoWidth={true}>
                  <MenuItem
                    primaryText="Cards"
                    onTouchTap={() => {
                      const add = { sectionId: section._id }
                      dispatch(cardActions.fetchAdd(add))
                      this.setState({ component: 'Card', openMenu: false, action: cardActions.fetchAdd })
                    }}
                  />
                  <MenuItem
                    primaryText="Carousel"
                    onTouchTap={() => {
                      const add = { sectionId: section._id }
                      dispatch(carouselActions.fetchAdd(add))
                      this.setState({ component: 'Carousel Slide', openMenu: false, action: carouselActions.fetchAdd })
                    }}
                  />
                  <MenuItem
                    primaryText="Products"
                    onTouchTap={() => {
                      const add = { sectionId: section._id }
                      dispatch(productActions.fetchAdd(add))
                      this.setState({ component: 'Product', openMenu: false, action: productActions.fetchAdd })
                    }}
                  />
                </Menu>
              </Popover>
            </div>
          }
          <RaisedButton
            type="button"
            label="Remove Section"
            className="delete-button"
            labelColor="#ffffff"
            onTouchTap={() => {
              dispatch(fetchDelete(section._id, section.image))
            }}
            style={{ margin: '0 8px 8px 4px' }}
          />
        </div>
      </Card>
    )
  }
}

AdminSectionItem = compose(
  connect(({ cards, carousels, products, dispatch }, { section }) => ({
    form: `section_${section._id}`,
    cards: cards.items.filter(item => item.sectionId === section._id),
    carousels: carousels.items.filter(item => item.sectionId === section._id),
    products: products.items.filter(item => item.sectionId === section._id)
  })),
  reduxForm({
    destroyOnUnmount: false,
    asyncBlurFields: []
  }))(AdminSectionItem)

export default AdminSectionItem
