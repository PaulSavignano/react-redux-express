import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardMedia, CardText } from 'material-ui/Card'
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
    zDepth: 1,
    submitted: false,
    editing: false,
    image: null
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  componentWillMount() {
    const { image } = this.props.carousel || null
    const hasImage = image ? true : false
    const imageUrl = image ? image : this.props.placeholdit
    this.setState({ expanded: hasImage, image: imageUrl })
    this.props.submitSucceeded ? this.setState({ submitted: true }) : this.setState({ submitted: false })
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.submitSucceeded) this.setState({ submitted: true, image: nextProps.carousel.image })
    if (nextProps.dirty) this.setState({ submitted: false })
  }
  editing = (bool) => {
    bool ? this.setState({ submitted: false, editing: true }) : this.setState({ submitted: true, editing: true })
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  setEditorRef = (editor) => this.editor = editor
  render() {
    const { error, handleSubmit, dispatch, carousel, imageSize } = this.props
    return (
      <form
        onSubmit={handleSubmit((values) => {
          let type, image
          if (this.state.editing) {
            type = 'UPDATE_ITEM_UPDATE_IMAGE'
            image = this.editor.handleSave()
          } else {
            type = 'UPDATE_ITEM'
            image = carousel.image
          }
          const update = { type, image, values }
          dispatch(fetchUpdate(carousel._id, update))
          this.setState({ image: carousel.image })
        })}
        style={{ flex: '1 1 auto', margin: '32px 16px' }}
      >
        <Card
          zDepth={this.state.zDepth}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <CardMedia>
            <ImageFormHor
              image={this.state.image}
              type="image/png"
              editing={this.editing}
              width={imageSize.width}
              height={imageSize.height}
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
            {error && <strong style={{ color: 'rgb(244, 67, 54)' }}>{error}</strong>}
          </CardText>
          <CardActions style={{ display: 'flex' }}>
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
              onTouchTap={() => {
                dispatch(fetchDelete(carousel._id, carousel.image))
              }}
            />
          </CardActions>
        </Card>

      </form>
    )
  }
}

AdminCarouselItem = compose(
  connect((state, props) => ({
    form: `carousel_${props.carousel._id}`
  })),
  reduxForm({destroyOnUnmount: false, asyncBlurFields: []}))(AdminCarouselItem)

export default AdminCarouselItem
