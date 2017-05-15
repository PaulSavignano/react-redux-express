import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field, reset } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchUpdate, fetchDelete } from '../actions/index'
import ImageFormHor from '../../images/components/ImageFormHor'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

class AdminCarouselItem extends Component {
  state = {
    submitted: false,
    editing: false,
    image: null
  }
  componentWillMount() {
    const { image } = this.props.item || null
    const hasImage = image ? true : false
    const imageUrl = image ? image : 'http://placehold.it/280x60'
    this.setState({ expanded: hasImage, image: imageUrl })
    this.props.submitSucceeded ? this.setState({ submitted: true }) : this.setState({ submitted: false })
  }
  componentWillReceiveProps(nextProps) {
    nextProps.submitSucceeded ? this.setState({ submitted: true, image: nextProps.item.image }) : null
    nextProps.dirty ? this.setState({ submitted: false }) : null
  }
  editing = (bool) => {
    bool ? this.setState({ submitted: false, editing: true }) : this.setState({ submitted: true, editing: true })
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  setEditorRef = (editor) => this.editor = editor
  render() {
    const { error, handleSubmit, dispatch, page, item } = this.props
    return (
      <form
        onSubmit={handleSubmit((values) => {
          let type, image
          if (this.state.editing) {
            console.log('has upload')
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
        style={{ flex: '1 1 auto' }}
      >
        <CardMedia expandable={true}>
          <ImageFormHor
            image={this.state.image}
            type="image/jpeg"
            editing={this.editing}
            width={300}
            height={300}
            ref={this.setEditorRef}
          />
        </CardMedia>
        <CardText>
          <Field
            name="text"
            label="Text"
            type="text"
            multiLine={true}
            rows={2}
            fullWidth={true}
            component={renderTextField}
          />
          {error && <strong>{error}</strong>}
        </CardText>
        <CardActions style={{ display: 'flex' }}>
          <RaisedButton
            type="submit"
            label="Update"
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
            onTouchTap={() => {
              dispatch(fetchDelete(item._id, item.image))
            }}
          />
        </CardActions>
      </form>
    )
  }
}

AdminCarouselItem = compose(
  connect((state, props) => ({
    form: `carousel_${props.item._id}`
  })),
  reduxForm({destroyOnUnmount: false, asyncBlurFields: []}))(AdminCarouselItem)

export default AdminCarouselItem
