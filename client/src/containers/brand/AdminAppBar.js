import React, { Component } from 'react'
import { connect } from 'react-redux'
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
    this.setState({ imageEdit: false })
    return this.props.dispatch(fetchUpdate(`appbar/${_id}`, update))
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
      submitSucceeded,
      submitting
    } = this.props
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
            ref={this.setEditorRef}
            fontFamily={fontFamily}
          />
        </CardMedia>
        <form onSubmit={handleSubmit((values) => {
          const path = `appbar/${_id}`
          if (this.state.imageEdit) {
            const img = this.editor.handleSave()
            const oldImage = image.src
            return dispatch(fetchUpdate(path, { type: 'UPDATE_IMAGE_AND_VALUES', image: img, oldImage, values }))
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

AdminAppBar = reduxForm({
  form: 'appBar'
})(AdminAppBar)

const mapStateToProps = ({
  brand: {
    _id,
    appBar: { image, values },
    isFetching,
    theme: { fontFamily, palette: { canvasColor, primary1Color }}
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
