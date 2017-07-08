import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardHeader, CardMedia } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import ImageForm from '../../components/images/ImageForm'
import SuccessableButton from '../../components/buttons/SuccessableButton'
import renderTextField from '../../components/fields/renderTextField'
import { fetchUpdate, fetchDelete } from '../../actions/products'

const validate = values => {
  const errors = {}
  if (!values.name) errors.name = 'Please enter a product name'
  if (!values.description) errors.password = 'Please enter a description'
  if (!values.price) errors.password = 'Please enter a price'
  return errors
}

class AdminProductItem extends Component {
  state = {
    zDepth: 1,
    editing: false
  }
  componentWillReceiveProps({ submitSucceeded }) {
    if (submitSucceeded) this.setState({ editing: false })
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  editing = (bool) => this.setState({ editing: bool, submitted: false })
  deleteImage = (_id, update) => this.props.dispatch(fetchUpdate(_id, update))
  setEditorRef = (editor) => this.editor = editor
  render() {
    const { dispatch, error, handleSubmit, item, imageSpec, submitSucceeded, submitting } = this.props
    return (
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={{ width: 300, height: '100%' }}
        className="cards"
      >
        <CardHeader title={`Product ${item._id}`} titleStyle={{ fontSize: 16 }} />
        <CardMedia>
          <ImageForm
            imageSpec={imageSpec}
            image={item.image}
            _id={item._id}
            editing={this.editing}
            deleteImage={this.deleteImage}
            ref={this.setEditorRef}
          />
        </CardMedia>
        <form onSubmit={handleSubmit((values) => {
          if (this.state.editing) {
            const image = this.editor.handleSave()
            return dispatch(fetchUpdate(item._id, { type: 'UPDATE_IMAGE_AND_VALUES', image, values }))
          }
          return dispatch(fetchUpdate(item._id, { type: 'UPDATE_VALUES', values }))
        })}
        >
          <div className="field-container">
            <Field
              name="name"
              label="Name"
              className="field"
              component={renderTextField}
            />
            <Field
              name="price"
              label="Price"
              type="number"
              className="field"
              component={renderTextField}
            />
          </div>
          <div className="field-container">
            <Field
              name="description"
              label="Description"
              multiLine={true}
              rows={2}
              className="field"
              component={renderTextField}
            />
          </div>
          {error && <div className="error">{error}</div>}
          <div className="button-container">
            <SuccessableButton
              submitSucceeded={submitSucceeded}
              submitting={submitting}
              label="PRODUCT"
            />
            <RaisedButton
              type="button"
              label="Remove Product"
              className="button delete-button"
              labelColor="#ffffff"
              onTouchTap={() => dispatch(fetchDelete(item._id, item.image))}
            />
          </div>
        </form>

      </Card>
    )
  }
}

AdminProductItem = compose(
  connect(({ products }, { componentId }) => {
    const item = products.items.find(value => value._id === componentId)
    const values = item.values || {}
    return {
      form: `product_${item._id}`,
      item,
      initialValues: {
        ...values,
        price: !values ? null : values.price.toString() || null
      }
    }
  }),
  reduxForm({ destroyOnUnmount: false, asyncBlurFields: [], validate }))(AdminProductItem)

export default AdminProductItem
