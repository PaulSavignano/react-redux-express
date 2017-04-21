import React, { Component } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { reduxForm, Field } from 'redux-form'
import ImageForm from '../../images/components/ImageForm'
import {Card, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import { startUpdatePage } from '../actions/page'

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

const styles = {
  titleDiv: {
    top: '35vw',
    position: 'absolute'
  },
  titleInput: {
    textAlign: 'center',
    fontSize: '6vw',
    height: '6vw',
    padding: '8px 0 8px 0'
  },
  textDiv: {
    top: '45vw',
    position: 'absolute'
  },
  textInput: {
    textAlign: 'center',
    fontSize: '3vw',
    height: 'auto',
  }
}

class PageUpdate extends Component {
  state = {
    updated: false
  }
  setEditorRef = (editor) => {
    this.editor = editor
  }
  render() {
    const { handleSubmit, _id, dispatch, contents, heroTitle, heroText } = this.props
    return (
      <Card>
        <form onSubmit={handleSubmit((values) => {
          const image = this.editor.handleSave()
          const updates = {
            'type': 'UPDATE_HERO',
            contents: {
              heroImage: image,
              heroTitle: values.heroTitle,
              heroText: values.heroText
            }
          }
          dispatch(startUpdatePage(_id, updates))
        })}>
          <CardMedia>
            <ImageForm
              image={contents.heroImage}
              width={1920}
              height={1080}
              ref={this.setEditorRef}
            />
            <div>
              <Field
                component={renderTextField}
                inputStyle={styles.titleInput}
                style={styles.titleDiv}
                underlineShow={false}
                name="heroTitle"
                label="Hero Title"
                type="text"
                fullWidth={true}
              />
              <Field
                component={renderTextField}
                inputStyle={styles.textInput}
                style={styles.textDiv}
                underlineShow={false}
                name="heroText"
                label="Hero Text"
                type="text"
                fullWidth={true}
              />
            </div>
          </CardMedia>
          <CardText style={{ padding: '0 16px 16px'}}>
            <RaisedButton type="submit" label="Update" primary={true} fullWidth={true} style={{ flex: '1 1 auto' }}/>
          </CardText>
        </form>
      </Card>
    )
  }
}

PageUpdate = reduxForm({
  form: 'hero'
})(PageUpdate)

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: state.pages.find(page => page.name === 'home').contents
  }
}

PageUpdate = connect(mapStateToProps)
(PageUpdate)

export default PageUpdate
