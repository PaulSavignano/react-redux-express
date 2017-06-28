import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardHeader, CardMedia } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import renderTextField from '../../modules/renderTextField'
import { fetchUpdate, fetchDelete } from '../actions/index'
import ImageForm from '../../images/components/ImageForm'

class AdminCarouselItem extends Component {
  state = {
    zDepth: 1,
    submitted: false,
    editing: false
  }
  componentWillReceiveProps(nextProps) {
    const { submitSucceeded, dirty } = nextProps
    if (submitSucceeded) this.setState({ submitted: true, editing: false })
    if (dirty) this.setState({ submitted: false })
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  editing = (bool) => this.setState({ editing: bool })
  deleteImage = (_id, update) => this.props.dispatch(fetchUpdate(_id, update))
  setEditorRef = (editor) => this.editor = editor
  render() {
    const { error, handleSubmit, dispatch, item, imageSpec } = this.props
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
              item={item}
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
              {error && <strong style={{ color: 'rgb(244, 67, 54)' }}>{error}</strong>}
            </div>
            <div style={{ display: 'flex', margin: '16px 0 0 0' }}>
              <RaisedButton
                type="submit"
                label={this.state.submitted ? "Updated Slide" : "Update Slide"}
                labelColor="#ffffff"
                primary={this.state.submitted ? false : true}
                backgroundColor={this.state.submitted ? "#4CAF50" : null }
                style={{ flex: '1 1 auto', margin: '8px 4px 8px 8px' }}
              />
              <RaisedButton
                type="button"
                label="Remove Slide"
                className="delete-button"
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

AdminCarouselItem = compose(
  connect(({ slides }, { componentId }) => {
    const item = slides.items.find(value => value._id === componentId)
    const values = item.values || {}
    return {
      form: `slide_${item._id}`,
      item,
      initialValues: values
    }
  }),
  reduxForm({destroyOnUnmount: false, asyncBlurFields: []}))(AdminCarouselItem)

export default AdminCarouselItem
