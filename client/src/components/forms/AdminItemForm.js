import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { reduxForm, Field } from 'redux-form'
import { Card, CardHeader } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import CircularProgress from 'material-ui/CircularProgress'

import ImageForm from '../images/ImageForm'
import { stopEdit } from '../../actions/editItem'

class AdminItemForm extends Component {
  state = {
    imageEdit: false
  }
  handleImageEdit = (bool) => {
    this.setState({ imageEdit: bool })
    setTimeout(() => window.dispatchEvent(new Event('resize')), 10)
  }
  handleImageDelete = (_id, update) => {
    this.setState({ imageEdit: false })
    return this.props.dispatch(fetchUpdate(_id, update))
  }
  handleFormSubmit = (values) => {
    const { dispatch, item: { _id, image }} = this.props
    if (this.state.imageEdit) {
      const newImage = this.editor.handleSave()
      const remmoveImageSrc = image.src
      return dispatch(fetchUpdate(_id, { type: 'UPDATE_IMAGE_AND_VALUES', image: newImage, remmoveImageSrc, values }))
    } else {
      return dispatch(fetchUpdate(_id, { type: 'UPDATE_VALUES', values }))
    }
  }
  handleRemove = () => this.props.dispatch(fetchDelete(this.props.editItem.item._id))
  handleStopEdit = () => this.props.dispatch(stopEdit())
  setEditorRef = (editor) => this.editor = editor
  render() {
    const {
      dispatch,
      error,
      fields,
      handleSubmit,
      editItem: {
        editing,
        item: { _id, image },
        kind
      },
      submitting
    } = this.props
    return (
      <Dialog
        actions={
          <div className="button-container">
            <RaisedButton
              onTouchTap={handleSubmit(values => this.handleFormSubmit(values))}
              label={submitting ?
                <CircularProgress key={1} color="#ffffff" size={25} style={{ verticalAlign: 'middle' }} />
              :
                `UPDATE ${kind}`
              }
              primary={true}
              style={{ flex: '1 1 auto', margin: 4 }}
            />
            <RaisedButton
              type="button"
              label="X"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '0 1 auto', margin: 4 }}
              onTouchTap={this.handleRemove}
            />
            <RaisedButton
              type="button"
              label="Cancel"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '0 1 auto', margin: 4 }}
              onTouchTap={this.handleStopEdit}
            />
          </div>
        }
        modal={false}
        open={editing}
        onRequestClose={this.handleStopEdit}
        autoScrollBodyContent={true}
        contentStyle={{ width: '100%', maxWidth: 1000 }}
        bodyStyle={{ padding: 8 }}
      >
        <Card>
          <CardHeader title={`${kind.toLowerCase().charAt(0).toUpperCase()} ${_id}`}/>
          <form>
            {image &&
              <ImageForm
                image={image}
                type="image/jpg"
                _id={_id}
                onImageEdit={this.handleImageEdit}
                onImageDelete={this.handleImageDelete}
                ref={this.setEditorRef}
              />
            }
            <div className="field-container">
              {fields.map(({ name, type, component, options }) => (
                type === 'select' ?
                  <Field
                    className="field"
                    component={component}
                    label={name}
                    name={name}
                  >
                    {options.map(option => (
                      <MenuItem
                        value={option}
                        primaryText={option}
                      />
                    ))}
                  </Field>
                :
                <Field
                  className="field"
                  component={component}
                  key={name}
                  label={name}
                  name={name}
                  type={type}
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

AdminItemForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
  fields: PropTypes.array.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  editItem: PropTypes.object.isRequired,
  submitting: PropTypes.bool.isRequired,
}

export default reduxForm({})(AdminItemForm)
