import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardHeader, CardMedia } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import CircularProgress from 'material-ui/CircularProgress'

import ImageForm from '../../components/images/ImageForm'
import renderTextField from '../../components/fields/renderTextField'
import renderWysiwgyField from '../../components/fields/renderWysiwgyField'
import { fetchUpdate, fetchDelete, stopEdit } from '../../actions/products'

const validate = values => {
  const errors = {}
  if (!values.name) errors.name = 'Please enter a product name'
  if (!values.description) errors.password = 'Please enter a description'
  if (!values.price) errors.password = 'Please enter a price'
  return errors
}

const fields = [
  'description',
  'flex',
  'margin',
  'name',
  'price',
  'width'
]

class AdminProductEdit extends Component {
  state = {
    imageEdit: false,
  }
  handleImageEdit = (bool) => {
    this.setState({ imageEdit: bool })
    setTimeout(() => window.dispatchEvent(new Event('resize')), 10)
  }
  handleImageDelete = (_id, update) => {
    this.setState({ imageEdit: false })
    return this.props.dispatch(fetchUpdate(_id, update))
  }
  setEditorRef = (editor) => this.editor = editor
  render() {
    const {
      dispatch,
      error,
      handleSubmit,
      item: {
        _id,
        editing,
        image
      },
      submitting
    } = this.props
    return (
      <Dialog
        actions={
          <div className="button-container">
            <RaisedButton
              onTouchTap={handleSubmit((values) => {
                if (this.state.imageEdit) {
                  const newImage = this.editor.handleSave()
                  const oldImage = image.src
                  return dispatch(fetchUpdate(_id, { type: 'UPDATE_IMAGE_AND_VALUES', image: newImage, oldImage, values }))
                } else {
                  return dispatch(fetchUpdate(_id, { type: 'UPDATE_VALUES', values }))
                }
              })}
              label={submitting ? <CircularProgress key={1} color="#ffffff" size={25} style={{ verticalAlign: 'middle' }} /> : 'UPDATE PRODUCT'}
              primary={true}
              style={{ flex: '1 1 auto', margin: 4 }}
            />
            <RaisedButton
              type="button"
              label="X"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '0 1 auto', margin: 4 }}
              onTouchTap={() => dispatch(fetchDelete(_id))}
            />
            <RaisedButton
              type="button"
              label="Cancel"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '0 1 auto', margin: 4 }}
              onTouchTap={() => dispatch(stopEdit(_id))}
            />
          </div>
        }
        modal={false}
        open={editing}
        onRequestClose={() => dispatch(stopEdit(_id))}
        autoScrollBodyContent={true}
        contentStyle={{ width: '100%', maxWidth: 1000 }}
        bodyStyle={{ padding: 8 }}
      >
        <Card>
          <CardHeader title={`Product ${_id}`} />
          <CardMedia>
            <ImageForm
              image={image}
              type="image/jpg"
              _id={_id}
              onImageEdit={this.handleImageEdit}
              onImageDelete={this.handleImageDelete}
              ref={this.setEditorRef}
            />
          </CardMedia>
          <form>
            <div className="field-container">
              {fields.map(field => (
                <Field
                  key={field}
                  name={field}
                  label={field}
                  className="field"
                  component={renderTextField}
                />
              ))}
            </div>
            <div>
              <Field
                name="detail"
                label="detail"
                component={renderWysiwgyField}
              />
            </div>
          </form>
          {error && <div className="error">{error}</div>}
        </Card>
      </Dialog>
    )
  }
}

export default compose(
  connect((state, { item: { _id, values } }) => ({
    form: `product_${_id}`,
    initialValues: {
      ...values,
      price: values.price && values.price.toString()
    }
  })),
  reduxForm({
    destroyOnUnmount: false,
    asyncBlurFields: [],
    validate
  })
)(AdminProductEdit)
