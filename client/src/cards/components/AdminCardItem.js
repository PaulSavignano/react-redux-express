import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardText } from 'material-ui/Card'
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
    submitted: false
  }
  createMarkup = (html) => {
    return {__html: html};
  }
  componentWillReceiveProps(nextProps) {
    const { submitSucceeded, dirty } = nextProps
    if (submitSucceeded) this.setState({ submitted: true })
    if (dirty) this.setState({ submitted: false })
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  render() {
    const { error, handleSubmit, dispatch, card, imageSize } = this.props
    const width = !card.values ? null : card.values.width || null
    return (
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        containerStyle={{ display: 'flex', flexFlow: 'column', height: '100%' }}
        style={{ width }}
        className="cards"
      >
        <ImageForm
          type="image/jpg"
          handleUpdate={fetchUpdate}
          width={imageSize.width}
          height={imageSize.height}
          ref={this.setEditorRef}
          item={card}
        />
        <form
          onSubmit={handleSubmit((values) => {
            const type = 'UPDATE_VALUES'
            const update = { type, values }
            dispatch(fetchUpdate(card._id, update))
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
            <Field
              name="iFrame"
              label="Card iFrame src"
              fullWidth={true}
              type="text"
              component={renderTextField}
            />
          </div>

          {!card.values ? null : card.values.iFrame ?
            <div style={{ position: 'relative', paddingBottom: '50%'}}>
              <iframe
                title="google youtube"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src={card.values.iFrame} frameBorder="0" allowFullScreen>
              </iframe></div>
          : null}

          <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
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
              label={this.state.submitted ? "Updated" : "Update"}
              labelColor="#ffffff"
              primary={this.state.submitted ? false : true}
              backgroundColor={this.state.submitted ? "#4CAF50" : null }
              style={{ flex: '1 1 auto', margin: '8px 4px 8px 8px' }}
            />
            <RaisedButton
              type="button"
              label="X"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '1 1 auto', margin: '8px 8px 8px 4px' }}
              onTouchTap={() => {
                dispatch(fetchDelete(card._id, card.image))
              }}
            />
          </div>
        </form>
      </Card>
    )
  }
}

AdminCardItem = compose(
  connect((state, { card }) => {
    const values = card.values || {}
    return {
      form: `card_${card._id}`,
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
