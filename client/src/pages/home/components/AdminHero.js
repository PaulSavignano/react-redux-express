import React, { Component } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import { reduxForm, Field } from 'redux-form'
import ImageForm from '../../../images/components/ImageForm'
import {Card, CardMedia, CardTitle, CardText } from 'material-ui/Card'


const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

const styles = {
  buttonContainer: {
    display: 'flex',
    flexFlow: 'row nowrap'
  },
  TextFields: {
    margin: 8
  },
  button: {
    flex: '1 1 auto',
    margin: 8
  }
}

class AdminHero extends Component {
  state = {
    image: 'http://placehold.it/1920x1080',
    _id: '',
    editing: true,
    preview: null,
  }
  componentWillMount() {
    return fetch(`/api/pages/${this.props._id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(json => {
        console.log(json)
        this.setState({ image: json.contents.heroImage, _id: json._id })
      })
      .catch(err => console.log(err))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { _id } = this.props
    const image = this.editor.getBase64()

    return fetch(`/api/pages/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json' ,
        'x-auth': localStorage.getItem('token'),
      },
      body: JSON.stringify({ contents: { heroImage: image }})
    })
      .then(res => res.json())
      .catch(err => console.log(err))
  }
  handlePreview = () => {
    this.editor.handleSave()
    this.setState({ editing: false })
  }
  handleEdit = () => {
    this.editor.handleEdit()
    this.setState({ editing: true })
  }
  setEditorRef = (editor) => {
    this.editor = editor
  }

  render() {
    console.log(this.props.form.hero)
    const { heroTitle, heroText } = this.props.contents
    return (

      <Card>
        <form onSubmit={this.handleSubmit}>
          <CardMedia overlay={
            this.state.editing ?
              <div/>
              :
            <CardTitle title={heroTitle} subtitle={heroText} />
          }>
            <ImageForm
              image={this.state.image}
              width={1920}
              height={1080}
              ref={this.setEditorRef}
            />
          </CardMedia>
          {this.state.editing ?
            <div style={styles.TextFields}>
              <Field
                name="heroTitle"
                label="Hero Title"
                type="text"
                fullWidth={true}
                component={renderTextField}
              />
              <Field
                name="heroText"
                label="Hero Title"
                type="text"
                fullWidth={true}
                component={renderTextField}
              />
            </div>
            :
            ''
          }
          <CardText>
            {this.state.editing ?
              <div style={styles.buttonContainer}>
                <RaisedButton type="button" label="Preview" primary={true} onClick={this.handlePreview} style={styles.button}/>
                <RaisedButton type="submit" label="Update" primary={true} style={styles.button}/>
              </div>
              :
              <div style={styles.buttonContainer}>
                <RaisedButton type="button" label="Edit" primary={true} fullWidth={true} onClick={this.handleEdit} style={styles.button}/>
                <RaisedButton type="submit" label="Update" primary={true} style={styles.button}/>
              </div>
            }
          </CardText>

        </form>
      </Card>
    )
  }
}

AdminHero = reduxForm({
  form: 'hero'  // a unique identifier for this form
})(AdminHero)

// You have to connect() to any reducers that you wish to connect to yourself
AdminHero = connect(
  state => ({
    initialValues: state.pages.find(page => page.name === 'home').contents// pull initial values from account reducer
  }),              // bind account loading action creator
)(AdminHero)

export default AdminHero
