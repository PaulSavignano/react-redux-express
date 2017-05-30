import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardMedia, CardText, CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import ImageForm from '../../images/components/ImageForm'
import { fetchAdd } from '../actions/index'

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
    expanded: false,
    submitted: false,
    editing: false,
    image: null,
  }
  componentWillMount() {
    this.setState({ image: this.props.placeholdIt })
    this.props.submitSucceeded ? this.setState({ submitted: true }) : this.setState({ submitted: false })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.submitSucceeded) this.setState({ submitted: true })
    if (nextProps.dirty) this.setState({ submitted: false })
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  editing = (bool) => {
    bool ? this.setState({ submitted: false, editing: true }) : this.setState({ submitted: true, editing: true })
  }
  setEditorRef = (editor) => {
    if (editor) this.editor = editor
  }
  render() {
    const { error, handleSubmit, _id, dispatch, imageSize, placeholdIt } = this.props
    return (
      <form
        onSubmit={handleSubmit((values) => {
            let type, image
          if (this.state.editing) {
              type = 'ADD_ITEM_ADD_IMAGE'
            image = this.editor.handleSave()
          } else {
              type = 'ADD_ITEM'
          }
          const add = { type, image, values }

          dispatch(fetchAdd(add))
          this.props.reset()
          this.setState({ image: placeholdIt, expanded: false })
        })}
      >
        <Card
          zDepth={this.state.zDepth}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          expanded={this.state.expanded}
          className="cards"
        >
          <CardActions>
            <RaisedButton
              onTouchTap={() => {
                this.setState({ expanded: !this.state.expanded })
              }}
              type="button"
              label={this.state.expanded ? "Remove Product" : "Add Product"}
              labelColor="#ffffff"
              backgroundColor={this.state.expanded ? "#D50000" : "#4CAF50" }
              fullWidth={true}/>
          </CardActions>
          <CardMedia expandable={true}>
            <ImageForm
              image={this.state.image}
              type="image/jpeg"
              editing={this.editing}
              width={imageSize.width}
              height={imageSize.height}
              _id={_id}
              ref={this.setEditorRef}
            />
          </CardMedia>
          <CardText expandable={true}>
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
            {error && <strong style={{ color: 'rgb(244, 67, 54)' }}>{error}</strong>}
          </CardText>
          <CardActions expandable={true}>
            <RaisedButton
              type="submit"
              label={this.state.submitted ? "Added" : "Add"}
              labelColor="#ffffff"
              primary={this.state.submitted ? false : true}
              backgroundColor={this.state.submitted ? "#4CAF50" : null }
              fullWidth={true}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}


export default reduxForm({
  form: 'productAdminAdd',
  validate
})(AdminProductAdd)
