import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import TextField from 'material-ui/TextField'
import { Card, CardMedia, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import ImageForm from '../../images/components/ImageForm'
import { fetchAdd } from '../actions/product'

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
    submitted: false,
    editing: false,
    image: null,
  }
  componentWillMount() {
    this.setState({ image: 'https://placehold.it/1000x1000' })
    this.props.submitSucceeded ? this.setState({ submitted: true }) : this.setState({ submitted: false })
  }
  componentWillReceiveProps(nextProps) {
    nextProps.submitSucceeded ? this.setState({ submitted: true }) : null
    nextProps.dirty ? this.setState({ submitted: false }) : null
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
    const { handleSubmit, _id, dispatch } = this.props
    return (
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <CSSTransitionGroup
          transitionName="image"
          transitionAppear={true}
          transitionAppearTimeout={600}
          transitionEnter={false}
          transitionLeave={false}
        >
          <form
            onSubmit={handleSubmit((values) => {
              let type, image
              if (this.state.editing) {
                console.log('has upload')
                type = 'ADD_ITEM_ADD_IMAGE'
                image = this.editor.handleSave()
              } else {
                type = 'ADD_ITEM'
              }
              const add = { type, image, values }

              dispatch(fetchAdd(add))
              this.props.reset()
              this.setState({ image: 'https://placehold.it/1000x1000' })
            })}
          >
            <CardMedia>
              <ImageForm
                image={this.state.new ? this.state.image : 'https://placehold.it/1000x1000'}
                type="image/jpeg"
                editing={this.editing}
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
              <RaisedButton
                type="submit"
                label="Add"
                label={this.state.submitted ? "Added" : "Add"}
                labelColor="#ffffff"
                primary={this.state.submitted ? false : true}
                backgroundColor={this.state.submitted ? "#4CAF50" : null }
                style={{ flex: '1 1 auto', margin: 8 }}
              />
            </div>
          </form>
        </CSSTransitionGroup>
      </Card>
    )
  }
}


export default reduxForm({
  form: 'productAdminAdd',
  validate
})(AdminProductAdd)
