import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import ImageUpload from '../../images/components/ImageUpload'
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

const styles = {
  Card: {
    flex: '1 1 auto',
    width: 300,
    minWidth: 300,
    margin: '1em 1em',
  }
}

class AdminProductAdd extends Component {
  state = {
    zDepth: 1,
  }
  handleMouseEnter = () => {
    this.setState({
      zDepth: 4,
    })
  }
  handleMouseLeave = () => {
    this.setState({
      zDepth: 1,
    })
  }
  setEditorRef = (editor) => {
    if (editor) this.editor = editor
  }
  handleSave = () => {
    const canvas = this.editor.getImage()
    console.log(canvas)
  }
  render() {
    const { handleSubmit, _id, dispatch } = this.props
    return (
      <Card
        style={styles.Card}
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <form
          onSubmit={handleSubmit((values) => {
            const image = document.querySelector('[name="' + _id + '"]').toDataURL('image/jpg')
            dispatch(startAddProduct(values, image))
          })}
        >
          <CardMedia>
            <ImageUpload
              image='http://placehold.it/275x250'
              width="300"
              height="300"
            />
          </CardMedia>
          <CardTitle
            children={
              <Field
                name="name"
                label="Name"
                type="text"
                fullWidth={true}
                component={renderTextField}
              />
            }
          />
          <CardText>
            <Field
              name="price"
              label="Price"
              type="number"
              fullWidth={true}
              component={renderTextField}
            />
          </CardText>
          <CardText>
            <Field
              name="description"
              label="Description"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
          </CardText>
          <RaisedButton type="submit" label="Add" primary={true} fullWidth={true} />
        </form>
      </Card>
    )
  }
}


export default reduxForm({
  form: 'productAdminAdd',
  validate
})(AdminProductAdd)
