import React, { Component } from 'react'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import TextField from 'material-ui/TextField'
import { Card, CardActions, CardHeader, CardMedia, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'

import ImageEditor from '../../images/components/ImageEditor'
import { startAddPage } from '../actions/page'


const renderHeroField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

const renderTextField = ({ input, label, meta: { touched, error }, ...custom }) => (
  <TextField
    hintText={label}
    floatingLabelText={label}
    errorText={touched && error}
    {...input}
    {...custom}
  />
)

const styles = {
  controlContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    padding: '3px 0'
  },
  control: {
    flex: '1 1 auto'
  },
  fileInput: {
    opacity: 0,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  },
  RaisedButton: {
    margin: '16px 0'
  },
  rotateButton: {
    margin: '0 0 0 8px',
    flex: '1 1 auto',
    height: 24
  },
  overlayContainer: {
    background: 'rgba(0, 0, 0, 0)'
  },
  titleDiv: {
    margin: '0 0 20px 0'
  },
  titleInput: {
    textAlign: 'center',
    fontSize: 36,
    backgroundColor: 'rgba(255, 255, 255, .3)',
    padding: '8px 0 8px 0'
  },
  textDiv: {
  },
  textInput: {
    textAlign: 'center',
    fontSize: 24,
    backgroundColor: 'rgba(255, 255, 255, .3)',
    height: 'auto',
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

class PageAdd extends Component {
  state = {
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    rotate: 0,
    borderRadius: 0,
    preview: null,
  }

  handleSave = (data) => {
    const img = this.editor.getImageScaledToCanvas().toDataURL('image/jpeg', 0.5)
    this.setState({
      editing: false,
      preview: {
        img,
        scale: this.state.scale,
        borderRadius: this.state.borderRadius
      }
    })
    return img
  }
  handleScale = (e) => {
    const scale = parseFloat(e.target.value)
    this.setState({ scale })
  }
  rotateLeft = (e) => {
    e.preventDefault()
    this.setState({
      rotate: this.state.rotate - 90
    })
  }
  rotateRight = (e) => {
    e.preventDefault()
    this.setState({
      rotate: this.state.rotate + 90
    })
  }
  handleXPosition = (e) => {
    const x = parseFloat(e.target.value)
    this.setState({ position: { ...this.state.position, x } })
  }
  handleYPosition = (e) => {
    const y = parseFloat(e.target.value)
    this.setState({ position: { ...this.state.position, y } })
  }
  handlePositionChange = position => {
    this.setState({ position })
  }
  handleUpload = (e) => {
    e.preventDefault()
    const reader = new FileReader()
    const file = e.target.files[0]
    reader.onload = (e) => this.editor.loadImage(e.target.result)
    reader.readAsDataURL(file)
  }
  setEditorRef = (editor) => {
    if (editor) this.editor = editor
  }
  render() {
    const { handleSubmit, _id, dispatch } = this.props
    return (
      <section>
        <Card
          zDepth={this.state.zDepth}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        >
          <form
            onSubmit={handleSubmit((values) => {
              const image = this.editor.handleSave()
              dispatch(startAddPage(values, image))
            })}
          >
            <CardMedia overlay={
              <div>
                <Field
                  component={renderHeroField}
                  inputStyle={styles.titleInput}
                  style={styles.titleDiv}
                  underlineShow={false}
                  name="heroTitle"
                  label="Hero Title"
                  type="text"
                  fullWidth={true}
                />
                <Field
                  component={renderHeroField}
                  inputStyle={styles.textInput}
                  style={styles.textDiv}
                  underlineShow={false}
                  name="heroText"
                  label="Hero Text"
                  type="text"
                  fullWidth={true}
                />
              </div>
            }
              overlayContentStyle={styles.overlayContainer}
            >
              <ImageEditor
                ref={this.setEditorRef}
                scale={parseFloat(this.state.scale)}
                width={this.props.width}
                height={this.props.height}
                position={this.state.position}
                onPositionChange={this.handlePositionChange}
                rotate={parseFloat(this.state.rotate)}
                borderRadius={this.state.borderRadius}
                onSave={this.handleSave}
                image="http://placehold.it/1920x1080"
              />
            </CardMedia>
            <CardText>
              <div>
                <div>
                  <div style={styles.controlContainer}>
                    <label>Zoom:</label>
                    <input
                      name="scale"
                      type="range"
                      onChange={this.handleScale}
                      min="1"
                      max="2"
                      step="0.01"
                      defaultValue="1"
                      style={styles.control}
                    />
                  </div>

                  <div style={styles.controlContainer}>
                    <label>Border radius:</label>
                    <input
                      name="scale"
                      type="range"
                      onChange={this.handleBorderRadius}
                      min="0"
                      max="100"
                      step="1"
                      defaultValue="0"
                      style={styles.control}
                    />
                  </div>

                  <div style={styles.controlContainer}>
                    <label>X Position:</label>
                    <input
                      name="scale"
                      type="range"
                      onChange={this.handleXPosition}
                      min="0"
                      max="1"
                      step="0.01"
                      value={this.state.position.x}
                      style={styles.control}
                    />
                  </div>

                  <div style={styles.controlContainer}>
                    <label>Y Position:</label>
                    <input
                      name="scale"
                      type="range"
                      onChange={this.handleYPosition}
                      min="0"
                      max="1"
                      step="0.01"
                      value={this.state.position.y}
                      style={styles.control}
                    />
                  </div>

                  <div style={styles.controlContainer}>
                    <label>Rotate:</label>
                    <RaisedButton onClick={this.rotateLeft} style={styles.rotateButton}>Left</RaisedButton>
                    <RaisedButton onClick={this.rotateRight} style={styles.rotateButton}>Right</RaisedButton>
                  </div>
                  <RaisedButton label="Choose File" labelPosition="before" style={styles.RaisedButton} fullWidth={true}>
                    <input type="file" onChange={this.handleUpload} style={styles.fileInput}/>
                  </RaisedButton>
                </div>
              </div>
            </CardText>
            <CardTitle
              title={
                <Field
                  name="name"
                  label="Name"
                  type="text"
                  fullWidth={true}
                  component={renderTextField}
                />
              }
            />
            <CardText>
              <Field
                name="description"
                label="Description"
                type="text"
                fullWidth={true}
                component={renderTextField}
              />
            </CardText>
            <CardText>
              <Field
                name="detail"
                label="Detail"
                type="text"
                multiLine={true}
                rows={2}
                fullWidth={true}
                component={renderTextField}
              />
            </CardText>
            <div style={styles.buttonContainer}>
              <RaisedButton type="submit" label="Add" primary={true} style={styles.button}/>
            </div>
          </form>
        </Card>
      </section>

    )
  }
}

PageAdd = reduxForm({
  form: 'addPage'
})(PageAdd)

const mapStateToProps = (state, ownProps) => {
  return {
    initialValues: {
      heroTitle: 'Hero Title',
      heroText: 'Hero Text'
    }
  }
}

PageAdd = connect(mapStateToProps)
(PageAdd)

export default PageAdd
