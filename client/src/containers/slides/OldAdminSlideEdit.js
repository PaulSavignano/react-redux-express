import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { CardHeader, CardMedia } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import CircularProgress from 'material-ui/CircularProgress'

import renderWysiwgyField from '../../components/fields/renderWysiwgyField'
import { fetchUpdate, fetchDelete, stopEdit } from '../../actions/slides'
import ImageForm from '../../components/images/ImageForm'

class AdminSlideItem extends Component {
  state = {
    imageEdit: false
  }
  componentWillReceiveProps({ dispatch, submitSucceeded, item }) {
    if (submitSucceeded && !item.editing) dispatch(stopEdit(item._id))
  }
  handleImageEdit = (bool) => {
    this.setState({ imageEdit: bool })
    setTimeout(() => window.dispatchEvent(new Event('resize')), 10)
  }
  handleImageDelete = (_id, update) => {
    this.setState({ imageEdit: false })
    return this.props.dispatch(fetchUpdate(_id, update))
  }
  setEditorRef = (editor) => this.editor = editor
  render() {
    const { dispatch, error, handleSubmit, item, submitting } = this.props
    return (
      <Dialog
        actions={
          <div className="button-container">
            <RaisedButton
              onTouchTap={handleSubmit((values) => {
                if (this.state.imageEdit) {
                  const image = this.editor.handleSave()
                  return dispatch(fetchUpdate(item._id, { type: 'UPDATE_IMAGE_AND_VALUES', image, values }))
                }
                return dispatch(fetchUpdate(item._id, { type: 'UPDATE_VALUES', values }))
              })}
              label={submitting ? <CircularProgress key={1} color="#ffffff" size={25} style={{ verticalAlign: 'middle' }} /> : 'UPDATE SLIDE'}
              primary={true}
              style={{ flex: '1 1 auto', margin: 4 }}
            />
            <RaisedButton
              type="button"
              label="Remove Slide"
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
              onTouchTap={() => dispatch(stopEdit(item._id))}
            />
          </div>
        }
        modal={false}
        open={item.editing}
        onRequestClose={() => dispatch(stopEdit(item._id))}
        autoScrollBodyContent={true}
        bodyStyle={{ padding: 8 }}
      >
        <CardHeader title={`Slide ${item._id}`} titleStyle={{ fontSize: 16 }} />
        <CardMedia>
          <form>
            <ImageForm
              image={item.image}
              type="image/jpg"
              _id={item._id}
              onImageEdit={this.handleImageEdit}
              onImageDelete={this.handleImageDelete}
              ref={this.setEditorRef}
            />
            <div>
              <Field
                name="text"
                component={renderWysiwgyField}
              />
            </div>
          </form>
        </CardMedia>
        {error && <div className="error">{error}</div>}
      </Dialog>
    )
  }
}

AdminSlideItem = compose(
  connect((state, { item }) => {
    const values = item.values || {}
    return {
      form: `slide_${item._id}`,
      item,
      initialValues: values
    }
  }),
  reduxForm({destroyOnUnmount: false, asyncBlurFields: []}))(AdminSlideItem)

export default AdminSlideItem
