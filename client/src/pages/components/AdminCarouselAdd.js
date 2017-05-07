import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import ImageForm from '../../images/components/ImageForm'
import { fetchUpdatePage } from '../actions/page'


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
    zDepth: 1,
    open: false
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  setEditorRef = (editor) => {
    if (editor) this.editor = editor
  }
  render() {
    const { handleSubmit, page, dispatch } = this.props
    return (
        <form
          onSubmit={handleSubmit((values) => {
            const image = this.state.open ? this.editor.handleSave() : null
            const update = {
              type: 'ADD_CAROUSEL',
              component: {
                type: 'card',
                image,
                values
              }
            }
            this.props.reset()
            dispatch(fetchUpdatePage(page._id, update))
            this.setState({ expanded: !this.state.expanded })
          })}
        >

          <CardActions>
            <RaisedButton
              onTouchTap={() => this.setState({ open: !this.state.open })}
              type="button"
              label={this.state.open ? "Remove Carousel" : "Add Carousel"}
              labelColor="#ffffff"
              backgroundColor={this.state.open ? "#D50000" : "#4CAF50" }
              fullWidth={true}
            />
          </CardActions>
          {!this.state.open ? null :
            <div>
              <CardMedia>
                <ImageForm
                  image='http://placehold.it/1000x1000'
                  width={1000}
                  height={1000}
                  ref={this.setEditorRef}
                />
              </CardMedia>

              <CardText>
                <Field
                  name="text"
                  label="Youtube iFrame"
                  type="text"
                  fullWidth={true}
                  component={renderTextField}
                />
              </CardText>
              <CardActions>
                <RaisedButton type="submit" label="Add" primary={true} fullWidth={true}/>
              </CardActions>
            </div>

          }
        </form>
    )
  }
}


export default reduxForm({
  form: 'carouselAdd',
})(AdminCarouselAdd)
