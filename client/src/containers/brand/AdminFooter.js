import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle, CardMedia } from 'material-ui/Card'
import MenuItem from 'material-ui/MenuItem'

import SuccessableButton from '../../components/buttons/SuccessableButton'
import renderTextField from '../../components/fields/renderTextField'
import renderSelectField from '../../components/fields/renderSelectField'
import ImageForm from '../../components/images/ImageForm'
import { fetchUpdate } from '../../actions/brand'

class AdminFooter extends Component {
  state = {
    zDepth: 1,
    editing: false
  }
  componentWillReceiveProps({ submitSucceeded }) {
    if (submitSucceeded) this.setState({ editing: false })
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  handleImageEdit = (bool) => this.setState({ editing: bool, submitted: false })
  handleImageDelete = (_id, update) => this.props.dispatch(fetchUpdate(`footer/${_id}`, update))
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
      imageSpec,
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
        style={{ backgroundColor, fontFamily }}
      >
        <CardTitle title="Footer" />
        <CardMedia>
          <ImageForm
            image={image}
            type="image/png"
            _id={_id}
            onImageEdit={this.handleImageEdit}
            onImageDelete={this.handleImageDelete}
            style={{ fontFamily }}
            ref={this.setEditorRef}
          />
        </CardMedia>
        <form onSubmit={handleSubmit((values) => {
          const path = `footer/${_id}`
          if (this.state.editing) {
            const img = this.editor.handleSave()
            return dispatch(fetchUpdate(path, { type: 'UPDATE_IMAGE_AND_VALUES', image: img, values }))
          }
          return dispatch(fetchUpdate(path, { type: 'UPDATE_VALUES', values }))
        })}
          style={{ flex: '1 1 auto' }}
        >
          <div className="field-container">
            <Field
              name="backgroundColor"
              label="backgroundColor"
              component={renderTextField}
              className="field"
              style={{ fontFamily }}
            />
            <Field
              name="color"
              label="color"
              component={renderTextField}
              className="field"
              style={{ fontFamily }}
            />
            <Field
              name="borderTop"
              label="borderTop"
              component={renderTextField}
              className="field"
              style={{ fontFamily }}
            />
            <Field
              name="borderBottom"
              label="borderBottom"
              component={renderTextField}
              className="field"
              style={{ fontFamily }}
            />
            <Field
              name="margin"
              label="margin"
              className="field"
              component={renderTextField}
              style={{ fontFamily }}
            />
          </div>
          {error && <div className="error">{error}</div>}
          <div className="button-container">
            <SuccessableButton
              submitSucceeded={submitSucceeded}
              submitting={submitting}
              style={{ fontFamily, backgroundColor: primary1Color, margin: 4 }}
              label="update footer"
              successLabel="footer updated!"
            />
          </div>
        </form>
      </Card>
    )
  }
}

AdminFooter = reduxForm({
  form: 'footer'
})(AdminFooter)

const mapStateToProps = ({
  brand: {
    _id,
    footer: { image, styles },
    isFetching,
    theme: { fontFamily, palette: { canvasColor, primary1Color } }
  }
}) => ({
  _id,
  image,
  isFetching,
  backgroundColor: canvasColor,
  fontFamily,
  initialValues: styles,
  primary1Color
})

AdminFooter = connect(mapStateToProps)(AdminFooter)

export default AdminFooter
