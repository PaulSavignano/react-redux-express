import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardHeader, CardMedia } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import SuccessableButton from '../../components/buttons/SuccessableButton'
import renderTextField from '../../components/fields/renderTextField'
import { fetchUpdate, fetchDelete } from '../../actions/slides'
import ImageForm from '../../components/images/ImageForm'

class AdminSlideItem extends Component {
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
  deleteImage = (_id, update) => this.props.dispatch(fetchUpdate(_id, update))
  setEditorRef = (editor) => this.editor = editor
  render() {
    const { dispatch, error, handleSubmit, item, imageSpec, submitSucceeded, submitting } = this.props
    return (
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        containerStyle={{ display: 'flex', flexFlow: 'column', height: '100%' }}
        className="cards"
      >
        <CardHeader title={`Slide ${item._id}`} titleStyle={{ fontSize: 16 }} />
        <CardMedia>
          <form onSubmit={handleSubmit((values) => {
            if (this.state.editing) {
              const image = this.editor.handleSave()
              return dispatch(fetchUpdate(item._id, { type: 'UPDATE_IMAGE_AND_VALUES', image, values }))
            }
            return dispatch(fetchUpdate(item._id, { type: 'UPDATE_VALUES', values }))
          })}
            style={{ flex: '1 1 auto' }}
          >
            <ImageForm
              imageSpec={imageSpec}
              image={item.image}
              _id={item._id}
              editing={this.editing}
              deleteImage={this.deleteImage}
              ref={this.setEditorRef}
            />
            <div style={{ margin: '0 16px' }}>
              <Field
                name="text"
                label="text"
                type="text"
                fullWidth={true}
                component={renderTextField}
              />
            </div>
            {error && <div className="error">{error}</div>}
            <div className="button-container">
              <SuccessableButton
                submitSucceeded={submitSucceeded}
                submitting={submitting}
                label="SLIDE"
              />
              <RaisedButton
                type="button"
                label="Remove Slide"
                className="button delete-button"
                labelColor="#ffffff"
                style={{ flex: '1 1 auto', margin: '8px 8px 8px 4px' }}
                onTouchTap={() => dispatch(fetchDelete(item._id, item.image))}
              />
            </div>
          </form>
        </CardMedia>
      </Card>
    )
  }
}

AdminSlideItem = compose(
  connect(({ slides }, { componentId }) => {
    const item = slides.items.find(value => value._id === componentId)
    const values = item.values || {}
    return {
      form: `slide_${item._id}`,
      item,
      initialValues: values
    }
  }),
  reduxForm({destroyOnUnmount: false, asyncBlurFields: []}))(AdminSlideItem)

export default AdminSlideItem
