import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle, CardMedia } from 'material-ui/Card'

import SuccessableButton from '../../components/buttons/SuccessableButton'
import renderTextField from '../../components/fields/renderTextField'
import ImageForm from '../../components/images/ImageForm'
import { fetchUpdate } from '../../actions/brand'

const fields = [
  'backgroundColor',
  'color',
  'fontFamily',
  'fontSize',
  'fontWeight',
  'letterSpacing',
  'name',
  'navColor',
  'textShadow'
]

class AppBarAdmin extends Component {
  state = {
    zDepth: 1,
    imageEdit: false
  }
  componentWillReceiveProps({ submitSucceeded }) {
    if (submitSucceeded) this.setState({ imageEdit: false })
  }
  handleImageEdit = (bool) => this.setState({ imageEdit: bool })
  handleImageDelete = (_id, update) => {
    this.setState({ imageEdit: false })
    return this.props.dispatch(fetchUpdate(`appbar/${_id}`, update))
  }
  setEditorRef = (editor) => this.editor = editor
  render() {
    const {
      _id,
      backgroundColor,
      dispatch,
      error,
      fontFamily,
      handleSubmit,
      image,
      submitSucceeded,
      submitting,
    } = this.props
    return (
      <Card
        className="card"
        style={{ backgroundColor, fontFamily }}
      >
        <CardTitle
          title="AppBar"
        />
        <CardMedia>
          <ImageForm
            image={image}
            type="image/png"
            _id={_id}
            onImageEdit={this.handleImageEdit}
            onImageDelete={this.handleImageDelete}
            ref={this.setEditorRef}
            fontFamily={fontFamily}
          />
        </CardMedia>
        <form onSubmit={handleSubmit((values) => {
          const path = `appbar/${_id}`
          if (this.state.imageEdit) {
            const img = this.editor.handleSave()
            const removeImageSrc = image.src
            return dispatch(fetchUpdate(path, { type: 'UPDATE_IMAGE_AND_VALUES', image: img, removeImageSrc, values }))
          }
          return dispatch(fetchUpdate(path, { type: 'UPDATE_VALUES', values }))
        })}
        >
          <div className="field-container">
            {fields.map(field => (
              <Field
                key={field}
                name={field}
                label={field}
                component={renderTextField}
                className="field"
                style={{ fontFamily }}
              />
            ))}
          </div>
          {error && <div className="error">{error}</div>}
          <div className="button-container">
            <SuccessableButton
              submitSucceeded={submitSucceeded}
              submitting={submitting}
              label="update appbar"
              successLabel="appbar updated!"
            />
          </div>
        </form>
      </Card>
    )
  }
}

export default reduxForm({ form: 'appBarAdmin' })(AppBarAdmin)
