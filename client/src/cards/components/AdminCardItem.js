import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardHeader, CardActions, CardText, CardMedia } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import MenuItem from 'material-ui/MenuItem'

import renderRichField from '../../modules/renderRichField'
import renderTextField from '../../modules/renderTextField'
import renderSelectField from '../../modules/renderSelectField'
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
  deleteImage = (_id, update) => {
    this.props.dispatch(fetchUpdate(_id, update))
  }
  setEditorRef = (editor) => {
    if (editor) this.editor = editor
  }
  render() {
    const { error, handleSubmit, dispatch, section, card, imageSpec } = this.props
    const width = !card.values ? null : card.values.width || null
    return (
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        style={{ width, height: '100%' }}
        className="cards"
      >
        <CardHeader title={`Card ${card._id}`} titleStyle={{ fontSize: 16 }} />
        <CardMedia>
          <form onSubmit={handleSubmit((values) => {
            if (this.state.editing) {
              const image = this.editor.handleSave()
              return dispatch(fetchUpdate(card._id, { type: 'UPDATE_IMAGE_AND_VALUES', image, values }))
            }
            return dispatch(fetchUpdate(card._id, { type: 'UPDATE_VALUES', values }))
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
            {!card.values.iFrame &&
              <ImageForm
                imageSpec={imageSpec}
                item={card}
                editing={this.editing}
                deleteImage={this.deleteImage}
                ref={this.setEditorRef}
              />
            }
            {!card.image &&
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

            {card.values.iFrame &&
              <div style={{ position: 'relative', paddingBottom: '50%'}}>
                <iframe
                  title="google youtube"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  src={card.values.iFrame} frameBorder="0" allowFullScreen>
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
                onTouchTap={() => dispatch(fetchDelete(card._id, card.image))}
              />
            </div>
          </form>
        </CardMedia>
      </Card>
    )
  }
}

AdminCardItem = compose(
  connect((state, { card }) => {
    const { values } = card
    return {
      form: `card_${card._id}`,
      card,
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
