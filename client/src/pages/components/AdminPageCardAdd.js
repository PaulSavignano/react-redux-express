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

class AdminPageCardAdd extends Component {
  state = {
    zDepth: 1,
    expanded: false,
    carousel: false
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  setEditorRef = (editor) => {
    if (editor) this.editor = editor
  }
  render() {
    const { handleSubmit, page, dispatch } = this.props
    return (
      <section>
        <form
          onSubmit={handleSubmit((values) => {
            const image = this.state.expanded ? this.editor.handleSave() : null
            const update = {
              type: 'ADD_COMPONENT',
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
          style={{ flex: '1 1 auto', margin: 30}}
        >
          <Card
            expanded={this.state.expanded}
            zDepth={this.state.zDepth}
            onMouseEnter={this.handleMouseEnter}
            onMouseLeave={this.handleMouseLeave}
          >
            <CardHeader
              title={
                <div style={{ display: 'flex', flexFlow: 'row nowrap', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <h4>Add Card</h4>
                  <Field
                    name="minWidth"
                    label="Minimum Width"
                    type="number"
                    component={renderTextField}
                  />
                </div>
              }
              textStyle={{ width: '100%'}}
            />
            <CardTitle
              title={
                <Field
                  name="header"
                  label="Header"
                  type="text"
                  fullWidth={true}
                  component={renderTextField}
                />
              }
            />
            <CardActions>
              <RaisedButton
                onTouchTap={() => this.setState({ expanded: !this.state.expanded })}
                type="button"
                label={this.state.expanded ? "Remove Image" : "Add Image"}
                labelColor="#ffffff"
                backgroundColor={this.state.expanded ? "#D50000" : "#4CAF50" }
                fullWidth={true}/>
            </CardActions>
            <CardMedia expandable={true}>
              <ImageForm
                image='http://placehold.it/1000x1000'
                width={1000}
                height={1000}
                ref={this.setEditorRef}
              />
            </CardMedia>

            <CardActions>
              <RaisedButton
                onTouchTap={() => this.setState({ carousel: !this.state.carousel })}
                type="button"
                label={this.state.carousel ? "Remove Carousel" : "Add Carousel"}
                labelColor="#ffffff"
                backgroundColor={this.state.carousel ? "#D50000" : "#4CAF50" }
                fullWidth={true}/>
            </CardActions>
            {!this.state.carousel ? null :

              <CardMedia>
                <ImageForm
                  image='http://placehold.it/1000x1000'
                  width={1000}
                  height={1000}
                  ref={this.setEditorRef}
                />
              </CardMedia>
            }
            <CardText>
              <Field
                name="youtube"
                label="Youtube iFrame"
                type="text"
                fullWidth={true}
                component={renderTextField}
              />
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
                name="link"
                label="Link to"
                type="text"
                fullWidth={true}
                component={renderTextField}
              />
            </CardText>
            <CardActions>
              <RaisedButton type="submit" label="Add" primary={true} fullWidth={true}/>
            </CardActions>
          </Card>
        </form>
      </section>
    )
  }
}


export default reduxForm({
  form: 'AdminPageCardAdd',
})(AdminPageCardAdd)
