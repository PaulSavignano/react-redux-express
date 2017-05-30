import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardMedia, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchUpdate, fetchDelete } from '../actions/index'
import ImageForm from '../../images/components/ImageForm'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

class AdminCardItem extends Component {
  state = {
    zDepth: 1,
    expanded: false,
    submitted: false,
    editing: false,
    image: null
  }
  componentWillMount() {
    const { image } = this.props.card || null
    const hasImage = image ? true : false
    const imageUrl = image ? image : this.props.placeholdIt
    this.setState({ expanded: hasImage, image: imageUrl })
    this.props.submitSucceeded ? this.setState({ submitted: true }) : this.setState({ submitted: false })
  }
  componentWillReceiveProps(nextProps) {
    const { submitSucceeded, dirty, card } = nextProps
    if (submitSucceeded) this.setState({ submitted: true, image: card.image })
    if (dirty) this.setState({ submitted: false })
  }
  editing = (bool) => {
    bool ? this.setState({ submitted: false, editing: true }) : this.setState({ submitted: true, editing: true })
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  setEditorRef = (editor) => this.editor = editor
  render() {
    const { error, handleSubmit, dispatch, card, imageSize } = this.props
    const width = !card.values ? null : card.values.width ? card.values.width : null
    return (
      <form
        onSubmit={handleSubmit((values) => {
          let type, image
          if (this.state.expanded) {
            if (this.state.editing) {
              type = 'UPDATE_ITEM_UPDATE_IMAGE'
              image = this.editor.handleSave()
            } else {
              type = 'UPDATE_ITEM'
              image = card.image
            }
          } else if (card.image) {
            type = 'UPDATE_ITEM_DELETE_IMAGE'
            image = card.image
          } else {
            type = 'UPDATE_ITEM'
            image = null
          }
          const update = { type, image, values }
          dispatch(fetchUpdate(card._id, update))
          this.setState({ image: card.image })
        })}
        style={{ flex: '1 1 auto', margin: 32 }}
      >
        <Card
          expanded={this.state.expanded}
          zDepth={this.state.zDepth}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          containerStyle={{ display: 'flex', flexFlow: 'column', height: '100%' }}
          className="cards"
        >
          <CardText>
            <Field
              name="width"
              label="Width px"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="maxWidth"
              label="Max Width px"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="margin"
              label="Margin"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="backgroundColor"
              label="Background Color"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="header"
              label="Header"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
          </CardText>
          <CardActions>
            <RaisedButton
              onTouchTap={() => {
                const image = this.state.image || this.props.placeholdIt
                this.setState({ expanded: !this.state.expanded, submitted: false, image })
              }}
              type="button"
              label={this.state.expanded ? "Remove Image" : "Add Image"}
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
              ref={this.setEditorRef}
            />
          </CardMedia>
          <CardText>
            <Field
              name="iFrame"
              label="Youtube iFrame src"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            {!card.values ? null : card.values.iFrame ?
              <div style={{ position: 'relative', paddingBottom: '50%'}}>
                <iframe
                  title="google youtube"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  src={card.values.iFrame} frameBorder="0" allowFullScreen>
                </iframe></div>
            : null}
            <Field
              name="title"
              label="Title"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="text"
              label="Text"
              type="text"
              multiLine={true}
              rows={2}
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="color"
              label="Text Color"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="link"
              label="Link to"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            {error && <strong style={{ color: 'rgb(244, 67, 54)' }}>{error}</strong>}
          </CardText>
          <div style={{ flex: '1 1 auto' }}></div>
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
                dispatch(fetchDelete(card._id, card.image))
              }}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

AdminCardItem = compose(
  connect((state, props) => ({
    form: `card_${props.card._id}`
  })),
  reduxForm({destroyOnUnmount: false, asyncBlurFields: []}))(AdminCardItem)

export default AdminCardItem
