import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardHeader } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import CircularProgress from 'material-ui/CircularProgress'

import renderTextField from '../../components/fields/renderTextField'
import renderWysiwgyField from '../../components/fields/renderWysiwgyField'
import ImageForm from '../../components/images/ImageForm'
import { fetchUpdate, fetchDelete, stopEdit } from '../../actions/cards'

class AdminCardEdit extends Component {
  state = {
    imageEdit: false
  }
  componentWillReceiveProps({ dispatch, submitSucceeded, item }) {
    if (submitSucceeded || !item.editing) {
      dispatch(stopEdit(item._id))
    }
  }
  handleImageEdit = (bool) => this.setState({ imageEdit: bool })
  deleteImage = (_id, update) => this.props.dispatch(fetchUpdate(_id, update))
  setEditorRef = (editor) => this.editor = editor
  render() {
    const {
      dispatch,
      error,
      handleSubmit,
      item,
      submitSucceeded,
      submitting,
      open,
      handleOpen,
      handleClose
    } = this.props
    const values = item.values || {}
    const width = values.width || null
    return (
      <Dialog
        actions={
          <div className="button-container">
            <RaisedButton
              onTouchTap={handleSubmit((values) => {
                if (this.state.editing) {
                  const image = this.editor.handleSave()
                  return dispatch(fetchUpdate(item._id, { type: 'UPDATE_IMAGE_AND_VALUES', image, values }))
                }
                return dispatch(fetchUpdate(item._id, { type: 'UPDATE_VALUES', values }))
              })}
              children={submitting ? <CircularProgress key={1} color="#ffffff" size={30} /> : <div key={2} style={{ color: '#ffffff' }}>UPDATE</div>}
              primary={submitSucceeded ? false : true}
              style={{ flex: '1 1 auto', margin: 4 }}
            />
            <RaisedButton
              type="button"
              label="Remove Card"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '1 1 auto', margin: 4 }}
              onTouchTap={() => dispatch(fetchDelete(item._id, item.image))}
            />
            <RaisedButton
              type="button"
              label="Cancel"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '1 1 auto', margin: 4 }}
              onTouchTap={() => {
                handleClose()
                dispatch(stopEdit(item._id))
              }}
            />
          </div>
        }

        modal={false}
        open={item.editing}
        onRequestClose={handleClose}
        autoScrollBodyContent={true}
        bodyStyle={{ padding: 8 }}
      >
        <form onSubmit={handleSubmit((values) => {
          if (this.state.editing) {
            const image = this.editor.handleSave()
            return dispatch(fetchUpdate(item._id, { type: 'UPDATE_IMAGE_AND_VALUES', image, values }))
          }
          return dispatch(fetchUpdate(item._id, { type: 'UPDATE_VALUES', values }))
        })}
        >
          <ImageForm
            image={item.image}
            type="image/jpg"
            _id={item._id}
            onEdit={this.handleImageEdit}
            deleteImage={this.deleteImage}
            ref={this.setEditorRef}
          />
          <div>
            <Field
              name="text"
              component={renderWysiwgyField}
            />
          </div>
          <div className="field-container">
            <Field
              name="width"
              label="Width"
              type="number"
              className="field"
              component={renderTextField}
            />
            <Field
              name="maxWidth"
              label="maxWidth"
              type="number"
              className="field"
              component={renderTextField}
            />
            <Field
              name="zDepth"
              label="zDepth"
              type="number"
              className="field"
              component={renderTextField}
            />
            <Field
              name="margin"
              label="Margin"
              className="field"
              component={renderTextField}
            />
            <Field
              name="backgroundColor"
              label="backgroundColor"
              className="field"
              component={renderTextField}
            />
            <Field
              name="iFrame"
              label="Card iFrame src"
              className="field"
              component={renderTextField}
            />
            <Field
              name="link"
              label="Card Link"
              className="field"
              component={renderTextField}
            />
          </div>
        </form>
        {error && <div className="error">{error}</div>}
      </Dialog>
    )
  }
}

AdminCardEdit = compose(
  connect((state, { item }) => {
    const values = item.values || {}
    return {
      form: `card_${item._id}`,
      item,
      initialValues: {
        ...values,
        width: values.width ? values.width.toString() : null,
        maxWidth: values.maxWidth ? values.maxWidth.toString() : null,
        zDepth: values.zDepth ? values.zDepth.toString() : null
       }
    }
  }),
  reduxForm({
    destroyOnUnmount: false,
    asyncBlurFields: []
  }))(AdminCardEdit)

export default AdminCardEdit
