import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import ImageForm from '../../images/components/ImageForm'
import { fetchAdd } from '../actions/index'


const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

class AdminCardAdd extends Component {
  state = {
    zDepth: 1,
    expanded: false,
    submitted: false,
    editing: false
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  setEditorRef = (editor) => {
    if (editor) this.editor = editor
  }
  editing = (bool) => {
    bool ? this.setState({ submitted: false, editing: true }) : this.setState({ submitted: true, editing: true })
  }
  render() {
    const { error, handleSubmit, page, dispatch } = this.props
    return (
        <form
          onSubmit={handleSubmit((values) => {
            const image = this.state.expanded ? this.editor.handleSave() : null
            const type = image ? 'ADD_ITEM_ADD_IMAGE' : 'ADD_ITEM'
            const add = {
              type,
              pageId: page._id,
              pageName: page.slug,
              image,
              values
            }
            this.props.reset()
            dispatch(fetchAdd(add))
          })}
        >
          <Card
            expanded={this.state.expanded}
            zDepth={this.state.zDepth}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            <CardHeader
              title="Add Card"
              textStyle={{ width: '100%'}}
            />
            <CardText>
              <Field
                name="width"
                label="Width"
                type="number"
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
                onTouchTap={() => this.setState({ expanded: !this.state.expanded })}
                type="button"
                label={this.state.expanded ? "Remove Image" : "Add Image"}
                labelColor="#ffffff"
                backgroundColor={this.state.expanded ? "#D50000" : "#4CAF50" }
                fullWidth={true}/>
            </CardActions>
            <CardMedia expandable={true}>
              <ImageForm
                image='http://placehold.it/1000x1000'
                type="image/jpeg"
                editing={this.editing}
                width={1000}
                height={1000}
                ref={this.setEditorRef}
              />
            </CardMedia>

            <CardText>
              <Field
                name="iFrame"
                label="Youtube iFrame"
                type="text"
                fullWidth={true}
                component={renderTextField}
              />
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
                name="link"
                label="Link to"
                type="text"
                fullWidth={true}
                component={renderTextField}
              />
              {error && <strong>{error}</strong>}
            </CardText>
            <CardActions>
              <RaisedButton type="submit" label="Add" primary={true} fullWidth={true}/>
            </CardActions>
          </Card>
        </form>
    )
  }
}


export default reduxForm({
  form: 'AdminCardAdd',
})(AdminCardAdd)
