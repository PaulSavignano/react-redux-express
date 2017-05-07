import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardMedia, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchUpdateProduct, fetchDeleteProduct } from '../actions/product'
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

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

class AdminProduct extends Component {
  state = {
    zDepth: 1
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  setEditorRef = (editor) => this.editor = editor
  render() {
    const { handleSubmit, _id, dispatch, image } = this.props
    return (
      <Card
        style={{ flex: '1 1 auto', width: 300, margin: 20 }}
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <form
          onSubmit={handleSubmit((values) => {
            const product = {
              _id,
              image: this.editor.hasUpload() ? this.editor.handleSave() : image,
              values
            }
            dispatch(fetchUpdateProduct(values))
          })}
        >
          <CardMedia>
            <ImageForm
              image={image}
              width={1000}
              height={1000}
              _id={_id}
              ref={this.setEditorRef}
            />
          </CardMedia>
          <CardText>
            <Field
              name="name"
              label="Name"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="price"
              label="Price"
              type="number"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="description"
              label="Description"
              type="text"
              multiLine={true}
              rows={2}
              fullWidth={true}
              component={renderTextField}
            />
          </CardText>
          <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between' }}>
            <RaisedButton type="submit" label="Update" primary={true} style={{ flex: '1 1 auto', margin: 8 }}/>
            <RaisedButton
              type="button"
              label="X"
              primary={true}
              style={{ flex: '1 1 auto', margin: 8 }}
              onTouchTap={() => dispatch(fetchDeleteProduct(_id))}
            />
          </div>
        </form>
      </Card>
    )
  }
}

AdminProduct = compose(
  connect((state, props) => ({form: props._id})),
  reduxForm({destroyOnUnmount: false, asyncBlurFields: [], validate}))(AdminProduct)

export default AdminProduct
