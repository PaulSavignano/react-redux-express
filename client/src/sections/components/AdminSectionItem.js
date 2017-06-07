import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

import AdminCards from '../../cards/containers/AdminCards'
import AdminCarousels from '../../carousels/containers/AdminCarousels'
import AdminProducts from '../../products/containers/AdminProducts'
import { fetchUpdate, fetchDelete } from '../actions/index'
import ImageForm from '../../images/components/ImageForm'
import RichTextMarkdown from '../../RichTextMarkdown'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

const renderRichField = ({ input, meta: { touched, error } }) => (
  <div style={{ margin: '16px 0 8px 0'}}>
    <label style={{ color: 'rgba(0, 0, 0, 0.3)', fontSize: 12 }}>Text</label>
    <RichTextMarkdown {...input} />
    {touched && (error && <div className="formValidationErrorText">{error}</div>)}
  </div>
)

const renderSelectField = ({
  input,
  label,
  meta: {touched, error},
  children,
  ...custom
}) => (
  <SelectField
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    onChange={(event, index, value) => input.onChange(value)}
    children={children}
    {...custom}
  />
)



class AdminSectionItem extends Component {
  state = {
    expanded: false,
    submitted: false
  }
  componentWillReceiveProps(nextProps) {
    const { submitSucceeded, dirty } = nextProps
    if (submitSucceeded) this.setState({ submitted: true })
    if (dirty) this.setState({ submitted: false })
  }
  render() {
    const { error, handleSubmit, dispatch, page, section, imageSize, placeholdIt } = this.props
    return (
      <Card
        expanded={this.state.expanded}
        zDepth={3}
        style={{ margin: '64px 0'}}
        containerStyle={{ display: 'flex', flexFlow: 'column', height: '100%' }}
        className="cards"
      >
        <CardActions style={{ display: 'flex' }}>
          <RaisedButton
            type="button"
            label="Remove Section"
            labelColor="#ffffff"
            backgroundColor="#D50000"
            fullWidth={true}
            onTouchTap={() => {
              dispatch(fetchDelete(section._id, section.image))
            }}
          />
        </CardActions>
        <ImageForm
          type="image/jpg"
          handleUpdate={fetchUpdate}
          width={imageSize.width}
          height={imageSize.height}
          ref={this.setEditorRef}
          placeholdIt={placeholdIt}
          item={section}
        />
        <form
          onSubmit={handleSubmit((values) => {
            const type = 'UPDATE_VALUES'
            const update = { type, values }
            dispatch(fetchUpdate(section._id, update))
          })}
        >
          <CardText>
            <Field
              name="height"
              label="Height px"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="backgroundColor"
              label="Background Color Hexadecimal"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="backgroundAttachment"
              component={renderSelectField}
              label="Select backgroundAttachment"
              fullWidth={true}
            >
              <MenuItem value={null} primaryText="" />
              <MenuItem value="scroll" primaryText="scroll" />
              <MenuItem value="fixed" primaryText="fixed" />
              <MenuItem value="local" primaryText="local" />
              <MenuItem value="inherit" primaryText="inherit" />
            </Field>
            <Field
              name="title"
              label="Title"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="titleAlign"
              component={renderSelectField}
              label="Title Align"
              fullWidth={true}
            >
              <MenuItem value={null} primaryText="" />
              <MenuItem value="left" primaryText="left" />
              <MenuItem value="center" primaryText="center" />
              <MenuItem value="right" primaryText="right" />
            </Field>
            <Field
              name="text"
              label="Text"
              type="text"
              fullWidth={true}
              component={renderRichField}
            />
            <Field
              name="textAlign"
              component={renderSelectField}
              label="Text Align"
              fullWidth={true}
            >
              <MenuItem value={null} primaryText="" />
              <MenuItem value="left" primaryText="left" />
              <MenuItem value="center" primaryText="center" />
              <MenuItem value="right" primaryText="right" />
            </Field>
            <Field
              name="margin"
              label="Title and Text Margin px"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            <Field
              name="padding"
              label="Title and Text Padding px"
              type="text"
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
            {error && <strong style={{ color: 'rgb(244, 67, 54)' }}>{error}</strong>}
          </CardText>
          <CardActions style={{ display: 'flex' }}>
            <RaisedButton
              type="submit"
              label={this.state.submitted ? "Section Updated" : "Update Section"}
              labelColor="#ffffff"
              primary={this.state.submitted ? false : true}
              backgroundColor={this.state.submitted ? "#4CAF50" : null }
              fullWidth={true}
            />
          </CardActions>
        </form>
        <AdminCards page={page} section={section} />
        <AdminCarousels section={section} />
        <AdminProducts section={section} />
      </Card>
    )
  }
}

AdminSectionItem = compose(
  connect((state, props) => ({
    form: `section_${props.section._id}`
  })),
  reduxForm({
    destroyOnUnmount: false,
    asyncBlurFields: []
  }))(AdminSectionItem)

export default AdminSectionItem
