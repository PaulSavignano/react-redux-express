import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Toggle from 'material-ui/Toggle'

import ImageForm from '../../images/components/ImageForm'
import { startUpdatePage } from '../actions/page'


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
    expanded: false
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  setEditorRef = (editor) => {
    if (editor) this.editor = editor
  }
  render() {
    const styles = {
      Card: {
        margin: '1em 1em',
      },
      buttonContainer: {
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between'
      },
      button: {
        flex: '1 1 auto',
        margin: 8
      }
    }
    const { handleSubmit, page, dispatch } = this.props
    return (
      <form
        onSubmit={handleSubmit((values) => {
          const image = this.state.expanded ? this.editor.handleSave() : null
          const update = {
            type: 'ADD_COMPONENT',
            component: {
              type: 'card',
              header: values.header || null,
              minWidth: values.minWidth || null,
              image,
              title: values.title || null,
              text: values.text || null,
            }
          }
          dispatch(startUpdatePage(page._id, update))
        })}
      >
        <Card
          expanded={this.state.expanded}
          style={styles.Card}
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
          <CardTitle
            title={
              <Field
                name="title"
                label="Title"
                type="text"
                fullWidth={true}
                component={renderTextField}
              />
            }
          />
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
          </CardText>
          <CardActions>
            <RaisedButton type="submit" label="Add" primary={true} fullWidth={true}/>
          </CardActions>
        </Card>
      </form>
    )
  }
}


export default reduxForm({
  form: 'AdminPageCardAdd',
})(AdminPageCardAdd)
