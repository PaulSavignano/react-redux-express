import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { reduxForm, Field } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardMedia, CardTitle, CardActions } from 'material-ui/Card'
import ImageEditor from './ImageEditor'


const adaptFileEventToValue = delegate => e => delegate(e.target.files[0])

const renderFileInput = ({
  input: {
    value: omitValue,
    onChange,
    onBlur,
    ...input
  },
  meta: { omitMeta },
  ...custom
}) => (
  <RaisedButton
    label="Choose"
    labelPosition="before"
    containerElement="label"
    style={{ flex: '1 1 auto', margin: 8 }}
  >
    <input
      style={{ cursor: 'pointer', position: 'absolute', top: 0, bottom: 0, right: 0, left: 0, width: '100%', opacity: 0 }}
      onChange={onChange}
      onBlur={adaptFileEventToValue(onBlur)}
      type="file"
      {...input}
      {...custom}
    />
  </RaisedButton>
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
  button: {
    margin: '0 0 0 8px',
    flex: '1 1 auto',
    height: 24
  }
}

class ImageForm extends Component {
  state = {
    position: { x: 0.5, y: 0.5 },
    scale: 1,
    rotate: 0,
    borderRadius: 0,
    opacity: 1,
    image: null,
    editing: false,
    open: false
  }
  handleSave = () => {
    const { dispatch, handleUpdate, item, type } = this.props
    const image = this.editor.getImageScaledToCanvas().toDataURL(type, 1)
    const update = { type: 'UPDATE_IMAGE', image }
    dispatch(handleUpdate(item._id, update))
    this.setState({ editing: false, image, submitted: false })
    this.props.reset()
  }
  handleScale = (e) => {
    const scale = parseFloat(e.target.value)
    this.setState({ scale })
  }
  handleOpacity = (e) => {
    const opacity = parseFloat(e.target.value)
    this.setState({ opacity })
  }
  rotateLeft = (e) => {
    e.preventDefault()
    this.setState({ rotate: this.state.rotate - 90 })
  }
  rotateRight = (e) => {
    e.preventDefault()
    this.setState({ rotate: this.state.rotate + 90 })
  }
  handleBorderRadius = (e) => {
    const borderRadius = parseInt(e.target.value, 10)
    this.setState({ borderRadius })
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
    if (file) {
      reader.onload = (e) => this.setState({ image: e.target.result, editing: true })
      reader.readAsDataURL(file)
    }
  }
  setEditorRef = (editor) => {
    if (editor) this.editor = editor
  }
  componentWillMount() {
    const image = this.props.item.image || this.props.placeholdIt
    const open = this.props.item.image ? true : false
    this.setState({ image, open })
  }
  render () {
    const { dispatch, error, handleSubmit, handleUpdate, submitSucceeded, item, width, height, placeholdIt } = this.props
    return (
      <form
        style={{ display: 'flex', flexFlow: 'column' }}
        onSubmit={handleSubmit(this.handleSave)}
      >
        <CardActions>
          <RaisedButton
            onTouchTap={() => {
              if (this.state.open) {
                if (item.image) {
                  const update = { type: 'DELETE_IMAGE', image: item.image }
                  dispatch(handleUpdate(item._id, update))
                }
              }
              this.setState({ open: !this.state.open })
            }}
            type="button"
            label={this.state.open ? "Remove Image" : "Add Image"}
            labelColor="#ffffff"
            backgroundColor={this.state.open ? "#D50000" : "#4CAF50" }
            fullWidth={true}/>
        </CardActions>
        {!this.state.open ? null : this.state.editing ?
          <CardMedia style={{ display: 'flex', flexFlow: 'row wrap', justifyContent: 'space-around', padding: '8px 8px 0 8px' }}>
            <div style={{ flex: '0 0 auto' }}>
              <ImageEditor
                ref={this.setEditorRef}
                scale={parseFloat(this.state.scale)}
                opacity={parseFloat(this.state.opacity)}
                width={width}
                height={height}
                position={this.state.position}
                onPositionChange={this.handlePositionChange}
                rotate={parseFloat(this.state.rotate)}
                borderRadius={this.state.borderRadius}
                onSave={this.handleSave}
                image={this.state.image}
                crossOrigin="anonymous"
              />
            </div>
            <div style={{ flex: '1 1 auto', padding: '0 16px 0 16px' }}>
              <div style={styles.controlContainer}>
                <label>Zoom:</label>
                <input
                  name="scale"
                  type="range"
                  onChange={this.handleScale}
                  min="0"
                  max="2"
                  step="0.01"
                  defaultValue="1"
                  style={styles.control}
                />
              </div>

              <div style={styles.controlContainer}>
                <label>Opacity:</label>
                <input
                  name="opacity"
                  type="range"
                  onChange={this.handleOpacity}
                  min="0"
                  max="1"
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
                <RaisedButton onTouchTap={this.rotateLeft} style={styles.button}>Left</RaisedButton>
                <RaisedButton onTouchTap={this.rotateRight} style={styles.button}>Right</RaisedButton>
              </div>

            </div>
          </CardMedia>
          :
          <img src={this.state.image} style={{ alignSelf: 'center', width: '100%', height: 'auto' }}/>
        }

        {!this.state.open ? null :
          <div style={{ display: 'flex', flexFlow: 'row nowrap'}}>
            <Field
              component={renderFileInput}
              name="imageFile"
              onChange={this.handleUpload}
            />

            {this.state.editing ?
              <RaisedButton
                type="submit"
                label="Update"
                primary={true}
                style={{ flex: '1 1 auto', margin: 8 }}
              /> : null
              }


          </div>
        }
      </form>
    )
  }
}

ImageForm = compose(
  connect((state, props) => ({ form: `image_${props.item._id}` })),
  reduxForm({destroyOnUnmount: false, asyncBlurFields: [] }))(ImageForm)

export default ImageForm
