import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardMedia, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

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
    zDepth: 1,
    submitted: false,
    editing: false,
    image: null
  }
  componentWillMount() {
    const { image } = this.props.item || null
    const hasImage = image ? true : false
    const imageUrl = image ? image : this.props.placeholdIt
    this.setState({ expanded: hasImage, image: imageUrl })
    this.props.submitSucceeded ? this.setState({ submitted: true }) : this.setState({ submitted: false })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.submitSucceeded) this.setState({ submitted: true, image: nextProps.item.image })
    if (nextProps.dirty) this.setState({ submitted: false })
  }
  editing = (bool) => {
    bool ? this.setState({ submitted: false, editing: true }) : this.setState({ submitted: true, editing: true })
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  setEditorRef = (editor) => this.editor = editor
  render() {
    const { error, handleSubmit, dispatch, item, imageSize, placeholdIt } = this.props
    return (
      <Card
        className="cards"
        style={{ width: 300 }}
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <CSSTransitionGroup
          transitionName="image"
          transitionAppear={true}
          transitionAppearTimeout={900}
          transitionEnter={false}
          transitionLeave={false}
        >
          <form
            onSubmit={handleSubmit((values) => {
              let type, image
              if (this.state.editing) {
                type = 'UPDATE_ITEM_UPDATE_IMAGE'
                image = this.editor.handleSave()
              } else {
                type = 'UPDATE_ITEM'
                image = item.image
              }
              const update = { type, image, values }
              dispatch(fetchUpdate(item._id, update))
              this.setState({ image: item.image })
            })}
          >
            <CardMedia>
              <ImageForm
                image={this.state.image}
                type="image/jpeg"
                editing={this.editing}
                width={imageSize.width}
                height={imageSize.height}
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
              {error && <strong style={{ color: 'rgb(244, 67, 54)' }}>{error}</strong>}
            </CardText>
            <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between' }}>
              <RaisedButton
                type="submit"
                label={this.state.submitted ? "Updated" : "Update"}
                labelColor="#ffffff"
                primary={this.state.submitted ? false : true}
                backgroundColor={this.state.submitted ? "#4CAF50" : null }
                style={{ flex: '1 1 auto', margin: 8 }}
              />
              <RaisedButton
                type="button"
                label="X"
                primary={true}
                style={{ flex: '1 1 auto', margin: 8 }}
                onTouchTap={() => dispatch(fetchDelete(item._id))}
              />
            </div>
          </form>
        </CSSTransitionGroup>
      </Card>
    )
  }
}

AdminProduct = compose(
  connect((state, props) => ({form: `product_${props.item._id}`})),
  reduxForm({destroyOnUnmount: false, asyncBlurFields: [], validate}))(AdminProduct)

export default AdminProduct
