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
  'borderTop',
  'borderBottom',
  'margin'
]

class AdminFooter extends Component {
  state = {
    zDepth: 1,
    imageEdit: false
  }
  componentWillReceiveProps({ submitSucceeded }) {
    if (submitSucceeded) this.setState({ imageEdit: false })
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  handleImageEdit = (bool) => this.setState({ imageEdit: bool, submitted: false })
  handleImageDelete = (_id, update) => {
    this.setState({ imageEdit: false })
    return this.props.dispatch(fetchUpdate(`footer/${_id}`, update))
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
        <CardTitle title="Footer" />
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
          const path = `footer/${_id}`
          if (this.state.imageEdit) {
            const img = this.editor.handleSave()
            const oldImage = image.src
            return dispatch(fetchUpdate(path, { type: 'UPDATE_IMAGE_AND_VALUES', image: img, oldImage, values }))
          }
          return dispatch(fetchUpdate(path, { type: 'UPDATE_VALUES', values }))
        })}
          style={{ flex: '1 1 auto' }}
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
  canvasColor,
  fontFamily,
  initialValues: styles,
  primary1Color,
})

AdminFooter = connect(mapStateToProps)(AdminFooter)

export default AdminFooter
