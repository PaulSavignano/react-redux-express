import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

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
    editing: true
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  setEditorRef = (editor) => this.editor = editor
  render() {
    const { handleSubmit, dispatch, page, card } = this.props
    console.log(this.props)
    return (
      <Card
        style={styles.Card}
        zDepth={this.state.zDepth}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
      >
        <form
          onSubmit={handleSubmit((values) => {
            const update = {
              type: 'UPDATE_CARD',
              cardId: card._id,
              component: 'card',
              contents: {
                header: values.header,
                image: this.handleSave(),
                title: values.heroTitle,
                text: values.heroText,
              }
            }
            dispatch(startUpdatePage(page._id, update))
          })}
        >
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
          <CardMedia>
            <ImageForm
              image={card.contents.image}
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
                  type: 'DELETE_CARD',
                  cardId: card._id
                }
                dispatch(startUpdatePage(page._id, update))
              }}
            />
          </div>
        </form>
      </Card>
    )
  }
}

AdminPageCard = compose(
  connect((state, props) => ({form: props.card._id})),
  reduxForm({destroyOnUnmount: false, asyncBlurFields: []}))(AdminPageCard)

export default AdminPageCard
