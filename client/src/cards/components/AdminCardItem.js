import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardHeader, CardMedia } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import renderTextField from '../../modules/renderTextField'
import renderWysiwgyField from '../../modules/renderWysiwgyField'
import ImageForm from '../../images/components/ImageForm'
import { fetchUpdate, fetchDelete } from '../actions/index'

class AdminCardItem extends Component {
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
    const values = item.values || {}
    const width = values.width || null
    return (
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={{ width, height: '100%' }}
        className="cards"
      >
        <CardHeader title={`Card ${item._id}`} titleStyle={{ fontSize: 16 }} />
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
            <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
              <Field
                name="width"
                label="Width"
                type="number"
                style={{ flex: '1 1 auto', margin: '0 16px' }}
                component={renderTextField}
              />
              <Field
                name="maxWidth"
                label="maxWidth"
                type="number"
                style={{ flex: '1 1 auto', margin: '0 16px' }}
                component={renderTextField}
              />
              <Field
                name="zDepth"
                label="zDepth"
                type="number"
                style={{ flex: '1 1 auto', margin: '0 16px' }}
                component={renderTextField}
              />
              <Field
                name="margin"
                label="Margin"
                style={{ flex: '1 1 auto', margin: '0 16px' }}
                type="text"
                component={renderTextField}
              />
              <Field
                name="color"
                label="Color"
                type="text"
                style={{ flex: '1 1 auto', margin: '0 16px' }}
                component={renderTextField}
              />
              <Field
                name="backgroundColor"
                label="backgroundColor"
                style={{ flex: '1 1 auto', margin: '0 16px' }}
                type="text"
                component={renderTextField}
              />
            </div>

            <div style={{ margin: '0 16px' }}>
              <Field
                name="header"
                label="Card Header"
                fullWidth={true}
                type="text"
                component={renderTextField}
              />
            </div>
            {!values.iFrame &&
              <ImageForm
                imageSpec={imageSpec}
                item={item}
                editing={this.editing}
                deleteImage={this.deleteImage}
                ref={this.setEditorRef}
              />
            }
            {!item.image &&
              <div style={{ margin: '0 16px' }}>
                <Field
                  name="iFrame"
                  label="Card iFrame src"
                  fullWidth={true}
                  type="text"
                  component={renderTextField}
                />
              </div>
            }

            {values.iFrame &&
              <div style={{ position: 'relative', paddingBottom: '50%'}}>
                <iframe
                  title="google youtube"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  src={values.iFrame} frameBorder="0" allowFullScreen>
                </iframe></div>
            }

            <div style={{ margin: '0 16px' }}>
              <Field
                name="text"
                label="Text"
                type="text"
                fullWidth={true}
                component={renderWysiwgyField}
              />
              <Field
                name="link"
                label="Card Link"
                type="text"
                fullWidth={true}
                component={renderTextField}
              />
              {error && <strong style={{ color: 'rgb(244, 67, 54)' }}>{error}</strong>}
            </div>
            <div style={{ flex: '1 1 auto' }}></div>
            <div style={{ display: 'flex', margin: '16px 0 0 0' }}>
              <RaisedButton
                type="submit"
                label={this.state.submitted ? "Updated Card" : "Update Card"}
                labelColor="#ffffff"
                primary={this.state.submitted ? false : true}
                backgroundColor={this.state.submitted ? "#4CAF50" : null }
                style={{ flex: '1 1 auto', margin: '8px 4px 8px 8px' }}
              />
              <RaisedButton
                type="button"
                label="Remove Card"
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

AdminCardItem = compose(
  connect(({ cards }, { componentId }) => {
    const item = cards.items.find(value => value._id === componentId)
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
  reduxForm({destroyOnUnmount: false, asyncBlurFields: []}))(AdminCardItem)

export default AdminCardItem
