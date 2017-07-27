import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { CardHeader, CardMedia } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import CircularProgress from 'material-ui/CircularProgress'

import ImageForm from '../../components/images/ImageForm'
import renderTextField from '../../components/fields/renderTextField'
import { fetchUpdate, fetchDelete, stopEdit } from '../../actions/products'

const validate = values => {
  const errors = {}
  if (!values.name) errors.name = 'Please enter a product name'
  if (!values.description) errors.password = 'Please enter a description'
  if (!values.price) errors.password = 'Please enter a price'
  return errors
}

class AdminProductEdit extends Component {
  state = {
    zDepth: 1,
    imageEdit: false
  }
  componentWillReceiveProps({ dispatch, submitSucceeded, item }) {
    if (submitSucceeded || !item.editing) dispatch(stopEdit(item._id))
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  handleImageEdit = (bool) => this.setState({ imageEdit: bool })
  handleImageDelete = (_id, update) => {
    const { dispatch } = this.props
    this.setState({ imageEdit: false })
    return dispatch(fetchUpdate(_id, update))
  }
  setEditorRef = (editor) => this.editor = editor
  render() {
    const { dispatch, error, handleSubmit, item, submitSucceeded, submitting } = this.props
    return (
      <Dialog
        actions={
          <div className="button-container">
            <RaisedButton
              onTouchTap={handleSubmit((values) => {
                if (this.state.imageEdit) {
                  const image = this.editor.handleSave()
                  return dispatch(fetchUpdate(item._id, { type: 'UPDATE_IMAGE_AND_VALUES', image, values }))
                }
                return dispatch(fetchUpdate(item._id, { type: 'UPDATE_VALUES', values }))
              })}
              label={submitting ? <CircularProgress key={1} color="#ffffff" size={25} style={{ verticalAlign: 'middle' }} /> : 'UPDATE PRODUCT'}
              primary={true}
              style={{ flex: '1 1 auto', margin: 4 }}
            />
            <RaisedButton
              type="button"
              label="Remove Product"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '1 1 auto', margin: 4 }}
              onTouchTap={() => dispatch(fetchDelete(item._id, item.image))}
            />
            <RaisedButton
              type="button"
              label="Cancel"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '1 1 auto', margin: 4 }}
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

        <CardHeader title={`Product ${item._id}`} titleStyle={{ fontSize: 16 }} />
        <CardMedia>
          <ImageForm
            image={item.image}
            type="image/jpg"
            _id={item._id}
            onImageEdit={this.handleImageEdit}
            onImageDelete={this.handleImageDelete}
            ref={this.setEditorRef}
          />
        </CardMedia>
        <form>
          <div className="field-container">
            <Field
              name="margin"
              label="margin"
              className="field"
              component={renderTextField}
            />
            <Field
              name="name"
              label="name"
              className="field"
              component={renderTextField}
            />
            <Field
              name="price"
              label="price"
              type="number"
              className="field"
              component={renderTextField}
            />
            <Field
              name="width"
              label="width"
              className="field"
              component={renderTextField}
            />
          </div>
          <div className="field-container">
            <Field
              name="description"
              label="description"
              multiLine={true}
              rows={2}
              className="field"
              component={renderTextField}
            />
          </div>
        </form>
        {error && <div className="error">{error}</div>}
      </Dialog>
    )
  }
}

AdminProductEdit = compose(
  connect((state, { item }) => {
    const values = item.values || {}
    return {
      form: `product_${item._id}`,
      item,
      initialValues: {
        ...values,
        price: values.price && values.price.toString()
      }
    }
  }),
  reduxForm({ destroyOnUnmount: false, asyncBlurFields: [], validate }))(AdminProductEdit)

export default AdminProductEdit
