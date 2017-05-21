import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardMedia, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import AdminCards from '../../cards/containers/AdminCards'
import { fetchUpdate, fetchDelete } from '../actions/index'
import ImageForm from '../../images/components/ImageForm'
import RichTextMarkdown from '../../RichTextMarkdown'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

const renderRichField = ({ input, meta: { touched, error } }) => (
  <div style={{ margin: '16px 0 8px 0'}}>
    <label style={{ color: 'rgba(0, 0, 0, 0.3)', fontSize: 12 }}>Text</label>
    <RichTextMarkdown {...input} />
    {touched && (error && <div className="formValidationErrorText">{error}</div>)}
  </div>
)



class AdminSectionItem extends Component {
  state = {
    expanded: false,
    submitted: false,
    editing: false,
    image: null
  }
  componentWillMount() {
    const { image } = this.props.item || null
    const hasImage = image ? true : false
    const imageUrl = image ? image : 'https://placehold.it/1000x1000'
    if (hasImage) {
      this.setState({ expanded: hasImage, image: imageUrl })
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    const { submitSucceeded, dirty, item } = nextProps
    console.log({ submitSucceeded, dirty })
    if (submitSucceeded) this.setState({ submitted: true, image: item.image })
    if (dirty) this.setState({ submitted: false })
  }
  editing = (bool) => {
    bool ? this.setState({ submitted: false, editing: true }) : this.setState({ submitted: true, editing: true })
  }
  setEditorRef = (editor) => this.editor = editor
  render() {
    const { error, handleSubmit, dispatch, page, item } = this.props

    return (
      <Card
        expanded={this.state.expanded}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        zDepth={3}
        containerStyle={{ display: 'flex', flexFlow: 'column', height: '100%' }}
        style={{ height: '100%', margin: '130px 0'}}
      >
        <CardActions style={{ display: 'flex' }}>
          <RaisedButton
            type="button"
            label="Remove Section"
            labelColor="#ffffff"
            backgroundColor="#D50000"
            fullWidth={true}
            onTouchTap={() => {
              dispatch(fetchDelete(item._id, item.image))
            }}
          />
        </CardActions>
        <form
          onSubmit={handleSubmit((values) => {
            let type, image
            if (this.state.expanded) {
              if (this.state.editing) {
                type = 'UPDATE_ITEM_UPDATE_IMAGE'
                image = this.editor.handleSave()
              } else {
                type = 'UPDATE_ITEM'
                image = item.image
              }
            } else if (item.image) {
              type = 'UPDATE_ITEM_DELETE_IMAGE'
              image = item.image
            } else {
              type = 'UPDATE_ITEM'
              image = null
            }
            console.log(values)
            const update = { type, image, values }
            dispatch(fetchUpdate(item._id, update))
          })}
        >
          <CardText>
            <Field
              name="height"
              label="height"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="backgroundColor"
              label="backgroundColor"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="backgroundAttachment"
              label="backgroundAttachment"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
          </CardText>
          <CardActions>
            <RaisedButton
              onTouchTap={() => {
                const image = this.state.image || 'https://placehold.it/1000x1000'
                this.setState({ expanded: !this.state.expanded, submitted: false, image })
              }}
              type="button"
              label={this.state.expanded ? "Remove Background Image" : "Add Background Image"}
              labelColor="#ffffff"
              backgroundColor={this.state.expanded ? "#D50000" : "#4CAF50" }
              fullWidth={true}/>
          </CardActions>
          {!this.state.expanded ? null :
            <CardMedia>
              <ImageForm
                image={this.state.image}
                type="image/jpeg"
                editing={this.editing}
                width={1920}
                height={1080}
                ref={this.setEditorRef}
              />
            </CardMedia>
          }

          <CardText>
            <Field
              name="title"
              label="Title"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="titleAlign"
              label="titleAlign"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="text"
              label="Text"
              type="text"
              fullWidth={true}
              component={renderRichField}
            />
            <Field
              name="margin"
              label="Text Margin"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="padding"
              label="Text Padding"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="textWidth"
              label="textWidth"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="textAlign"
              label="textAlign"
              type="text"
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
            {error && <strong style={{ color: 'rgb(244, 67, 54)' }}>{error}</strong>}
          </CardText>
          <CardActions style={{ display: 'flex' }}>
            <RaisedButton
              type="submit"
              label={this.state.submitted ? "Updated" : "Update"}
              labelColor="#ffffff"
              primary={this.state.submitted ? false : true}
              backgroundColor={this.state.submitted ? "#4CAF50" : null }
              fullWidth={true}
            />
          </CardActions>
        </form>
        <AdminCards page={page} section={item} />
      </Card>
    )
  }
}

AdminSectionItem = compose(
  connect((state, props) => ({
    form: `section_${props.item._id}`
  })),
  reduxForm({
    destroyOnUnmount: false,
    asyncBlurFields: []
  }))(AdminSectionItem)

export default AdminSectionItem
