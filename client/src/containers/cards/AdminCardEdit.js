import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import PropTypes from 'prop-types'
import { Card, CardHeader } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import CircularProgress from 'material-ui/CircularProgress'

import renderTextField from '../../components/fields/renderTextField'
import renderWysiwgyField from '../../components/fields/renderWysiwgyField'
import ImageForm from '../../components/images/ImageForm'
import { fetchUpdate, fetchDelete, stopEdit } from '../../actions/cards'

const fields = [
  'flex',
  'iframe',
  'iframeBorder',
  'link',
  'margin',
  'width',
  'zDepth'
]

class AdminCardEdit extends Component {
  state = {
    imageEdit: false
  }
  componentWillReceiveProps({ dispatch, submitSucceeded, item }) {
    if (submitSucceeded && !item.editing) {
      dispatch(stopEdit(item._id))
    }
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
    const {
      dispatch,
      error,
      handleSubmit,
      item: { _id, editing, image },
      submitting
    } = this.props
    return (
      <Dialog
        actions={
          <div className="button-container">
            <RaisedButton
              onTouchTap={handleSubmit((values) => {
                if (this.state.imageEdit) {
                  const image = this.editor.handleSave()
                  const oldImage = image.src
                  return dispatch(fetchUpdate(_id, { type: 'UPDATE_IMAGE_AND_VALUES', image, oldImage, values }))
                } else {
                  return dispatch(fetchUpdate(_id, { type: 'UPDATE_VALUES', values }))
                }
              })}
              label={submitting ? <CircularProgress key={1} color="#ffffff" size={25} style={{ verticalAlign: 'middle' }} /> : 'UPDATE CARD'}
              primary={true}
              style={{ flex: '1 1 auto', margin: 4 }}
            />
            <RaisedButton
              type="button"
              label="X"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '0 1 auto', margin: 4 }}
              onTouchTap={() => dispatch(fetchDelete(_id))}
            />
            <RaisedButton
              type="button"
              label="Cancel"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '0 1 auto', margin: 4 }}
              onTouchTap={() => dispatch(stopEdit(_id))}
            />
          </div>
        }
        modal={false}
        open={editing}
        onRequestClose={() => dispatch(stopEdit(_id))}
        autoScrollBodyContent={true}
        contentStyle={{ width: '100%', maxWidth: 1000 }}
        bodyStyle={{ padding: 8 }}
      >
        <Card>
          <CardHeader title={`Card ${_id}`}/>
          <form>
            <ImageForm
              image={image}
              type="image/jpg"
              _id={_id}
              onImageEdit={this.handleImageEdit}
              onImageDelete={this.handleImageDelete}
              ref={this.setEditorRef}
            />
            <div>
              <Field
                name="text"
                label="text"
                component={renderWysiwgyField}
              />
            </div>
            <div className="field-container">
              {fields.map(field => (
                <Field
                  key={field}
                  name={field}
                  label={field}
                  className="field"
                  component={renderTextField}
                />
              ))}
            </div>
          </form>
          {error && <div className="error">{error}</div>}
        </Card>
      </Dialog>
    )
  }
}

AdminCardEdit = compose(
  connect((state, { item }) => ({
    form: `card_${item._id}`,
    initialValues: item.values
  })),
  reduxForm({
    destroyOnUnmount: false,
    asyncBlurFields: []
  })
)(AdminCardEdit)

AdminCardEdit.propTypes = {
  error: PropTypes.object,
  item: PropTypes.object.isRequired,
  submitting: PropTypes.bool
}

export default AdminCardEdit
