import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import { startUpdateProduct, startDeleteProduct } from '../actions/product'
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

const styles = {
  Card: {
    flex: '1 1 auto',
    width: 300,
    minWidth: 300,
    margin: '1em 1em',
  },
  buttons: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between'
  }
}

class AdminProduct extends Component {
  state = {
    zDepth: 1,
    editing: true
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
  handlePreview = () => {
    this.editor.handleSave()
    this.setState({ editing: false })
  }
  handleEdit = () => {
    console.log('editing')
    this.editor.handleEdit()
    this.setState({ editing: true })
  }
  setEditorRef = (editor) => {
    this.editor = editor
  }
  render() {
    const { handleSubmit, _id, dispatch, image } = this.props
    return (
      <Card
        style={styles.Card}
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <form
          onSubmit={handleSubmit((values) => {
            const image = this.editor.getBase64()
            console.log(image.length)
            dispatch(startUpdateProduct(values, image))
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
          <div style={styles.buttons}>
            {this.state.editing ?
              <RaisedButton type="button" label="Preview" primary={true} onClick={this.handlePreview}/>
              :
              <div>
                <RaisedButton type="button" label="Edit" primary={true} onClick={this.handleEdit}/>
                <RaisedButton type="submit" label="Update" primary={true}/>
              </div>

            }
            <RaisedButton
              type="button"
              label="X"
              primary={true}
              onClick={() => dispatch(startDeleteProduct(_id))}
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
