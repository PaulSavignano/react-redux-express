import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

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
  handleExpandChange = (expanded) => this.setState({ expanded: expanded })
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
          const update = {
            type: 'ADD_CARD',
            component: 'card',
            contents: {
              header: values.header,
              image: this.editor.handleSave(),
              title: values.title,
              text: values.text,
            }
          }
          dispatch(startUpdatePage(page._id, update))
        })}
      >
        <Card
          expanded={this.state.expanded}
          onExpandChange={this.handleExpandChange}
          style={styles.Card}
          zDepth={this.state.zDepth}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <CardHeader
            title="Add Card"
            showExpandableButton={true}
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
            expandable={true}
          />
          <CardMedia expandable={true} >
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
            expandable={true}
          />
          <CardText expandable={true} >
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
          <CardActions expandable={true} >
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
