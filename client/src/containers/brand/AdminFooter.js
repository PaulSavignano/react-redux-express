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
  editing = (bool) => this.setState({ editing: bool, submitted: false })
  deleteImage = (_id, update) => this.props.dispatch(fetchUpdate(_id, update))
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
    return (
      !isFetching &&
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className="cards"
        style={{ backgroundColor, fontFamily }}
      >
        <CardTitle title="Footer" />
        <CardMedia>
          <ImageForm
            imageSpec={imageSpec}
            image={image}
            _id={_id}
            editing={this.editing}
            deleteImage={this.deleteImage}
            ref={this.setEditorRef}
            style={{ fontFamily }}
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
              name="imageAlign"
              component={renderSelectField}
              label="imageAlign"
              className="field"
              style={{ fontFamily }}
            >
              <MenuItem value={null} primaryText="" />
              <MenuItem value="left" primaryText="left" />
              <MenuItem value="right" primaryText="right" />
            </Field>
          </div>
          {error && <div className="error">{error}</div>}
          <div className="button-container">
            <SuccessableButton
              submitSucceeded={submitSucceeded}
              submitting={submitting}
              label="FOOTER"
              style={{ fontFamily, backgroundColor: primary1Color }}
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
