import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchUpdate, fetchDelete } from '../actions/index'
import ImageForm from '../../images/components/ImageForm'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

class AdminCardItem extends Component {
  state = {
    zDepth: 1,
    submitted: false
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
          <CardText>
            <Field
              name="width"
              label="Width"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="maxWidth"
              label="Max Width"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="margin"
              label="Margin"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="backgroundColor"
              label="Background Color"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="header"
              label="Header"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="iFrame"
              label="iFrame src"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            {!card.values ? null : card.values.iFrame ?
              <div style={{ position: 'relative', paddingBottom: '50%'}}>
                <iframe
                  title="google youtube"
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  src={card.values.iFrame} frameBorder="0" allowFullScreen>
                </iframe></div>
            : null}
            <Field
              name="title"
              label="Title"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="text"
              label="Text"
              type="text"
              multiLine={true}
              rows={2}
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="color"
              label="Text Color"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="link"
              label="Link to"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            {error && <strong style={{ color: 'rgb(244, 67, 54)' }}>{error}</strong>}

          </CardText>
          <div style={{ flex: '1 1 auto' }}></div>
          <div style={{ display: 'flex' }}>
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
  connect((state, props) => ({ form: `card_${props.card._id}` })),
  reduxForm({destroyOnUnmount: false, asyncBlurFields: []}))(AdminCardItem)

export default AdminCardItem
