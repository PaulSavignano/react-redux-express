import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardHeader, CardMedia, CardActions, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import renderTextField from '../../modules/renderTextField'
import { fetchUpdate, fetchDelete } from '../actions/index'
import ImageForm from '../../images/components/ImageForm'

const validate = values => {
  const errors = {}
  if (!values.name) {
    errors.name = 'Please enter a product name'
  }
  if (!values.description) {
    errors.password = 'Please enter a description'
  }
  if (!values.price) {
    errors.password = 'Please enter a price'
  }
  return errors
}

class AdminProductItem extends Component {
  state = {
    zDepth: 1,
    submitted: false,
    editing: false
  }
  componentWillReceiveProps(nextProps) {
    const { submitSucceeded, dirty } = nextProps
    if (submitSucceeded) this.setState({ submitted: true, editing: false })
    if (dirty) this.setState({ submitted: false })
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  editing = (bool) => this.setState({ editing: bool })
  deleteImage = (_id, update) => {
    this.props.dispatch(fetchUpdate(_id, update))
  }
  setEditorRef = (editor) => {
    if (editor) this.editor = editor
  }
  render() {
    const { error, handleSubmit, dispatch, product, imageSpec } = this.props
    return (
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={{ width: 300, height: '100%' }}
        className="cards"
      >
        <CardHeader title={`Product ${product._id}`} titleStyle={{ fontSize: 16 }} />
        <CardMedia>
          <ImageForm
            imageSpec={imageSpec}
            item={product}
            editing={this.editing}
            deleteImage={this.deleteImage}
            ref={this.setEditorRef}
          />
        </CardMedia>
        <form onSubmit={handleSubmit((values) => {
          if (this.state.editing) {
            const image = this.editor.handleSave()
            return dispatch(fetchUpdate(product._id, { type: 'UPDATE_IMAGE_AND_VALUES', image, values }))
          }
          return dispatch(fetchUpdate(product._id, { type: 'UPDATE_VALUES', values }))
        })}
          style={{ flex: '1 1 auto' }}
        >
          <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
            <Field
              name="name"
              label="Name"
              type="text"
              style={{ flex: '1 1 auto', margin: '0 16px' }}
              component={renderTextField}
            />
            <Field
              name="price"
              label="Price"
              type="number"
              style={{ flex: '1 1 auto', margin: '0 16px' }}
              component={renderTextField}
            />
            <Field
              name="description"
              label="Description"
              type="text"
              multiLine={true}
              rows={2}
              style={{ flex: '1 1 auto', margin: '0 16px' }}
              component={renderTextField}
            />
            {error && <strong style={{ color: 'rgb(244, 67, 54)' }}>{error}</strong>}
          </div>

          <div style={{ display: 'flex' }}>
            <RaisedButton
              type="submit"
              label={this.state.submitted ? "Updated Product" : "Update Product"}
              labelColor="#ffffff"
              primary={this.state.submitted ? false : true}
              backgroundColor={this.state.submitted ? "#4CAF50" : null }
              style={{ flex: '1 1 auto', margin: '8px 4px 8px 8px' }}
            />
            <RaisedButton
              type="button"
              label="Remove Product"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '1 1 auto', margin: '8px 8px 8px 4px' }}
              onTouchTap={() => dispatch(fetchDelete(product._id, product.image))}
              />
            </div>
          </form>

      </Card>
    )
  }
}

AdminProductItem = compose(
  connect((state, { product }) => {
    const { values } = product
    return {
      product,
      form: `product_${product._id}`,
      initialValues: {
        ...values,
        price: !values ? null : values.price.toString() || null
      }
    }
  }),
  reduxForm({ destroyOnUnmount: false, asyncBlurFields: [], validate }))(AdminProductItem)

export default AdminProductItem
