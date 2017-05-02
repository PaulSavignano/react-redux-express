import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import { fetchUpdatePage } from '../actions/page'
import ImageForm from '../../images/components/ImageForm'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

class AdminPageCard extends Component {
  state = {
    zDepth: 1,
    expanded: false,
    image: null
  }
  componentWillMount() {
    const { image } = this.props.card || null
    const hasImage = image ? true : false
    const imageUrl = image ? image : 'http://placehold.it/1000x1000'
    this.setState({ expanded: hasImage, image: imageUrl })
  }
  handleMouseEnter = () => this.setState({ zDepth: 4 })
  handleMouseLeave = () => this.setState({ zDepth: 1 })
  setEditorRef = (editor) => this.editor = editor
  render() {
    const { handleSubmit, dispatch, page, card } = this.props
    return (
      <form
        onSubmit={handleSubmit((values) => {
          let image
          if (this.state.expanded) {
            if (this.editor.hasUpload()) {
              image = this.editor.handleSave()
            } else {
              image = card.image
            }
          } else {
            image = null
          }
          const update = {
            type: 'UPDATE_COMPONENT',
            component: {
              _id: card._id,
              type: 'card',
              image,
              values
            }
          }
          dispatch(fetchUpdatePage(page._id, update))
        })}
        style={{ flex: '1 1 auto', width: card.values.width, margin: 30 }}
      >
        <Card
          expanded={this.state.expanded}
          zDepth={this.state.zDepth}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          containerStyle={{ display: 'flex', flexFlow: 'column', height: '100%' }}
          style={{ height: '100%' }}
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
                  name="width"
                  label="Width"
                  type="number"
                  component={renderTextField}
                  style={{ flex: '1 1 auto' }}
                />
              </div>
            }
          />
          <CardActions>
            <RaisedButton
              onTouchTap={() => {
                if (this.state.expanded && card.image) {
                  const update = {
                    type: 'DELETE_IMAGE',
                    component: {
                      _id: card._id
                    }
                  }
                  dispatch(fetchUpdatePage(page._id, update))
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
              width={1000}
              height={1000}
              ref={this.setEditorRef}
            />
          </CardMedia>
          <CardText>
            <Field
              name="youtube"
              label="Youtube iFrame src"
              type="text"
              fullWidth={true}
              component={renderTextField}
            />
            {card.youtube ?
              <div style={{ position: 'relative', paddingBottom: '50%'}}>
                <iframe
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                  src={card.youtube} frameBorder="0" allowFullScreen>
                </iframe></div>
            : null}
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
          <div style={{ flex: '1 1 auto' }}></div>
          <CardActions style={{ display: 'flex' }}>
            <RaisedButton type="submit" label="Update" primary={true} style={{ flex: '1 1 auto', margin: 8 }}/>
            <RaisedButton
              type="button"
              label="X"
              primary={true}
              style={{ flex: '1 1 auto', margin: 8 }}
              onTouchTap={() => {
                const update = {
                  type: 'DELETE_COMPONENT',
                  component: {
                    _id: card._id
                  }
                }
                dispatch(fetchUpdatePage(page._id, update))
              }}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

AdminPageCard = compose(
  connect((state, props) => ({form: props.card._id})),
  reduxForm({destroyOnUnmount: false, asyncBlurFields: []}))(AdminPageCard)

export default AdminPageCard
