import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardMedia, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import ImageForm from '../../images/components/ImageForm'
import { startAddProduct } from '../actions/product'

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

class AdminProductAdd extends Component {
  state = {
    zDepth: 1,
    image: null,
  }
  componentWillMount() { this.setState({ image: 'http://placehold.it/1000x1000' })}
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  setEditorRef = (editor) => {
    if (editor) this.editor = editor
  }
  render() {
    const { handleSubmit, _id, dispatch } = this.props
    return (
      <section>
        <Card
          style={{ flex: '1 1 auto', margin: 20 }}
          zDepth={this.state.zDepth}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <form
            onSubmit={handleSubmit((values) => {
              console.log('adding')
              const product = {
                image: this.editor.hasUpload() ? this.editor.handleSave() : null,
                values
              }
              this.props.reset()
              dispatch(startAddProduct(product))
              this.editor.readImage(this.state.image)
            })}
          >
            <CardMedia>
              <ImageForm
                image={this.state.new ? this.state.image : 'http://placehold.it/1000x1000'}
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
              <RaisedButton type="submit" label="Add" primary={true} style={{ flex: '1 1 auto', margin: 8 }}/>
            </div>
          </form>
        </Card>
      </section>
    )
  }
}


export default reduxForm({
  form: 'productAdminAdd',
  validate
})(AdminProductAdd)
