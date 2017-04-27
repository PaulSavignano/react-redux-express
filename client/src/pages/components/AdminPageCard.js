import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Toggle from 'material-ui/Toggle'

import { startUpdatePage } from '../actions/page'
import ImageForm from '../../images/components/ImageForm'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

const styles = {
  Card: {
    flex: '1 1 auto',
    width: 300,
    minWidth: 300,
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

class AdminPageCard extends Component {
  state = {
    zDepth: 1,
    expanded: false,
    image: null
  }
  componentWillMount() {
    const { image } = this.props.card.contents
    const hasImage = image ? true : false
    const imageUrl = image ? image : 'http://placehold.it/1000x1000'
    this.setState({ expanded: hasImage, image: imageUrl })
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  setEditorRef = (editor) => this.editor = editor
  render() {
    const { handleSubmit, dispatch, page, card } = this.props
    console.log(this.props)
    return (
      <form
        onSubmit={handleSubmit((values) => {
          const image = this.state.expanded ? this.editor.handleSave() : null
          const update = {
            type: 'UPDATE_COMPONENT',
            component: {
              type: 'card',
              _id: card._id,
              header: values.header || null,
              minWidth: values.minWidth,
              image,
              title: values.title || null,
              text: values.text || null,
            }
          }
          dispatch(startUpdatePage(page._id, update))
        })}
        style={styles.Card}
      >
        <Card
          expanded={this.state.expanded}
          zDepth={this.state.zDepth}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >

          <CardTitle
            title={
              <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-between' }}>
                <Field
                  name="header"
                  label="Header"
                  type="text"
                  component={renderTextField}
                  style={{ flex: '1 1 auto' }}
                />
                <Field
                  name="minWidth"
                  label="Minimum Width"
                  type="number"
                  component={renderTextField}
                  style={{ flex: '1 1 auto' }}
                />
              </div>
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
              image={this.state.image}
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
              fullWidth={true}
              component={renderTextField}
            />
          </CardText>
          <div style={styles.buttonContainer}>
            <RaisedButton type="submit" label="Update" primary={true} style={styles.button}/>
            <RaisedButton
              type="button"
              label="X"
              primary={true}
              style={styles.button}
              onClick={() => {
                const update = {
                  type: 'DELETE_COMPONENT',
                  componentId: card._id
                }
                dispatch(startUpdatePage(page._id, update))
              }}
            />
          </div>
        </Card>
      </form>
    )
  }
}

AdminPageCard = compose(
  connect((state, props) => ({form: props.card._id})),
  reduxForm({destroyOnUnmount: false, asyncBlurFields: []}))(AdminPageCard)

export default AdminPageCard
