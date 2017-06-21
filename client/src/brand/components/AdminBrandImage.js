import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchUpdate } from '../actions/index'
import ImageForm from '../../images/components/ImageForm'

class AdminBrandImage extends Component {
  state = {
    editing: false,
    submitted: false
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.submitSucceeded) this.setState({ submitted: true, editing: false })
    if (nextProps.dirty) this.setState({ submitted: false })
  }
  editing = (bool) => this.setState({ editing: bool })
  deleteImage = (_id, update) => {
    this.props.dispatch(fetchUpdate(_id, update))
  }
  setEditorRef = (editor) => {
    if (editor) this.editor = editor
  }
  render() {
    const { dispatch, handleSubmit, item, imageSpec } = this.props
    return (
      <Card>
        <CardTitle title="Brand Image" />
        <ImageForm
          imageSpec={imageSpec}
          item={item}
          editing={this.editing}
          deleteImage={this.deleteImage}
          ref={this.setEditorRef}
        />
        <form
          onSubmit={handleSubmit((values) => {
            const image = this.editor.handleSave()
            const type = 'UPDATE_IMAGE'
            const update = { type, image }
            dispatch(fetchUpdate(item._id, update))
          })}
        >
          {this.state.editing &&
            <CardActions>
              <RaisedButton
                label="Update"
                type="submit"
                fullWidth={true}
                primary={true}
              />
            </CardActions>

          }
        </form>
      </Card>
    )
  }
}

AdminBrandImage = reduxForm({
  form: 'brandImage'
})(AdminBrandImage)

AdminBrandImage = connect()(AdminBrandImage)

export default AdminBrandImage
