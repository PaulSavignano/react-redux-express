import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import ImageFormHor from '../../images/components/ImageFormHor'
import { fetchAdd } from '../actions/index'


const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

class AdminCarouselAdd extends Component {
  state = {
    image: 'https://placehold.it/300x300',
    submitted: false,
    editing: false
  }
  componentWillReceiveProps(nextProps) {
    nextProps.submitSucceeded ? this.setState({ submitted: true, image: 'https://placehold.it/300x300' }) : null
    nextProps.dirty ? this.setState({ submitted: false }) : null
  }
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
            const image = this.editor.handleSave() || null
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
          style={{ flex: '1 1 auto'}}
        >
          <CardHeader
            title="Add Carousel"
            textStyle={{ width: '100%'}}
          />
          <CardMedia>
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
          <CardActions style={{ marginBottom: 20 }}>
            <RaisedButton type="submit" label="Add" primary={true} fullWidth={true}/>
          </CardActions>
        </form>
    )
  }
}


export default reduxForm({
  form: 'AdminCarouselAdd',
})(AdminCarouselAdd)
