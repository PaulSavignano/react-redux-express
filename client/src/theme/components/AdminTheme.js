import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchAddTheme, fetchUpdateTheme } from '../actions/theme'
import ImageForm from '../../images/components/ImageForm'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

class AdminTheme extends Component {
  state = {
    zDepth: 1,
    expanded: false,
    image: null
  }
  componentWillMount() {
    const { image } = this.props.theme || false
    const hasImage = image ? true : false
    const imageUrl = image ? image : 'http://placehold.it/280x60'
    this.setState({ expanded: hasImage, image: imageUrl })
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  setEditorRef = (editor) => this.editor = editor
  render() {
    const { handleSubmit, dispatch, theme } = this.props
    return (
      <section>
        <form
          onSubmit={handleSubmit((values) => {
            let image
            if (this.state.expanded) {
              if (this.editor.hasUpload()) {
                image = this.editor.handleSave()
              } else {
                image = theme.image
              }
            } else {
              image = null
            }
            const update = {
              _id: theme._id,
              image,
              values
            }
            dispatch(fetchUpdateTheme(theme._id, update))
          })}
          style={{ margin: 20 }}
        >
          <Card
            expanded={this.state.expanded}
            zDepth={this.state.zDepth}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
            containerStyle={{ display: 'flex', flexFlow: 'column', height: '100%' }}
            style={{ height: '100%' }}
          >
            <CardActions>
              <RaisedButton
                onTouchTap={() => {
                  if (theme.image) {
                    const update = {
                      type: 'DELETE_IMAGE',
                    }
                    dispatch(fetchUpdateTheme(theme._id, update))
                  }
                  this.setState({ expanded: !this.state.expanded })
                }}
                type="button"
                label={this.state.expanded ? "Remove Image" : "Add Image"}
                labelColor="#ffffff"
                backgroundColor={this.state.expanded ? "#D50000" : "#4CAF50" }
                fullWidth={true}/>
            </CardActions>
            <CardMedia expandable={true}>
              <ImageForm
                image={this.state.image}
                width={280}
                height={60}
                ref={this.setEditorRef}
              />
            </CardMedia>
            <CardText>
              <Field name="appBarColor" label="appBarColor" type="text" fullWidth={true} component={renderTextField} />
              <Field name="appBarTextColor" label="appBarTextColor" type="text" fullWidth={true} component={renderTextField} />
              <Field name="fontFamily" label="fontFamily" type="text" fullWidth={true} component={renderTextField} />
              <Field name="primary1Color" label="primary1Color" type="text" fullWidth={true} component={renderTextField} />
              <Field name="primary2Color" label="primary2Color" type="text" fullWidth={true} component={renderTextField} />
              <Field name="primary3Color" label="primary3Color" type="text" fullWidth={true} component={renderTextField} />
              <Field name="accent1Color" label="accent1Color" type="text" fullWidth={true} component={renderTextField} />
              <Field name="accent2Color" label="accent2Color" type="text" fullWidth={true} component={renderTextField} />
              <Field name="accent3Color" label="accent3Color" type="text" fullWidth={true} component={renderTextField} />
              <Field name="textColor" label="textColor" type="text" fullWidth={true} component={renderTextField} />
              <Field name="alternateTextColor" label="alternateTextColor" type="text" fullWidth={true} component={renderTextField} />
              <Field name="canvasColor" label="canvasColor" type="text" fullWidth={true} component={renderTextField} />
              <Field name="borderColor" label="borderColor" type="text" fullWidth={true} component={renderTextField} />
              <Field name="disabledColor" label="disabledColor" type="text" fullWidth={true} component={renderTextField} />
              <Field name="pickerHeaderColor" label="pickerHeaderColor" type="text" fullWidth={true} component={renderTextField} />
              <Field name="clockCircleColor" label="clockCircleColor" type="text" fullWidth={true} component={renderTextField} />
              <Field name="shadowColor" label="shadowColor" type="text" fullWidth={true} component={renderTextField} />
            </CardText>
            <CardActions style={{ display: 'flex' }}>
              <RaisedButton type="submit" label="Update" primary={true} style={{ flex: '1 1 auto', margin: 8 }}/>
            </CardActions>
          </Card>
        </form>
      </section>
    )
  }
}

AdminTheme = reduxForm({
  form: 'adminTheme'
})(AdminTheme)

const mapStateToProps = (state) => {
  if (state.theme) {
    return {
      isFetching: state.theme.isFetching,
      initialValues: {
        appBarColor: state.theme.values.appBar.color,
        appBarTextColor: state.theme.values.appBar.textColor,
        fontFamily: state.theme.values.fontFamily,
        primary1Color: state.theme.values.palette.primary1Color,
        primary2Color: state.theme.values.palette.primary2Color,
        primary3Color: state.theme.values.palette.primary3Color,
        accent1Color: state.theme.values.palette.accent1Color,
        accent2Color: state.theme.values.palette.accent2Color,
        accent3Color: state.theme.values.palette.accent3Color,
        textColor: state.theme.values.palette.textColor,
        alternateTextColor: state.theme.values.palette.alternateTextColor,
        canvasColor: state.theme.values.palette.canvasColor,
        borderColor: state.theme.values.palette.borderColor,
        disabledColor: state.theme.values.palette.disabledColor,
        pickerHeaderColor: state.theme.values.palette.pickerHeaderColor,
        clockCircleColor: state.theme.values.palette.clockCircleColor,
        shadowColor: state.theme.values.palette.shadowColor
      },
      theme: { _id: state.theme._id, image: state.theme.image }
    }
  }
  return {
    isFetching: false,
    initialValues: null,
    theme: { _id: null, image: null }
  }
}

AdminTheme = connect(mapStateToProps)(AdminTheme)

export default AdminTheme
