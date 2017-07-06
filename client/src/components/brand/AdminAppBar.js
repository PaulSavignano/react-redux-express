import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardTitle, CardMedia, CardActions } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import SuccessableButton from '../forms/SuccessableButton'
import renderTextField from '../forms/renderTextField'
import ImageForm from '../images/ImageForm'
import { fetchUpdate } from '../../actions/brand'

class AdminAppBar extends Component {
  state = {
    zDepth: 1,
    editing: false
  }
  componentWillReceiveProps({ submitSucceeded }) {
    if (submitSucceeded) this.setState({ editing: false })
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  editing = (bool) => this.setState({ editing: bool })
  deleteImage = (_id, update) => this.props.dispatch(fetchUpdate(`appbar/${_id}`, update))
  setEditorRef = (editor) => this.editor = editor
  render() {
    const { _id, dispatch, error, handleSubmit, item, imageSpec, submitSucceeded, submitting } = this.props
    return (
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className="cards"
      >
        <CardTitle title="AppBar" />
        <CardMedia>
          <ImageForm
            imageSpec={imageSpec}
            image={item.image}
            _id={_id}
            editing={this.editing}
            deleteImage={this.deleteImage}
            ref={this.setEditorRef}
          />
        </CardMedia>
        <form onSubmit={handleSubmit((values) => {
          const path = `appbar/${_id}`
          if (this.state.editing) {
            const image = this.editor.handleSave()
            return dispatch(fetchUpdate(path, { type: 'UPDATE_IMAGE_AND_VALUES', image, values }))
          }
          return dispatch(fetchUpdate(path, { type: 'UPDATE_VALUES', values }))
        })}
        >
          <div className="field-container">
            <Field
              name="color"
              label="color"
              type="text"
              component={renderTextField}
              className="field"
            />
            <Field
              name="textColor"
              label="textColor"
              type="text"
              component={renderTextField}
              className="field"
            />
          </div>
          {error && <div className="error">{error}</div>}
          <div className="button-container">
            <SuccessableButton
              submitSucceeded={submitSucceeded}
              submitting={submitting}
              label="APPBAR"
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

const mapStateToProps = ({ brand: { appBar: { values } }}) => ({
  initialValues: {
    ...values
  }
})

AdminAppBar = connect(mapStateToProps)(AdminAppBar)

export default AdminAppBar
