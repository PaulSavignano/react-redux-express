import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import { Card, CardHeader } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import SuccessableButton from '../../components/buttons/SuccessableButton'
import renderTextField from '../../components/fields/renderTextField'
import renderWysiwgyField from '../../components/fields/renderWysiwgyField'
import ImageForm from '../../components/images/ImageForm'
import { fetchUpdate, fetchDelete } from '../../actions/cards'

class AdminCardItem extends Component {
  state = {
    zDepth: 1,
    editing: false
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.submitSucceeded) this.setState({ editing: false })
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  editing = (bool) => this.setState({ editing: bool })
  deleteImage = (_id, update) => this.props.dispatch(fetchUpdate(_id, update))
  setEditorRef = (editor) => this.editor = editor
  render() {
    const { dispatch, error, handleSubmit, item, imageSpec, submitSucceeded, submitting } = this.props
    const values = item.values || {}
    const width = values.width || null
    return (
      <Card
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        className="cards"
        style={{ width, height: '100%' }}
      >
        <CardHeader title={`Card ${item._id}`} titleStyle={{ fontSize: 16 }} />
        <form onSubmit={handleSubmit((values) => {
          if (this.state.editing) {
            const image = this.editor.handleSave()
            return dispatch(fetchUpdate(item._id, { type: 'UPDATE_IMAGE_AND_VALUES', image, values }))
          }
          return dispatch(fetchUpdate(item._id, { type: 'UPDATE_VALUES', values }))
        })}
        >
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
              type="text"
              component={renderTextField}
            />
            <Field
              name="color"
              label="Color"
              type="text"
              className="field"
              component={renderTextField}
            />
            <Field
              name="backgroundColor"
              label="backgroundColor"
              className="field"
              type="text"
              component={renderTextField}
            />
          </div>

          {!values.iFrame &&
            <ImageForm
              imageSpec={imageSpec}
              image={item.image}
              _id={item._id}
              editing={this.editing}
              deleteImage={this.deleteImage}
              ref={this.setEditorRef}
            />
          }
          <div className="field-container">
            <Field
              name="iFrame"
              label="Card iFrame src"
              className="field"
              type="text"
              component={renderTextField}
            />
          </div>

          {values.iFrame &&
            <div style={{ position: 'relative', paddingBottom: '50%'}}>
              <iframe
                title="google youtube"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src={values.iFrame} frameBorder="0" allowFullScreen>
              </iframe>
            </div>
          }

          <div>
            <Field
              name="text"
              component={renderWysiwgyField}
            />
          </div>
          <div className="field-container">
            <Field
              name="link"
              label="Card Link"
              type="text"
              className="field"
              component={renderTextField}
            />
          </div>
          {error && <div className="error">{error}</div>}
          <div className="button-container">
            <SuccessableButton
              submitSucceeded={submitSucceeded}
              submitting={submitting}
              label="CARD"
            />
            <RaisedButton
              type="button"
              label="Remove Card"
              className="delete-button"
              labelColor="#ffffff"
              style={{ flex: '1 1 auto', margin: 4 }}
              onTouchTap={() => dispatch(fetchDelete(item._id, item.image))}
            />
          </div>
        </form>
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
  reduxForm({
    destroyOnUnmount: false,
    asyncBlurFields: []
  }))(AdminCardItem)

export default AdminCardItem
