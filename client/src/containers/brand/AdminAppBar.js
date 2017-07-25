import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle, CardMedia } from 'material-ui/Card'

import SuccessableButton from '../../components/buttons/SuccessableButton'
import renderTextField from '../../components/fields/renderTextField'
import ImageForm from '../../components/images/ImageForm'
import { fetchUpdate } from '../../actions/brand'

class AdminAppBar extends Component {
  state = {
    zDepth: 1,
    imageEdit: false
  }
  componentWillReceiveProps({ submitSucceeded }) {
    if (submitSucceeded) this.setState({ imageEdit: false })
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  handleImageEdit = (bool) => this.setState({ imageEdit: bool })
  handleImageDelete = (_id, update) => {
    const { dispatch } = this.props
    this.setState({ imageEdit: false })
    return dispatch(fetchUpdate(`appbar/${_id}`, update))
  }
  setEditorRef = (editor) => this.editor = editor
  render() {
    const {
      _id,
      canvasColor,
      dispatch,
      error,
      fontFamily,
      handleSubmit,
      image,
      isFetching,
      primary1Color,
      submitSucceeded,
      submitting
    } = this.props
    console.log(image)
    return (
      !isFetching &&
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className="card"
        style={{ backgroundColor: canvasColor, fontFamily }}
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
            style={{ fontFamily, backgroundColor: primary1Color, color: canvasColor }}
            ref={this.setEditorRef}
          />
        </CardMedia>
        <form onSubmit={handleSubmit((values) => {
          const path = `appbar/${_id}`
          if (this.state.imageEdit) {
            const img = this.editor.handleSave()
            return dispatch(fetchUpdate(path, { type: 'UPDATE_IMAGE_AND_VALUES', image: img, values }))
          }
          return dispatch(fetchUpdate(path, { type: 'UPDATE_VALUES', values }))
        })}
        >
          <div className="field-container">
            <Field
              name="name"
              label="name"
              type="text"
              component={renderTextField}
              className="field"
              style={{ fontFamily }}
            />
            <Field
              name="backgroundColor"
              label="backgroundColor"
              type="text"
              component={renderTextField}
              className="field"
              style={{ fontFamily }}
            />
            <Field
              name="brandColor"
              label="brandColor"
              type="text"
              component={renderTextField}
              className="field"
              style={{ fontFamily }}
            />
            <Field
              name="brandFontFamily"
              label="brandFontFamily"
              type="text"
              component={renderTextField}
              className="field"
              style={{ fontFamily }}
            />
            <Field
              name="navColor"
              label="navColor"
              type="text"
              component={renderTextField}
              className="field"
              style={{ fontFamily }}
            />
          </div>

          {error && <div className="error">{error}</div>}
          <div className="button-container">
            <SuccessableButton
              submitSucceeded={submitSucceeded}
              submitting={submitting}
              style={{ fontFamily, backgroundColor: primary1Color, color: canvasColor, margin: 4 }}
              label="update appbar"
              successLabel="appbar updated!"
            />
          </div>
        </form>
      </Card>
    )
  }
}

AdminAppBar = reduxForm({
  form: 'appBar'
})(AdminAppBar)

const mapStateToProps = ({
  brand: {
    _id,
    appBar: { image, values },
    isFetching,
    theme: { fontFamily, palette: { canvasColor, primary1Color },  }
  }
}) => ({
  _id,
  canvasColor,
  fontFamily,
  image,
  initialValues: values,
  isFetching,
  primary1Color,
})

AdminAppBar = connect(mapStateToProps)(AdminAppBar)

export default AdminAppBar
