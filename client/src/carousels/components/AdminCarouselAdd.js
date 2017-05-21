import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { CardActions, CardHeader, CardMedia, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import ImageFormHor from '../../images/components/ImageFormHor'
import { fetchAdd } from '../actions/index'


const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

class AdminCarouselAdd extends Component {
  state = {
    image: null,
    submitted: false,
    editing: false,
    open: false
  }
  componentWillMount() {
    this.setState({ image: this.props.placeholdit })
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps.submitSucceeded)
    if (nextProps.submitSucceeded) this.setState({ submitted: true, image: this.props.placeholdit })
    if (nextProps.dirty) this.setState({ submitted: false })
  }
  setEditorRef = (editor) => {
    if (editor) this.editor = editor
  }
  editing = (bool) => {
    bool ? this.setState({ submitted: false, editing: true }) : this.setState({ submitted: true, editing: true })
  }
  render() {
    const { error, handleSubmit, page, dispatch, imageSize, placeholdit } = this.props
    return (
        <form
          onSubmit={handleSubmit((values) => {
            const image = this.editor.handleSave() || null
            const type = image ? 'ADD_ITEM_ADD_IMAGE' : 'ADD_ITEM'
            const add = {
              type,
              pageId: page._id,
              pageName: page.slug,
              image,
              values
            }
            this.props.reset()
            dispatch(fetchAdd(add))
            this.setState({ open: false })
          })}
          style={{ flex: '1 1 auto'}}
        >
          <CardActions>
            <RaisedButton
              onTouchTap={() => this.setState({ open: !this.state.open })}
              type="button"
              label={this.state.open ? "Remove Carousel Item" : "Add Carousel Item"}
              labelColor="#ffffff"
              backgroundColor={this.state.open ? "#D50000" : "#4CAF50" }
              fullWidth={true}
            />
          </CardActions>
          {this.state.open &&
            <div style={{ marginTop: 10 }}>
              <CardMedia>
                <ImageFormHor
                  image={this.state.image}
                  type="image/png"
                  editing={this.editing}
                  width={imageSize.width}
                  height={imageSize.height}
                  ref={this.setEditorRef}
                />
              </CardMedia>
              <CardText>
                <Field
                  name="text"
                  label="Text"
                  type="text"
                  multiLine={true}
                  rows={2}
                  fullWidth={true}
                  component={renderTextField}
                />
                {error && <strong style={{ color: 'rgb(244, 67, 54)' }}>{error}</strong>}
              </CardText>
              <CardActions style={{ marginBottom: 20 }}>
                <RaisedButton type="submit" label="Add" primary={true} fullWidth={true}/>
              </CardActions>
            </div>
          }
        </form>
    )
  }
}


export default reduxForm({
  form: 'AdminCarouselAdd',
})(AdminCarouselAdd)
